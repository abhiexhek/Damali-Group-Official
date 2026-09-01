# Nepal Distributors Portal - Corporate Distributor Landing Page

An enterprise-grade, high-performance, responsive single-page landing website and automated inquiry manager tailored for authorized Fast-Moving Consumer Goods (FMCG) and Home Appliance distributors in Nepal.

Developed in **Vite + React (TypeScript) + Tailwind CSS v4 + Express** architecture.

---

## 🚀 Key Architectural Strengths

1. **Dual-Stack Server-Side Ingress (`server.ts` + Express)**:
   A clean Full-Stack routing system. Serves a rich, animated single-page client interface and exposes high-performance API endpoints (`/api/contact`) to process, filter, and archive dealer proposals securely on the server-side.
2. **Dynamic Brand Theme Preset Swapping**:
   Supports instantaneous visual redesign presets directly in the UI. Features themed variables for:
   * **Coca-Cola Theme** (Vibrant Red)
   * **Samsung Theme** (Royal Tech Blue)
   * **LG Theme** (Sophisticated Burgundy)
   * **Panasonic Theme** (Deep Royal Blue)
   * **Modern Dark** (Futuristic Slate)
   * **Modern Light** (Clean Soft-Grey)
   All parameters (primary, accent, background gradients, buttons, card boundaries, icons) automatically update instantly utilizing CSS Custom Variables mapped directly into Tailwind CSS v4 `@theme` layers.
3. **Double-Security Anti-Spam & Validation**:
   Protects the dealer portal using zero-friction client-side visual checks combined with **Honeypot (`website_honey`)** bot filters and full structural validation on the server before processing.
4. **CSV Database Archiving & Mail Delivery**:
   Submissions are securely escaped to prevent **CSV injection attacks** and appended to `inquiries.csv` on the server disk. It attempts email delivery to the firm using secure `nodemailer` SMTP, falling back gracefully to console logs with precise debug instructions if SMTP environment variables are unconfigured.
5. **Interactive Catalog Synchronization**:
   Features a state-synchronized brand grid and product catalog. Clicking any official brand card in the brand overview immediately applies active catalog tags, filters products, and smoothly scrolls the user down to the corresponding products.

---

## 📁 System Folder Map

```text
/
├── server.ts                 # Full-Stack Express Server (API routes + Vite Middleware)
├── inquiries.csv             # B2B Local Database File (Auto-generated on first form submission)
├── package.json              # System configuration and compilation scripts
├── tsconfig.json             # TypeScript configurations
├── vite.config.ts            # Vite asset configurations
├── src/
│   ├── main.tsx              # React mounting root
│   ├── App.tsx               # Primary layout manager and Providers wrapper
│   ├── index.css             # Tailwind CSS v4 layers + custom typography & glass-morphism classes
│   ├── types/
│   │   └── index.ts          # Centralized, strictly typed TypeScript interfaces
│   ├── config/
│   │   ├── company.ts        # Central editable B2B parameters (Address, Phones, Mission, Maps URL)
│   │   ├── themes.ts         # Visual theme preset declarations (Hex values, background style strings)
│   │   ├── navigation.ts     # Main header links & footer link structures
│   │   └── seo.ts            # Metadata parameters (Titles, description, Open Graph)
│   ├── data/
│   │   ├── brands.ts         # Complete list of official B2B brands (LG, Samsung, Coke, Parle, etc.)
│   │   └── products.ts       # Complete catalog listing with technical specifications
│   ├── providers/
│   │   └── ThemeProvider.tsx # Dynamic State-driven CSS variable injection manager
│   ├── hooks/
│   │   └── useTheme.ts       # React useContext hook proxy
│   └── components/
│       ├── common/
│       │   ├── Container.tsx      # Fluid responsive block alignment container
│       │   ├── Badge.tsx          # Multi-variant commercial tags indicator
│       │   ├── SectionTitle.tsx   # Consistent headers with motion entries
│       │   └── Button.tsx         # Multi-variant interactive actions trigger
│       ├── layout/
│       │   ├── Navbar.tsx         # Sticky navigation + brand preset selector dropdown
│       │   └── Footer.tsx         # VAT notices + social maps + direct CSV export tool
│       ├── ui/
│       │   ├── BrandCard.tsx      # Vector brand logo display card
│       │   ├── ProductCard.tsx    # Technical catalog display with expandable spec sheets
│       │   ├── StatisticCard.tsx  # Interactive scrolling Count-Up numbers card
│       │   └── ContactForm.tsx    # Validation-locked portal submission sheet
```

---

## ⚙️ Administration & Environmental Setup

To configure secure automatic email forwarding when inquiries are received, define the following variables inside your hosting platform environment variables (Secrets panel in AI Studio):

```env
# SERVER CONFIGURED SMTP SECRETS
SMTP_HOST="smtp.yourmailserver.com"
SMTP_PORT="587"
SMTP_USER="sender-address@company.com"
SMTP_PASS="secure-smtp-password"
COMPANY_RECEIVER_EMAIL="inquiries@company.com"
```

*Note: If these values are omitted or kept blank, the system operates in **Simulation & Preview mode**—automatically printing full styled email logs to the console while successfully recording data inside `inquiries.csv`.*

---

## 🛠️ Development & Production Workflows

### 1. Installation of Dependencies
Ensure Node modules are populated:
```bash
npm install
```

### 2. Launch Local Development Server
Boots the full Express server with live Vite assets compilation:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Compile for Production
Generates optimized static frontend assets and bundles the Node backend using `esbuild` to prevent ES import resolution issues:
```bash
npm run build
```

### 4. Run Production Server
Launches the standalone bundled file server in host environments:
```bash
npm run start
```

---

## 🔒 Security & Spam Protections

* **Honeypot Filter**: Includes a hidden `website_honey` form field. Bots automatically fill this input, which triggers immediate, silent suppression of their submissions on the server, saving database storage and processing power.
* **Input Validation & Escaping**: All inputs are matched against rigorous format expressions before writing, and CSV values are systematically escaped using quotes to block Excel macro-injections.
