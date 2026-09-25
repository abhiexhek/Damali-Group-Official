# Nepal Distributors Portal - Cloudflare Monorepo Architecture

A modern, enterprise-grade B2B distributor landing page and automated dealer inquiry system for **Damali Group** (official FMCG & Home Appliance distributor in Morang, Nepal). 

Refactored from an Express monolith into a clean, decoupled monorepo optimized for **Cloudflare Pages** (frontend) and **Cloudflare Workers** (serverless backend).

---

## 📁 Monorepo Layout

```text
/
├── client/                     # Frontend Application (Vite + React SPA)
│   ├── public/                 # Static assets, brand logos, favicons
│   ├── src/                    # UI Components, pages, hooks, styling
│   │   ├── components/         # Modular layout, hero, brand showcase, contact form
│   │   ├── config/             # Company details, SEO, themes, navigation
│   │   ├── data/               # Official brand profiles & product listings
│   │   ├── providers/          # ThemeProvider for real-time brand switching
│   │   ├── App.tsx             # Root application component
│   │   ├── main.tsx            # Vite entry point
│   │   └── index.css           # Tailwind CSS v4 styling & typography
│   ├── index.html              # HTML entry template
│   ├── vite.config.ts          # Vite configuration with static build to dist/
│   ├── tsconfig.json           # Client TypeScript configuration
│   └── package.json            # Client dependencies & scripts
│
├── server/                     # Backend Application (Cloudflare Workers API)
│   ├── src/
│   │   ├── index.ts            # Hono router entry point (export default app)
│   │   ├── db.ts               # Cloudflare D1 database operations & fallback
│   │   ├── email.ts            # HTTP transactional email dispatcher (Resend / SendGrid)
│   │   ├── security.ts         # IP rate limiting, honeypot filter, XSS escaping, validation
│   │   └── types.ts            # Worker environment bindings & request schemas
│   ├── schema.sql              # D1 SQL migration schema for `inquiries` table
│   ├── wrangler.toml           # Server-level Cloudflare Workers configuration
│   ├── tsconfig.json           # Cloudflare Workers TypeScript configuration
│   └── package.json            # Server dependencies & scripts
│
├── server.ts                   # Full-stack dev bridge (runs Express + Vite on port 3000)
├── inquiries.json              # Local development database mirror
├── wrangler.toml               # Root Cloudflare Workers deployment configuration
├── .env.example                # Template for environment variables and secrets
└── package.json                # Monorepo orchestration scripts (dev, build, lint)
```

---

## ⚡ Core Technical Adaptations for Cloudflare

1. **Routing Layer (`server/src/index.ts`)**:
   - Replaced Node `express` and `app.listen` with **Hono**, a blazing-fast, lightweight router designed natively for edge environments like Cloudflare Workers.
   - Built-in CORS support enables seamless cross-domain requests between Cloudflare Pages and Workers.

2. **Persistent Storage with Cloudflare D1 (`server/src/db.ts` & `server/schema.sql`)**:
   - Replaced local filesystem storage (`inquiries.json` via Node `fs`) with **Cloudflare D1**, Cloudflare's serverless SQLite relational database.
   - Automatically falls back gracefully to in-memory persistence during local non-D1 testing so forms never fail.

3. **HTTP-Based Email Delivery (`server/src/email.ts`)**:
   - Replaced TCP-based `nodemailer` SMTP sockets (which are blocked in serverless edge runtimes) with HTTP `fetch` integration for **Resend** (recommended) and **SendGrid**.
   - Features rich HTML notification templates with auto-formatted inquiry tables and contact metadata.
   - Graceful simulation fallback: if keys are not set, prints formatted logs so development and testing proceed without errors.

4. **Edge Security & Anti-Spam (`server/src/security.ts`)**:
   - **Distributed Rate Limiting**: IP rate limiting backed by Cloudflare KV (`RATE_LIMIT_KV`), with in-memory fallback.
   - **Honeypot Protection**: Silent bot suppression using the `website_honey` trap field.
   - **XSS & Injection Sanitization**: Comprehensive HTML entity escaping via `escapeHtml()`.
   - **Strict Input Length & Format Validation**: Enforces length constraints, regex email checks, and minimum phone length.

5. **Client Configuration (`client/src/components/ui/ContactForm.tsx`)**:
   - Automatically defaults to `/api/contact` for same-domain or reverse-proxy deployments.
   - Supports optional `VITE_API_BASE_URL` when hosting the frontend on a different domain than the Cloudflare Worker.

---

## 🛠️ Step-by-Step Developer Setup & Deployment Guide

### 1. Local Monorepo Development

To run the unified full-stack application locally on [http://localhost:3000](http://localhost:3000):

```bash
npm install
npm run dev
```

This runs `server.ts`, which serves the Vite client in middleware mode and proxies `/api/*` to the Cloudflare Workers Hono router.

---

### 2. Setting Up Cloudflare D1 Database

#### Step A: Provision D1 Database
Make sure you are logged into Wrangler:
```bash
npx wrangler login
```

Create a new Cloudflare D1 database:
```bash
npx wrangler d1 create nepal-distributors-db
```

Wrangler will output configuration information similar to:
```toml
[[d1_databases]]
binding = "DB"
database_name = "nepal-distributors-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

#### Step B: Add Database ID to `wrangler.toml`
Update the `database_id` in `wrangler.toml` (and `server/wrangler.toml`):
```toml
[[d1_databases]]
binding = "DB"
database_name = "nepal-distributors-db"
database_id = "YOUR_ACTUAL_D1_DATABASE_ID"
```

#### Step C: Execute Database Schema Migration
Run the initial SQL schema migration to create the `inquiries` table:

- **For Local Testing:**
  ```bash
  npx wrangler d1 execute nepal-distributors-db --local --file=server/schema.sql
  ```

- **For Production Cloudflare:**
  ```bash
  npx wrangler d1 execute nepal-distributors-db --remote --file=server/schema.sql
  ```

---

### 3. Setting Up Resend (Transactional Email)

#### Step A: Obtain API Key
1. Sign up for free at [Resend.com](https://resend.com).
2. Generate an API Key under **API Keys**.
3. (Optional) Verify your custom company domain under **Domains** (or use `onboarding@resend.dev` for initial testing).

#### Step B: Configure Secrets in Cloudflare

- **Option 1: Via Wrangler CLI (Recommended)**
  ```bash
  npx wrangler secret put RESEND_API_KEY
  # When prompted, paste your Resend key (e.g., re_123456789_abcdefg)
  ```

- **Option 2: Via Cloudflare Dashboard**
  1. Open **Cloudflare Dashboard** -> **Compute (Workers & Pages)**.
  2. Select your Worker: `nepal-distributors-api`.
  3. Navigate to **Settings** -> **Variables and Secrets**.
  4. Click **Add** under **Secrets**, enter variable name `RESEND_API_KEY`, enter value, and click **Save and Deploy**.

#### Step C: Set Notification Email Addresses
In `wrangler.toml` (under `[vars]`):
```toml
[vars]
ENVIRONMENT = "production"
COMPANY_RECEIVER_EMAIL = "distributor-inquiries@example.com"
EMAIL_FROM = "Nepal Distributors <inquiries@yourdomain.com>"
```

---

### 4. Deploying the Backend to Cloudflare Workers

From the project root:
```bash
npm run deploy:worker
```
*(Or inside `/server`: `npx wrangler deploy`)*

Cloudflare will deploy your API and output your public Worker URL:
`https://nepal-distributors-api.<your-subdomain>.workers.dev`

You can verify the deployment by visiting:
`https://nepal-distributors-api.<your-subdomain>.workers.dev/api/health`

---

### 5. Deploying the Frontend to Cloudflare Pages

#### Step A: Build Static Production Assets
```bash
npm run build:client
```
This generates the optimized static bundle in `client/dist/`.

#### Step B: Deploy to Cloudflare Pages

- **Via Wrangler CLI:**
  ```bash
  npm run deploy:pages
  ```
  *(Or: `npx wrangler pages deploy client/dist --project-name=nepal-distributors`)*

- **Via Cloudflare Git Integration (Automated CI/CD):**
  1. Go to **Cloudflare Dashboard** -> **Pages** -> **Connect to Git**.
  2. Select your repository.
  3. Set **Framework preset**: `Vite`.
  4. Set **Build command**: `cd client && npm run build` (or `npm run build:client`).
  5. Set **Build output directory**: `client/dist`.
  6. Under **Environment variables**, if your API Worker is on a different domain, add:
     - `VITE_API_BASE_URL`: `https://nepal-distributors-api.<your-subdomain>.workers.dev`

---

## 🔒 Security Best Practices Implemented

- **No Exposed Secrets**: All sensitive credentials (`RESEND_API_KEY`, etc.) are injected strictly on the server-side via Cloudflare Worker bindings / secrets.
- **Strict Content-Type Enforcements**: JSON payload validation rejects malformed requests before processing.
- **SQL Parameterization**: All D1 database queries utilize `.bind(...)` parameterized statements to eliminate SQL injection risks.
- **HTML Sanitization**: Form inputs are escaped before rendering in email bodies to protect email clients from script injection.
