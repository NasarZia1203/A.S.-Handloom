# Product Requirements Document — A S Handloom Website

**Product**: Marketing, catalog, and administrative website for A S Handloom, a premier handloom textile business in Bhagalpur, Bihar, India (est. 2007). Sells authentic sarees and premium fabrics.

**Current state**: Production and deployment ready Next.js 15 App Router platform with dynamic Supabase integration, robust fallback catalog, protected administrative dashboard, and high-conversion WhatsApp inquiry channels.

---

## Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security + SSR Auth)
- **Media**: Cloudinary (dynamic uploads) + WebP static fallback catalog
- **Styling**: Native CSS custom properties (`app/globals.css`) + Font Awesome 6
- **State & Data**: SWR client queries + Server Components

---

## Production Features (Complete & Verified)

### 1. Storefront & Customer Experience
- [x] Responsive Landing Page with Hero, About Us, Saree Collection, Fabric Collection, Contact, and Footer.
- [x] Smooth anchor navigation with cross-page navigation support (`/#home`, `/#about`, etc.).
- [x] Dedicated Saree Catalog page (`/products/sarees`) with search, filter chips, and image zoom.
- [x] Dedicated Fabric Catalog page (`/products/fabrics`) with search, weave filter chips, and image zoom.
- [x] Direct WhatsApp CTAs on every product card with pre-filled product code & description.
- [x] Floating WhatsApp button for instant customer assistance.
- [x] Contact inquiry form with WhatsApp dispatch and inline confirmation message.
- [x] High-availability fallback catalog ensuring 100% storefront uptime regardless of database status.

### 2. Admin Dashboard & Inventory Management
- [x] Protected route guard (`/admin/dashboard/*`) via edge `middleware.ts` and server layout checks.
- [x] Admin login authentication at `/admin/login` with Supabase session management.
- [x] Comprehensive product table with pagination, search, category filtering, and sorting.
- [x] Complete product CRUD (Add, Edit, Delete, Toggle Active status, Reorder).
- [x] Cloudinary image upload widget integration.
- [x] Discretion: Admin entry removed from public header navbar; kept securely in footer and `/admin`.

### 3. SEO & Deployment Hardening
- [x] Schema.org `ClothingStore` / `LocalBusiness` JSON-LD structured data with GSTIN, proprietor, coordinates, and hours.
- [x] Dynamic `sitemap.xml` via `app/sitemap.ts`.
- [x] Crawl rules via `app/robots.ts` (protecting admin and API routes).
- [x] Progressive Web App manifest via `app/manifest.ts`.
- [x] OpenGraph and Twitter card metadata with canonical URL setup.
- [x] Security headers in `next.config.ts` (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- [x] Custom branded 404 (`app/not-found.tsx`), Error Boundary (`app/error.tsx`), and Loading (`app/loading.tsx`).
- [x] Legacy Vite artifacts (`index.html`, `dist/`) removed.
- [x] Production environment documentation (`.env.example` and `README.md`).

---

## Out of Scope (Future Phases)

- Online payment gateway (Razorpay / Stripe)
- Automated shipment tracking (Shiprocket)
- Multi-currency international pricing
