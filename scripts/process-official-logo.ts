import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function removeWhiteBackground(inputBuffer: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(inputBuffer)
    .toColorspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);

    let alpha = 0;
    if (minVal < 246) {
      if (maxVal < 232) {
        alpha = 255;
      } else {
        const t = (246 - minVal) / (246 - 215);
        alpha = Math.min(255, Math.max(0, Math.round(t * 255)));
      }
    }

    if (alpha === 0) {
      rgba[dstIdx] = 0;
      rgba[dstIdx + 1] = 0;
      rgba[dstIdx + 2] = 0;
      rgba[dstIdx + 3] = 0;
    } else {
      const aNorm = alpha / 255;
      const unmix = (c: number) => {
        const pure = (c - 255 * (1 - aNorm)) / aNorm;
        return Math.min(255, Math.max(0, Math.round(pure)));
      };

      rgba[dstIdx] = unmix(r);
      rgba[dstIdx + 1] = unmix(g);
      rgba[dstIdx + 2] = unmix(b);
      rgba[dstIdx + 3] = alpha;
    }
  }

  return sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 5 })
    .png()
    .toBuffer();
}

async function createDarkMode(buf: Buffer): Promise<Buffer> {
  const { data: raw, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const idx = i * 4;
    const a = raw[idx + 3];
    if (a > 0) {
      const r = raw[idx];
      const g = raw[idx + 1];
      const b = raw[idx + 2];
      // Elevate deep navy into luminous metallic sapphire so it's brilliant on dark themes
      out[idx] = Math.min(255, Math.round(r * 1.6 + 45));
      out[idx + 1] = Math.min(255, Math.round(g * 1.8 + 80));
      out[idx + 2] = Math.min(255, Math.round(b * 2.1 + 130));
      out[idx + 3] = a;
    }
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

async function run() {
  const sourcePath = 'public/assets/aistudio/IMG-20260926-WA0000_236d9227.jpg';
  console.log('Extracting official logo regions...');

  // 1. Full logo (emblem + text)
  const fullJpg = await sharp(sourcePath)
    .extract({ left: 160, top: 110, width: 640, height: 690 })
    .toBuffer();
  const fullPng = await removeWhiteBackground(fullJpg);
  const fullWebp = await sharp(fullPng).webp({ quality: 100 }).toBuffer();
  const fullDark = await createDarkMode(fullPng);

  // 2. Emblem only
  const emblemJpg = await sharp(sourcePath)
    .extract({ left: 160, top: 110, width: 640, height: 570 })
    .toBuffer();
  const emblemPng = await removeWhiteBackground(emblemJpg);
  const emblemWebp = await sharp(emblemPng).webp({ quality: 100 }).toBuffer();
  const emblemDark = await createDarkMode(emblemPng);

  // 3. Wordmark only
  const wordmarkJpg = await sharp(sourcePath)
    .extract({ left: 180, top: 680, width: 600, height: 120 })
    .toBuffer();
  const wordmarkPng = await removeWhiteBackground(wordmarkJpg);

  const targets = ['public/logo', 'client/public/logo'];
  for (const t of targets) {
    if (!fs.existsSync(t)) fs.mkdirSync(t, { recursive: true });

    // Main brand files
    await sharp(fullPng).toFile(path.join(t, 'damali-logo.png'));
    await sharp(fullWebp).toFile(path.join(t, 'damali-logo.webp'));
    await sharp(fullPng).toFile(path.join(t, 'company-logo.png'));
    await sharp(fullPng).toFile(path.join(t, 'damali-logo-full.png'));

    // Emblem
    await sharp(emblemPng).toFile(path.join(t, 'damali-emblem.png'));
    await sharp(emblemWebp).toFile(path.join(t, 'damali-emblem.webp'));

    // Wordmark
    await sharp(wordmarkPng).toFile(path.join(t, 'damali-wordmark.png'));

    // Dark mode
    await sharp(fullDark).toFile(path.join(t, 'damali-logo-darkmode.png'));
    await sharp(emblemDark).toFile(path.join(t, 'damali-emblem-darkmode.png'));

    // In logos/
    const logosDir = t.replace('logo', 'logos');
    if (!fs.existsSync(logosDir)) fs.mkdirSync(logosDir, { recursive: true });
    await sharp(fullPng).toFile(path.join(logosDir, 'damali.png'));
    await sharp(emblemPng).toFile(path.join(logosDir, 'damali-emblem.png'));
  }

  console.log('✅ Successfully extracted, cleaned, and deployed all official Damali brand assets!');
}

run().catch(console.error);
