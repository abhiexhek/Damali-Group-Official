/**
 * HTTP-based Transactional Email Dispatcher for Cloudflare Workers
 * Uses native `fetch` to connect with Resend or SendGrid APIs.
 */

import { Env, InquiryRecord } from "./types";
import { escapeHtml } from "./security";

function isPlaceholder(val?: string): boolean {
  if (!val) return true;
  const lower = val.toLowerCase();
  return (
    lower.includes("your-api-key") ||
    lower.includes("your-resend") ||
    lower.includes("your-email") ||
    lower.includes("example.com")
  );
}

/**
 * Builds standard corporate inquiry HTML email payload.
 */
export function buildInquiryEmailHtml(inquiry: InquiryRecord): string {
  const escapedName = escapeHtml(inquiry.name);
  const escapedBusinessName = escapeHtml(inquiry.businessName);
  const escapedPhone = escapeHtml(inquiry.phone);
  const escapedEmail = escapeHtml(inquiry.email);
  const escapedLocation = escapeHtml(inquiry.location);
  const escapedInterestedBrand = escapeHtml(inquiry.interestedBrand);
  const escapedMessage = escapeHtml(inquiry.message).replace(/\n/g, "<br />");
  const formattedTime = new Date(inquiry.timestamp).toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #0f172a; margin: 0 0 6px 0; font-size: 20px;">New B2B Business Inquiry</h2>
        <p style="color: #64748b; font-size: 14px; margin: 0;">A commercial distributor inquiry has been submitted through the company landing portal.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px 12px; font-weight: 600; color: #475569; width: 140px; border-bottom: 1px solid #e2e8f0;">Timestamp</td>
          <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${formattedTime} (NPT)</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Contact Person</td>
          <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${escapedName}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Business Name</td>
          <td style="padding: 10px 12px; color: #1e293b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${escapedBusinessName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone Number</td>
          <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><a href="tel:${escapedPhone}" style="color: #2563eb; text-decoration: none;">${escapedPhone}</a></td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Official Email</td>
          <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${escapedEmail}" style="color: #2563eb; text-decoration: none;">${escapedEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Location / Region</td>
          <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${escapedLocation}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Interested Brand</td>
          <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
            <span style="background-color: #e2e8f0; color: #0f172a; padding: 3px 8px; border-radius: 4px; font-size: 13px; font-weight: 500;">
              ${escapedInterestedBrand}
            </span>
          </td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">Message / Requirements:</h4>
        <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0;">${escapedMessage}</p>
      </div>

      <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        Automated notification from Nepal Distributors Web System &bull; Damali Group Morang
      </p>
    </div>
  `;
}

/**
 * Dispatches transactional email via Resend or SendGrid HTTP API.
 * Falls back to simulation log if neither key is configured.
 */
export async function sendInquiryEmail(
  inquiry: InquiryRecord,
  env: Env
): Promise<{ success: boolean; status: string }> {
  const targetReceiver =
    env.COMPANY_RECEIVER_EMAIL && !isPlaceholder(env.COMPANY_RECEIVER_EMAIL)
      ? env.COMPANY_RECEIVER_EMAIL
      : "distributor-inquiries@example.com";

  const emailFrom =
    env.EMAIL_FROM && !isPlaceholder(env.EMAIL_FROM)
      ? env.EMAIL_FROM
      : "Nepal Distributors <inquiries@resend.dev>";

  const emailSubject = `🔔 NEW INQUIRY: ${inquiry.businessName} - interested in ${inquiry.interestedBrand}`;
  const emailHtml = buildInquiryEmailHtml(inquiry);

  // 1. Try Resend HTTP API (Primary Cloudflare recommendation)
  if (env.RESEND_API_KEY && !isPlaceholder(env.RESEND_API_KEY)) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [targetReceiver],
          reply_to: inquiry.email,
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      const resData: any = await response.json();

      if (response.ok) {
        console.log(`[Email] Resend dispatch success (ID: ${resData?.id}) to ${targetReceiver}`);
        return {
          success: true,
          status: "Email dispatched successfully via Resend HTTP API.",
        };
      } else {
        console.error("[Email Error] Resend API returned error:", resData);
        return {
          success: false,
          status: `Resend API Error: ${resData?.message || "Delivery rejected"}`,
        };
      }
    } catch (err: any) {
      console.error("[Email Exception] Failed to call Resend API:", err);
      return {
        success: false,
        status: `Resend Network Error: ${err.message}`,
      };
    }
  }

  // 2. Try SendGrid HTTP API (Alternative)
  if (env.SENDGRID_API_KEY && !isPlaceholder(env.SENDGRID_API_KEY)) {
    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: targetReceiver }],
              subject: emailSubject,
            },
          ],
          from: { email: emailFrom.includes("<") ? emailFrom.split("<")[1].replace(">", "") : emailFrom },
          reply_to: { email: inquiry.email, name: inquiry.name },
          content: [
            {
              type: "text/html",
              value: emailHtml,
            },
          ],
        }),
      });

      if (response.ok || response.status === 202) {
        console.log(`[Email] SendGrid dispatch success to ${targetReceiver}`);
        return {
          success: true,
          status: "Email dispatched successfully via SendGrid HTTP API.",
        };
      } else {
        const errorText = await response.text();
        console.error("[Email Error] SendGrid API returned status:", response.status, errorText);
        return {
          success: false,
          status: `SendGrid API Error: HTTP ${response.status}`,
        };
      }
    } catch (err: any) {
      console.error("[Email Exception] Failed to call SendGrid API:", err);
      return {
        success: false,
        status: `SendGrid Network Error: ${err.message}`,
      };
    }
  }

  // 3. Fallback: Simulated Dispatch (No API Key configured)
  console.log("\n--- [Cloudflare Worker Email Simulated] ---");
  console.log(`TO: ${targetReceiver}`);
  console.log(`REPLY_TO: ${inquiry.email} (${inquiry.name})`);
  console.log(`SUBJECT: ${emailSubject}`);
  console.log(`BRAND: ${inquiry.interestedBrand}`);
  console.log(`MESSAGE: ${inquiry.message}`);
  console.log("NOTE: Set RESEND_API_KEY in Cloudflare Worker environment to enable real live email delivery.");
  console.log("-------------------------------------------\n");

  return {
    success: true,
    status: "Email dispatch simulated (Configure RESEND_API_KEY in wrangler.toml or Cloudflare dashboard for live delivery).",
  };
}
