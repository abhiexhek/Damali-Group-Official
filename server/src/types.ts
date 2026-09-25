/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare Workers Environment Bindings & API Types
 */

export interface Env {
  // Cloudflare D1 Database binding
  DB?: D1Database;

  // Cloudflare KV Namespace binding for distributed rate limiting
  RATE_LIMIT_KV?: KVNamespace;

  // HTTP Transactional Email API Keys
  RESEND_API_KEY?: string;
  SENDGRID_API_KEY?: string;

  // Notification target emails
  COMPANY_RECEIVER_EMAIL?: string;
  EMAIL_FROM?: string;

  // Environment mode
  ENVIRONMENT?: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  interestedBrand: string;
  message: string;
  timestamp: string;
}

export interface ContactFormInput {
  name?: string;
  businessName?: string;
  phone?: string;
  email?: string;
  location?: string;
  interestedBrand?: string;
  message?: string;
  website_honey?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  emailStatus?: string;
  data?: T;
}
