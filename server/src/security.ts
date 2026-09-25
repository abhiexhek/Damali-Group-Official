/// <reference types="@cloudflare/workers-types" />

/**
 * Server Security Utilities:
 * - HTML escaping to prevent XSS and HTML injection
 * - Input validation (lengths, formats, sanitization)
 * - Distributed rate limiting using Cloudflare KV with in-memory fallback
 */

// In-memory rate limiting map for local dev or when KV is not bound
const localIpLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_LIMIT_PER_WINDOW = 5;

/**
 * Escapes characters that could be used for HTML injection or XSS attacks.
 */
export function escapeHtml(str: any): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Rate limit check per IP address.
 * Uses Cloudflare KV if bound, otherwise falls back to local memory.
 */
export async function checkRateLimit(
  ip: string,
  kv?: KVNamespace
): Promise<{ allowed: boolean; remaining: number }> {
  const safeIp = ip || "unknown";

  if (kv) {
    try {
      const key = `rate_limit:${safeIp}`;
      const current = await kv.get(key);
      const count = current ? parseInt(current, 10) : 0;

      if (count >= MAX_LIMIT_PER_WINDOW) {
        return { allowed: false, remaining: 0 };
      }

      await kv.put(key, String(count + 1), {
        expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
      });

      return { allowed: true, remaining: MAX_LIMIT_PER_WINDOW - (count + 1) };
    } catch (kvError) {
      console.warn("[RateLimit] KV access warning, falling back to memory:", kvError);
    }
  }

  // In-memory fallback
  const now = Date.now();
  const ipData = localIpLimits.get(safeIp);

  if (ipData) {
    if (now > ipData.resetTime) {
      localIpLimits.set(safeIp, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW_SECONDS * 1000,
      });
      return { allowed: true, remaining: MAX_LIMIT_PER_WINDOW - 1 };
    } else {
      if (ipData.count >= MAX_LIMIT_PER_WINDOW) {
        return { allowed: false, remaining: 0 };
      }
      ipData.count++;
      return { allowed: true, remaining: MAX_LIMIT_PER_WINDOW - ipData.count };
    }
  } else {
    localIpLimits.set(safeIp, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_SECONDS * 1000,
    });
    return { allowed: true, remaining: MAX_LIMIT_PER_WINDOW - 1 };
  }
}

/**
 * Server-side input validation for contact form submissions.
 */
export function validateInquiryPayload(body: any): {
  valid: boolean;
  error?: string;
  cleaned?: {
    name: string;
    businessName: string;
    phone: string;
    email: string;
    location: string;
    interestedBrand: string;
    message: string;
  };
} {
  const trimmedName = (body?.name || "").trim();
  const trimmedBusiness = (body?.businessName || "").trim();
  const trimmedPhone = (body?.phone || "").trim();
  const trimmedEmail = (body?.email || "").trim();
  const trimmedLocation = (body?.location || "").trim();
  const trimmedBrand = (body?.interestedBrand || "").trim();
  const trimmedMessage = (body?.message || "").trim();

  // All fields required check
  if (
    !trimmedName ||
    !trimmedBusiness ||
    !trimmedPhone ||
    !trimmedEmail ||
    !trimmedLocation ||
    !trimmedBrand ||
    !trimmedMessage
  ) {
    return {
      valid: false,
      error: "All fields are required. Please fill in the entire form.",
    };
  }

  // Maximum character length validation to prevent payload inflation
  if (
    trimmedName.length > 150 ||
    trimmedBusiness.length > 200 ||
    trimmedPhone.length > 30 ||
    trimmedEmail.length > 150 ||
    trimmedLocation.length > 150 ||
    trimmedBrand.length > 100 ||
    trimmedMessage.length > 5000
  ) {
    return {
      valid: false,
      error:
        "Input text length exceeds maximum corporate limits. Please shorten your message.",
    };
  }

  // Email format regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      valid: false,
      error: "Invalid email format. Please provide a valid commercial address.",
    };
  }

  // Phone number format validation
  if (trimmedPhone.length < 7) {
    return {
      valid: false,
      error:
        "Invalid phone number. Please enter a valid mobile or contact number.",
    };
  }

  return {
    valid: true,
    cleaned: {
      name: trimmedName,
      businessName: trimmedBusiness,
      phone: trimmedPhone,
      email: trimmedEmail,
      location: trimmedLocation,
      interestedBrand: trimmedBrand,
      message: trimmedMessage,
    },
  };
}
