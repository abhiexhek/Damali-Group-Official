/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import workerApp from "./server/src/index";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// --- CLOUDFLARE WORKER ROUTER BRIDGE ---
// Mounts the Cloudflare Workers Hono backend directly into Express for local preview and dev.
app.all("/api/*", async (req: express.Request, res: express.Response) => {
  try {
    const protocol = req.protocol;
    const host = req.get("host") || "localhost:3000";
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    const init: RequestInit = {
      method: req.method,
      headers,
    };

    if (!["GET", "HEAD"].includes(req.method)) {
      init.body = JSON.stringify(req.body);
    }

    const webReq = new Request(fullUrl, init);

    // Provide Cloudflare Workers environment bindings mapped from Node environment
    const workerEnv = {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      COMPANY_RECEIVER_EMAIL: process.env.COMPANY_RECEIVER_EMAIL,
      EMAIL_FROM: process.env.EMAIL_FROM,
      ENVIRONMENT: process.env.NODE_ENV || "development",
    };

    const workerRes = await workerApp.fetch(webReq, workerEnv);

    res.status(workerRes.status);
    workerRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const contentType = workerRes.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data: any = await workerRes.json();

      // Mirror submissions to local inquiries.json file for dev convenience
      if (
        req.path === "/api/contact" &&
        data.success &&
        !req.body?.website_honey
      ) {
        try {
          const dbPath = path.join(process.cwd(), "inquiries.json");
          let existing: any[] = [];
          if (fs.existsSync(dbPath)) {
            existing = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
          }
          existing.push({
            id: data.inquiryId || Date.now().toString(),
            name: req.body.name,
            businessName: req.body.businessName,
            phone: req.body.phone,
            email: req.body.email,
            location: req.body.location,
            interestedBrand: req.body.interestedBrand,
            message: req.body.message,
            timestamp: new Date().toISOString(),
          });
          fs.writeFileSync(dbPath, JSON.stringify(existing, null, 2), "utf-8");
          console.log(`[Dev Bridge] Inquiry mirrored to inquiries.json`);
        } catch (fileErr) {
          console.error("[Dev Bridge Error] Failed writing inquiries.json:", fileErr);
        }
      }

      return res.json(data);
    } else {
      const text = await workerRes.text();
      return res.send(text);
    }
  } catch (bridgeErr: any) {
    console.error("[Server Bridge Error]:", bridgeErr);
    return res.status(500).json({
      success: false,
      error: "Internal server error occurred in local API bridge.",
    });
  }
});

// --- VITE DEV MIDDLEWARE OR STATIC FILES ---

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode with Vite middleware imported dynamically
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          ignored: ["**/inquiries.json"],
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Serve and transform index.html for non-API GET requests in development mode
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api") || url.includes(".")) {
        return next();
      }
      try {
        const indexPath = path.resolve(process.cwd(), "index.html");
        let template = fs.readFileSync(indexPath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    console.log("[Server] Loaded Vite dev middleware and Cloudflare Worker API bridge.");
  } else {
    // Production Mode serving compiled static files
    const distPath = fs.existsSync(path.join(process.cwd(), "client", "dist"))
      ? path.join(process.cwd(), "client", "dist")
      : path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`[Server] Serving static production files from ${distPath}.`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer().catch((error) => {
  console.error("[Server Setup Error] Initialization failed:", error);
});
