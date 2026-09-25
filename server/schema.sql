-- Cloudflare D1 Database Schema for Nepal Distributors B2B Inquiries
-- Run locally: npx wrangler d1 execute nepal-distributors-db --local --file=server/schema.sql
-- Run in production: npx wrangler d1 execute nepal-distributors-db --remote --file=server/schema.sql

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  interested_brand TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_brand ON inquiries(interested_brand);
