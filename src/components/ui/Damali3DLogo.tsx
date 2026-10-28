/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface Damali3DLogoProps {
  className?: string;
  showText?: boolean;
  interactive?: boolean;
  size?: 'hero' | 'lg' | 'md';
}

export const Damali3DLogo: React.FC<Damali3DLogoProps> = ({
  className = '',
  showText = true,
  interactive = true,
  size = 'hero',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Mouse tracking refs to avoid React re-renders in the animation loop
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });
  const isInteracting = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js skill guidelines
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Orthographic / subtle perspective camera for architectural logo precision
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL init failed, falling back to 2D image', e);
      setHasWebGL(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Studio Environment lighting per Three.js skill
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    try {
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    } catch {
      // safe fallback
    }
    pmremGenerator.dispose();

    // 3-Point Studio Lighting with Moving Specular Glint
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 1.1);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Dynamic specular accent light that sweeps across the 3D bevels
    const glintLight = new THREE.PointLight(0x60a5fa, 3.2, 10);
    glintLight.position.set(0, 1.5, 2.5);
    scene.add(glintLight);

    // Main 3D Logo Master Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Helper to resolve asset paths
    const resolvePath = (p: string) => {
      const base = ((import.meta as any).env?.BASE_URL || '/');
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      return `${cleanBase}${p.replace(/^\//, '')}`;
    };

    const textureLoader = new THREE.TextureLoader();
    const emblemTexture = textureLoader.load(resolvePath('/logo/damali-emblem.png'));
    emblemTexture.colorSpace = THREE.SRGBColorSpace;
    emblemTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const wordmarkTexture = textureLoader.load(resolvePath('/logo/damali-wordmark.png'));
    wordmarkTexture.colorSpace = THREE.SRGBColorSpace;
    wordmarkTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // ================= 3D EMBLEM LAYERS =================
    // Layer 1: Metallic Midnight Blue Beveled Backing (gives physical 3D extrusion)
    const emblemWidth = 3.2;
    const emblemHeight = 3.0;
    const emblemGeo = new THREE.PlaneGeometry(emblemWidth, emblemHeight);

    // Front high-fidelity face with official texture & metallic clearcoat
    const frontMat = new THREE.MeshPhysicalMaterial({
      map: emblemTexture,
      transparent: true,
      metalness: 0.75,
      roughness: 0.22,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    const emblemMesh = new THREE.Mesh(emblemGeo, frontMat);
    emblemMesh.position.set(0, showText ? 0.45 : 0, 0.08);
    logoGroup.add(emblemMesh);

    // Extrusion depth layers to create genuine 3D beveled thickness
    const depthLevels = 6;
    const depthStep = 0.025;
    for (let i = 1; i <= depthLevels; i++) {
      const backMat = new THREE.MeshStandardMaterial({
        map: emblemTexture,
        transparent: true,
        color: new THREE.Color(0x0a192f), // deep midnight blue core
        metalness: 0.85,
        roughness: 0.35,
        opacity: Math.max(0.4, 1 - i * 0.1),
        depthWrite: false,
      });
      const layer = new THREE.Mesh(emblemGeo, backMat);
      layer.position.set(-0.005 * i, (showText ? 0.45 : 0) - 0.003 * i, 0.08 - depthStep * i);
      logoGroup.add(layer);
    }

    // (Extra 3D floating balls removed per official logo specification)

    // ================= 3D DAMALI WORDMARK =================
    if (showText) {
      const wordmarkGeo = new THREE.PlaneGeometry(2.8, 0.55);
      const wordmarkMat = new THREE.MeshPhysicalMaterial({
        map: wordmarkTexture,
        transparent: true,
        metalness: 0.85,
        roughness: 0.25,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        side: THREE.DoubleSide,
      });
      const wordmarkMesh = new THREE.Mesh(wordmarkGeo, wordmarkMat);
      wordmarkMesh.position.set(0, -1.35, 0.12);
      logoGroup.add(wordmarkMesh);

      // Shadow depth layer for text
      const wordmarkBackMat = new THREE.MeshBasicMaterial({
        map: wordmarkTexture,
        transparent: true,
        color: new THREE.Color(0x061220),
        opacity: 0.6,
      });
      const textShadow = new THREE.Mesh(wordmarkGeo, wordmarkBackMat);
      textShadow.position.set(-0.015, -1.37, 0.04);
      logoGroup.add(textShadow);
    }

    // Contact Grounding Radial Glow
    const glowGeo = new THREE.PlaneGeometry(3.6, 1.2);
    const canvasGlow = document.createElement('canvas');
    canvasGlow.width = 128;
    canvasGlow.height = 128;
    const ctx = canvasGlow.getContext('2d');
    if (ctx) {
      const radGrad = ctx.createRadialGradient(64, 64, 5, 64, 64, 60);
      radGrad.addColorStop(0, 'rgba(30, 64, 114, 0.45)');
      radGrad.addColorStop(0.5, 'rgba(14, 34, 61, 0.2)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const glowTexture = new THREE.CanvasTexture(canvasGlow);
    const glowMat = new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    });
    const contactGlow = new THREE.Mesh(glowGeo, glowMat);
    contactGlow.position.set(0, showText ? -1.75 : -1.45, -0.2);
    scene.add(contactGlow);

    // ================= INTERACTION HANDLERS =================
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (isInteracting.current) {
        // Dragging to rotate
        const deltaX = clientX - dragStart.current.x;
        const deltaY = clientY - dragStart.current.y;
        manualRotation.current.y += deltaX * 0.01;
        manualRotation.current.x += deltaY * 0.01;
        // Clamp vertical tilt
        manualRotation.current.x = Math.max(-0.6, Math.min(0.6, manualRotation.current.x));
        dragStart.current = { x: clientX, y: clientY };
      } else if (interactive) {
        // Natural parallax tilt tracking mouse
        const normX = (clientX / rect.width) * 2 - 1;
        const normY = -(clientY / rect.height) * 2 + 1;
        targetRotation.current.y = normX * 0.42;
        targetRotation.current.x = normY * 0.35;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isInteracting.current = true;
      setIsDragging(true);
      const rect = container.getBoundingClientRect();
      dragStart.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerUp = (e: PointerEvent) => {
      isInteracting.current = false;
      setIsDragging(false);
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const handlePointerLeave = () => {
      if (!isInteracting.current) {
        targetRotation.current = { x: 0, y: 0 };
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    // ================= RESIZE LISTENER =================
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ================= 3D MOVEMENT ANIMATION LOOP =================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping for silky smooth motion
      const dampFactor = isInteracting.current ? 12 : 4.5;
      const effectiveTargetX = manualRotation.current.x + targetRotation.current.x;
      const effectiveTargetY = manualRotation.current.y + targetRotation.current.y;

      currentRotation.current.x = THREE.MathUtils.damp(
        currentRotation.current.x,
        effectiveTargetX,
        dampFactor,
        delta
      );
      currentRotation.current.y = THREE.MathUtils.damp(
        currentRotation.current.y,
        effectiveTargetY,
        dampFactor,
        delta
      );

      // Spring back manual rotation when not dragging
      if (!isInteracting.current) {
        manualRotation.current.x = THREE.MathUtils.damp(manualRotation.current.x, 0, 2.5, delta);
        manualRotation.current.y = THREE.MathUtils.damp(manualRotation.current.y, 0, 2.5, delta);
      }

      // Natural continuous 3D breathing float (subtle harmonic hover)
      const floatY = Math.sin(time * 1.5) * 0.08;
      const subtlePitch = Math.cos(time * 1.2) * 0.035;
      const subtleYaw = Math.sin(time * 0.9) * 0.045;

      logoGroup.position.y = floatY;
      logoGroup.rotation.x = currentRotation.current.x + subtlePitch;
      logoGroup.rotation.y = currentRotation.current.y + subtleYaw;


      // Specular light sweep across metallic bevels
      glintLight.position.x = Math.sin(time * 1.8) * 2.5;
      glintLight.position.y = (showText ? 0.5 : 0) + Math.cos(time * 1.4) * 1.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);

      renderer.dispose();
      emblemGeo.dispose();
      frontMat.dispose();
      emblemTexture.dispose();
      wordmarkTexture.dispose();
      glowTexture.dispose();
      glowGeo.dispose();
      glowMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [showText, interactive]);

  const sizeClasses = {
    hero: 'w-[290px] h-[310px] sm:w-[350px] sm:h-[370px] lg:w-[380px] lg:h-[400px]',
    lg: 'w-[240px] h-[250px] sm:w-[280px] sm:h-[290px]',
    md: 'w-[180px] h-[190px]',
  };

  const boxClass = sizeClasses[size] || sizeClasses.hero;

  // Graceful fallback for non-WebGL environments
  if (!hasWebGL) {
    return (
      <div className={`${boxClass} ${className} flex items-center justify-center relative select-none`}>
        <img
          src="/logo/damali-logo.png"
          alt="Damali Group"
          className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(7,21,40,0.25)]"
        />
      </div>
    );
  }

  return (
    <div
      className={`${boxClass} ${className} relative flex items-center justify-center select-none touch-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Damali Group - Official 3D Interactive Logo (Click & drag to rotate)"
    >
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 ${
          isDragging ? 'scale-[1.03]' : ''
        }`}
      />

      {/* Subtle indicator pill on hover/touch */}
      <div
        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide transition-all duration-300 pointer-events-none ${
          isHovered || isDragging
            ? 'opacity-90 translate-y-0 bg-slate-900/80 text-sky-200 border border-sky-500/30 shadow-sm backdrop-blur-xs'
            : 'opacity-0 translate-y-1'
        }`}
      >
        {isDragging ? 'Rotating 3D' : 'Interactive 3D Motion'}
      </div>
    </div>
  );
};
