# A S Handloom — Heritage Sarees & Fabrics Catalog & Admin Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Postgres-3ECF8E?logo=supabase)](https://supabase.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary)](https://cloudinary.com/)

Official web portal and catalog platform for **A S Handloom**, a premier handloom manufacturer and textile merchant based in **Bhagalpur, Bihar, India** (established in 2007). The platform features an Indian luxury storefront, responsive product galleries, direct WhatsApp inquiry integration, and a protected administrative dashboard for real-time inventory management.

---

## 🌟 Key Features

### 🛍️ Customer Storefront
- **Modern Luxury Aesthetics**: High-end Indian design system with gold and festive accents, smooth animations, and responsive layouts across mobile, tablet, and desktop.
- **Dynamic Saree & Fabric Carousels**: Interactive product showcases with category-specific badges, image zoom modals, and custom watermark overlays.
- **Dedicated Catalog Galleries**: `/products/sarees` and `/products/fabrics` featuring real-time search by code, material filters, and instant WhatsApp inquiry triggers.
- **High-Converting WhatsApp CTAs**: Direct inquiries linking pre-filled product codes and descriptions straight to the business WhatsApp (`+91-9798141494`).
- **Resilient Fallback Catalog**: High-availability offline/cold-start fallback dataset ensuring zero empty storefront states even during database maintenance.

### 🛡️ Administrative Dashboard
- **Protected Route Guard**: Edge middleware security guarding `/admin/dashboard/*` and data-mutating API routes (`/api/products/*`).
- **Full Product CRUD**: Add, edit, soft-toggle (`is_active`), delete, and reorder products.
- **Cloudinary Image Upload**: Dynamic Cloudinary widget integration for instant high-speed image uploads and CDN delivery.
- **Server-Side Authentication**: Secure cookie-based session verification via `@supabase/ssr`.

### 🚀 Production & SEO Ready
- **Structured Data (Schema.org JSON-LD)**: Rich `ClothingStore` / `LocalBusiness` schema with GSTIN (`10AJXPA6956B1ZD`), proprietor info (MD RAZA ALAM), geo-coordinates, and opening hours.
- **Search Engine Optimization**: Dynamic `sitemap.xml`, `robots.txt`, and web app `manifest.webmanifest`.
- **Security Hardening**: Enterprise security headers (HSTS, CSP-ready, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- **Asset Optimization**: WebP image formatting, local hero caching, and preloading for low-latency LCP scores.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS custom properties (`app/globals.css`) + Font Awesome 6 Icons
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Media Hosting**: [Cloudinary](https://cloudinary.com/) (Asset uploads & image transformations)
- **Data Fetching**: [SWR](https://swr.vercel.app/) + Native Fetch with Server Components

---

## 📁 Project Structure

```text
ashandloom/
├── app/
│   ├── admin/
│   │   ├── dashboard/          # Protected admin dashboard & product CRUD
│   │   │   ├── products/[id]/  # Product edit view
│   │   │   └── products/new/   # Product creation view
│   │   ├── login/              # Admin login page
│   │   └── page.tsx            # Auth redirect handler
│   ├── api/
│   │   └── products/           # GET (public), POST, PATCH, DELETE (protected)
│   ├── products/
│   │   ├── fabrics/            # Complete fabric catalog page
│   │   └── sarees/             # Complete saree catalog page
│   ├── globals.css             # Design system & responsive styles
│   ├── layout.tsx              # Root layout with SEO metadata & JSON-LD
│   ├── manifest.ts             # PWA web manifest generator
│   ├── not-found.tsx           # Custom branded 404 page
│   ├── error.tsx               # Client error boundary
│   ├── loading.tsx             # Transition loading state
│   ├── robots.ts               # Robots.txt generator
│   ├── sitemap.ts              # Sitemap generator
│   └── page.tsx                # Homepage assembly
├── components/
│   ├── admin/                  # Admin sidebar, table, forms, Cloudinary widget
│   ├── About.tsx               # Brand story & workshop heritage
│   ├── Contact.tsx             # Interactive contact & WhatsApp inquiry form
│   ├── FabricCollection.tsx    # Fabric carousel section
│   ├── Footer.tsx              # Business credentials, GST, links & location
│   ├── Hero.tsx                # Hero banner with parallax & stats
│   ├── Navbar.tsx              # Responsive navigation & WhatsApp CTA
│   ├── ProductCarousel.tsx     # Reusable touch-friendly product carousel
│   ├── SareeCollection.tsx     # Saree carousel section
│   └── WhatsAppFloat.tsx       # Floating WhatsApp quick chat button
├── lib/
│   ├── data/                   # Fallback catalog data for 100% storefront uptime
│   ├── supabase/               # Browser and Server SSR Supabase clients
│   └── types.ts                # TypeScript interfaces (Product, etc.)
├── public/                     # Static assets, logos, and product photos
├── supabase/migrations/        # SQL schema, RLS policies, and seed data
├── middleware.ts               # Edge route protection & JWT validation
├── next.config.ts              # Security headers, remote patterns & optimizations
└── vercel.json                 # Vercel deployment configuration
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the project root based on `.env.example`:

```bash
cp .env.example .env.local
```

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (`https://xyz.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase anonymous API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret service role key (used server-side for admin CRUD) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`| Cloudinary unsigned upload preset |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain (e.g., `https://ashandloom.com`) |

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+
- **npm** or **pnpm**

### 2. Installation
```bash
git clone https://github.com/NasarZia1203/ashandloom.git
cd ashandloom
npm install
```

### 3. Database Initialization
Execute the SQL migrations found in `supabase/migrations/` inside your Supabase project's SQL Editor in numerical order:
1. `20260311000000_create_products_table.sql` (Creates `products` table, RLS policies, indexes, auto-update trigger)
2. `20260311000001_seed_products.sql` (Inserts initial saree and fabric products)

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Production Build Verification
```bash
npm run build
npm run start
```

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `ashandloom` repository.
4. Add all environment variables listed above in the Vercel dashboard.
5. Click **Deploy**. Vercel will automatically build and deploy the Next.js App Router application.

### Deploying to Netlify
1. Connect repository in [Netlify](https://app.netlify.com/).
2. Set Build Command to: `npm run build`
3. Set Publish Directory to: `.next`
4. Add your Environment Variables in **Site Configuration > Environment Variables**.
5. Deploy.

### Deploying to Ubuntu / VPS (Docker / PM2)
```bash
# Build production bundle
npm run build

# Start daemon with PM2
pm2 start npm --name "ashandloom" -- start
pm2 save
```
Configure Nginx as a reverse proxy forwarding port `80/443` to `http://localhost:3000`.

---

## 🏢 Business Information

- **Business Name**: A S Handloom
- **Proprietor**: MD RAZA ALAM
- **GSTIN**: `10AJXPA6956B1ZD`
- **Location**: 85 M T N Ghosh Road, Hasnabad, Champanagar, Bhagalpur, Bihar 812004, India
- **Phone**: [+91-9430908657](tel:+919430908657) / [+91-9798141494](tel:+919798141494)
- **WhatsApp**: [+91-9798141494](https://wa.me/919798141494)
- **Email**: [ashandloombgp@gmail.com](mailto:ashandloombgp@gmail.com)

---

## 📄 License
© 2007–2026 A S Handloom. All rights reserved.
