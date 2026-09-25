/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare D1 Persistent Storage Adapter
 * Manages SQL transactions and fallback storage for B2B inquiries.
 */

import { InquiryRecord } from "./types";

// Fallback in-memory store if D1 is not bound in local/preview environment
const inMemoryInquiries: InquiryRecord[] = [];

/**
 * Initializes the D1 database table if it doesn't already exist.
 */
export async function initD1Schema(db?: D1Database): Promise<void> {
  if (!db) return;
  try {
    await db.exec(`
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
    `);
  } catch (err) {
    console.error("[D1 Init Error] Failed to execute D1 schema initialization:", err);
  }
}

/**
 * Inserts a new inquiry into Cloudflare D1 database.
 */
export async function saveInquiryToD1(
  inquiry: InquiryRecord,
  db?: D1Database
): Promise<{ success: boolean; source: "d1" | "memory"; error?: string }> {
  if (db) {
    try {
      await db
        .prepare(
          `INSERT INTO inquiries (
            id, name, business_name, phone, email, location, interested_brand, message, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          inquiry.id,
          inquiry.name,
          inquiry.businessName,
          inquiry.phone,
          inquiry.email,
          inquiry.location,
          inquiry.interestedBrand,
          inquiry.message,
          inquiry.timestamp
        )
        .run();

      console.log(`[D1 Database] Inquiry ${inquiry.id} (${inquiry.businessName}) successfully stored in Cloudflare D1.`);
      return { success: true, source: "d1" };
    } catch (d1Err: any) {
      console.error("[D1 Error] Failed to write record to Cloudflare D1:", d1Err);
      // Fallback to memory so user submission is never dropped
      inMemoryInquiries.push(inquiry);
      return { success: true, source: "memory", error: d1Err.message };
    }
  }

  // Fallback to in-memory store
  inMemoryInquiries.push(inquiry);
  console.log(`[Database Fallback] Inquiry ${inquiry.id} (${inquiry.businessName}) stored in memory (D1 binding not attached).`);
  return { success: true, source: "memory" };
}

/**
 * Retrieves latest inquiries from Cloudflare D1.
 */
export async function getInquiriesFromD1(
  db?: D1Database,
  limit: number = 50
): Promise<InquiryRecord[]> {
  if (db) {
    try {
      const { results } = await db
        .prepare(
          `SELECT id, name, business_name as businessName, phone, email, location, interested_brand as interestedBrand, message, created_at as timestamp 
           FROM inquiries 
           ORDER BY created_at DESC 
           LIMIT ?`
        )
        .bind(limit)
        .all<InquiryRecord>();

      return results || [];
    } catch (err) {
      console.error("[D1 Query Error] Failed to read from inquiries table:", err);
      return inMemoryInquiries;
    }
  }

  return [...inMemoryInquiries].reverse();
}
