/**
 * Cloudflare Workers Backend Router (Hono-powered)
 * Handles API routes, rate limiting, D1 database storage, and transactional emails.
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env, InquiryRecord } from "./types";
import { checkRateLimit, validateInquiryPayload } from "./security";
import { saveInquiryToD1, getInquiriesFromD1, initD1Schema } from "./db";
import { sendInquiryEmail } from "./email";

// Initialize Hono application with Cloudflare Workers environment bindings
const app = new Hono<{ Bindings: Env }>();

// Enable CORS for cross-origin deployments (e.g. Cloudflare Pages <-> Cloudflare Worker)
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// --- HEALTH CHECK ROUTE ---
app.get("/api/health", (c) => {
  return c.json({
    status: "healthy",
    runtime: "cloudflare-workers",
    timestamp: new Date().toISOString(),
  });
});

// --- INQUIRY LIST ROUTE ---
app.get("/api/inquiries", async (c) => {
  const inquiries = await getInquiriesFromD1(c.env.DB, 50);
  return c.json({
    success: true,
    count: inquiries.length,
    inquiries,
  });
});

// --- CONTACT FORM SUBMISSION ROUTE ---
app.post("/api/contact", async (c) => {
  try {
    // 1. Resolve client IP for rate limiting
    const ip =
      c.req.header("cf-connecting-ip") ||
      c.req.header("x-forwarded-for")?.split(",")[0].trim() ||
      "unknown";

    const { allowed, remaining } = await checkRateLimit(ip, c.env.RATE_LIMIT_KV);
    if (!allowed) {
      console.warn(`[RATE LIMIT] Blocked submission request from IP: ${ip}`);
      return c.json(
        {
          success: false,
          error: "Too many requests. Please wait a minute before submitting another inquiry.",
        },
        429
      );
    }

    // 2. Parse request payload
    let body: any;
    try {
      body = await c.req.json();
    } catch {
      return c.json(
        {
          success: false,
          error: "Invalid JSON payload provided.",
        },
        400
      );
    }

    // 3. Honeypot check (Spam protection)
    if (body.website_honey) {
      console.warn("[SPAM] Spambot detected via honeypot field:", body.website_honey);
      return c.json({
        success: true,
        message: "Your inquiry has been successfully captured.",
      });
    }

    // 4. Server-side validation, length checking, and trimming
    const validation = validateInquiryPayload(body);
    if (!validation.valid || !validation.cleaned) {
      return c.json(
        {
          success: false,
          error: validation.error || "Please verify your form inputs.",
        },
        400
      );
    }

    const {
      name,
      businessName,
      phone,
      email,
      location,
      interestedBrand,
      message,
    } = validation.cleaned;

    const timestamp = new Date().toISOString();
    const inquiryRecord: InquiryRecord = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      businessName,
      phone,
      email,
      location,
      interestedBrand,
      message,
      timestamp,
    };

    // 5. Persistent storage via Cloudflare D1 (falls back safely if not bound)
    const dbResult = await saveInquiryToD1(inquiryRecord, c.env.DB);

    // 6. Transactional email dispatch via HTTP API (Resend / SendGrid)
    const emailResult = await sendInquiryEmail(inquiryRecord, c.env);

    return c.json({
      success: true,
      message: "Your commercial inquiry has been recorded successfully.",
      emailStatus: emailResult.status,
      storage: dbResult.source,
      inquiryId: inquiryRecord.id,
    });
  } catch (err: any) {
    console.error("[Worker Error] Contact route unhandled failure:", err);
    return c.json(
      {
        success: false,
        error: "A critical server error occurred while archiving your request. Please try again.",
      },
      500
    );
  }
});

export default app;
