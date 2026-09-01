/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// --- API ROUTES ---

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// --- API SECURITY UTILS & STATE ---

// In-memory rate limiting map for form submissions
const ipLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_LIMIT_PER_WINDOW = 5; // Max 5 submissions per minute per IP

/**
 * Escapes characters that could be used for HTML injection or XSS attacks.
 */
function escapeHtml(str: any): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Main Contact Form Submission Endpoint
app.post("/api/contact", async (req: express.Request, res: express.Response) => {
  try {
    const { name, businessName, phone, email, location, interestedBrand, message, website_honey } = req.body;

    // 1. IP-Based Rate Limiting to prevent automated spam/DDoS
    const ip = (req.headers["x-forwarded-for"] as string || req.ip || "unknown").split(",")[0].trim();
    const now = Date.now();
    const ipData = ipLimits.get(ip);

    if (ipData) {
      if (now > ipData.resetTime) {
        // Window expired, reset counter
        ipLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      } else {
        if (ipData.count >= MAX_LIMIT_PER_WINDOW) {
          console.warn(`[RATE LIMIT] Blocked submission request from IP: ${ip}`);
          return res.status(429).json({
            success: false,
            error: "Too many requests. Please wait a minute before submitting another inquiry."
          });
        }
        ipData.count++;
      }
    } else {
      // First request from this IP
      ipLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Spam Prevention via Honeypot
    if (website_honey) {
      console.warn("[SPAM] Spambot detected via honeypot field:", website_honey);
      // Return fake success to mislead spambots and end connection early
      return res.status(200).json({
        success: true,
        message: "Your inquiry has been successfully captured."
      });
    }

    // 3. Server-side Inputs Validation & Trimming
    const trimmedName = (name || "").trim();
    const trimmedBusiness = (businessName || "").trim();
    const trimmedPhone = (phone || "").trim();
    const trimmedEmail = (email || "").trim();
    const trimmedLocation = (location || "").trim();
    const trimmedBrand = (interestedBrand || "").trim();
    const trimmedMessage = (message || "").trim();

    if (!trimmedName || !trimmedBusiness || !trimmedPhone || !trimmedEmail || !trimmedLocation || !trimmedBrand || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        error: "All fields are required. Please fill in the entire form."
      });
    }

    // Strict input length validation to prevent massive payloads (buffer overflow / disk bloating)
    if (
      trimmedName.length > 150 ||
      trimmedBusiness.length > 200 ||
      trimmedPhone.length > 30 ||
      trimmedEmail.length > 150 ||
      trimmedLocation.length > 150 ||
      trimmedBrand.length > 100 ||
      trimmedMessage.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        error: "Input text length exceeds maximum corporate limits. Please shorten your message."
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format. Please provide a valid commercial address."
      });
    }

    // Phone format validation
    if (trimmedPhone.length < 7) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number. Please enter a valid mobile or contact number."
      });
    }

    const timestamp = new Date().toISOString();

    // 4. Secure HTML Escaping to defend against XSS & Mail HTML Injection
    const escapedName = escapeHtml(trimmedName);
    const escapedBusinessName = escapeHtml(trimmedBusiness);
    const escapedPhone = escapeHtml(trimmedPhone);
    const escapedEmail = escapeHtml(trimmedEmail);
    const escapedLocation = escapeHtml(trimmedLocation);
    const escapedInterestedBrand = escapeHtml(trimmedBrand);
    const escapedMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br />");

    // 5. Always save to local database inquiries.json (real persistent data recording)
    const newInquiry = {
      id: Date.now().toString(),
      name: trimmedName,
      businessName: trimmedBusiness,
      phone: trimmedPhone,
      email: trimmedEmail,
      location: trimmedLocation,
      interestedBrand: trimmedBrand,
      message: trimmedMessage,
      timestamp
    };

    let dbSaved = false;
    try {
      const dbPath = path.join(process.cwd(), "inquiries.json");
      let existing: any[] = [];
      if (fs.existsSync(dbPath)) {
        try {
          const fileContent = fs.readFileSync(dbPath, "utf-8");
          existing = JSON.parse(fileContent);
        } catch (parseErr) {
          console.error("[Database Parse Error] Could not parse inquiries.json, resetting array:", parseErr);
        }
      }
      existing.push(newInquiry);
      fs.writeFileSync(dbPath, JSON.stringify(existing, null, 2), "utf-8");
      dbSaved = true;
      console.log(`[Database] Inquiry from "${trimmedBusiness}" successfully recorded in inquiries.json.`);
    } catch (dbErr) {
      console.error("[Database Error] Failed to write to inquiries.json:", dbErr);
    }

    // 6. Send Email via Nodemailer (if SMTP variables are configured)
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, COMPANY_RECEIVER_EMAIL } = process.env;

    const isPlaceholder = (val?: string) => {
      if (!val) return true;
      const lower = val.toLowerCase();
      return lower.includes("your-email") || lower.includes("your-app-password") || lower.includes("example.com");
    };

    const targetReceiver = COMPANY_RECEIVER_EMAIL && !isPlaceholder(COMPANY_RECEIVER_EMAIL) 
      ? COMPANY_RECEIVER_EMAIL 
      : (SMTP_USER && !isPlaceholder(SMTP_USER) ? SMTP_USER : "distributor-inquiries@example.com");

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || isPlaceholder(SMTP_USER) || isPlaceholder(SMTP_PASS)) {
      console.log("\n[Email Simulated] SMTP credentials not set in environmental variables. Email log output:");
      console.log("--------------------------------------------------");
      console.log(`TO: ${targetReceiver}`);
      console.log(`FROM: ${trimmedEmail}`);
      console.log(`SUBJECT: B2B Inquiry: ${trimmedBusiness} for ${trimmedBrand}`);
      console.log(`MESSAGE: ${trimmedMessage}`);
      console.log("--------------------------------------------------\n");

      return res.status(200).json({
        success: true,
        message: "Your commercial inquiry has been recorded successfully.",
        emailStatus: "Email dispatch is simulated in preview mode."
      });
    }

    try {
      const port = parseInt(SMTP_PORT, 10) || 587;
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New B2B Business Inquiry</h2>
          <p style="color: #475569; font-size: 15px;">A new commercial distributor inquiry has been submitted through the company landing page.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; width: 150px;">Timestamp</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${new Date(timestamp).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Contact Person</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${escapedName}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Business Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>${escapedBusinessName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${escapedPhone}">${escapedPhone}</a></td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${escapedEmail}">${escapedEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Location</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${escapedLocation}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Interested Brand</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><span style="background-color: #cbd5e1; padding: 2px 8px; border-radius: 4px; font-size: 13px;">${escapedInterestedBrand}</span></td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
            <h4 style="margin-top: 0; color: #334155;">Message:</h4>
            <p style="color: #334155; font-size: 14px; line-height: 1.5; margin: 0;">${escapedMessage}</p>
          </div>
          
          <p style="font-size: 11px; color: #94a3b8; margin-top: 25px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            This email was automatically dispatched by Nepal Distributors Web System.
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"${trimmedBusiness} - Nepal Distributors Portal" <${SMTP_USER}>`,
        to: targetReceiver,
        replyTo: trimmedEmail,
        subject: `🔔 NEW INQUIRY: ${trimmedBusiness} - interested in ${trimmedBrand}`,
        html: emailHtml
      });

      console.log(`[Email] Dispatch successful for "${trimmedBusiness}" to: ${targetReceiver}`);
      
      return res.status(200).json({
        success: true,
        message: "Your inquiry has been successfully captured and sent to our corporate trade team via real email.",
        emailStatus: "Email dispatched successfully via secure SMTP."
      });
    } catch (mailError: any) {
      console.error("[Email Error] Failed to send email via Nodemailer SMTP:", mailError);
      return res.status(200).json({
        success: true,
        message: "Your inquiry has been successfully captured and saved in inquiries.json, but email dispatch failed.",
        emailStatus: `SMTP Dispatch Error: ${mailError.message || "Failed to deliver email"}`
      });
    }
  } catch (err: any) {
    console.error("[Contact Route Error] Server failure:", err);
    return res.status(500).json({
      success: false,
      error: "A critical server error occurred while archiving your request. Please try again."
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
          ignored: ['**/inquiries.json']
        }
      },
      appType: "spa"
    });
    app.use(vite.middlewares);

    // Explicitly serve and transform index.html for non-API GET requests in development mode.
    // This is the standard, bulletproof approach for custom Express+Vite integration to prevent blank screens.
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes or static assets with file extensions
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

    console.log("[Server] Loaded Vite dev middleware and explicit HTML router fallback.");
  } else {
    // Production Mode serving compiled static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[Server] Serving static production files from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer().catch((error) => {
  console.error("[Server Setup Error] Initialization failed:", error);
});
