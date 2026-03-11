# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js dev server (localhost:3000)
npm run build     # Next.js production build
npm run start     # Serve production build
npm run lint      # ESLint (next lint)
```

No test framework is configured yet.

## Environment

Requires a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
```

See `.env.example` for the full list (no values).

## Architecture

Next.js 14+ App Router project (React 19 + TypeScript) for a handloom textile business. It has a public marketing/catalog site and a protected admin panel.

**Routing** (App Router):
- `/` — Public home page (Navbar, Hero, About, SareeCollection, FabricCollection, Contact, Footer, WhatsAppFloat)
- `/admin` — Redirects to `/admin/login` or `/admin/dashboard` based on auth
- `/admin/login` — Supabase email/password sign-in
- `/admin/dashboard` — Product management (protected by middleware + server-side auth check)
- `/admin/dashboard/products/new` — Add product form
- `/admin/dashboard/products/[id]` — Edit product form
- `/api/products` — GET (public), POST (protected)
- `/api/products/[id]` — PATCH, DELETE (protected)

**Collections**: `SareeCollection` and `FabricCollection` are async Server Components that fetch from Supabase server-side and pass data to `ProductCarousel` (a shared `'use client'` component using `react-multi-carousel`).

**Product data**: Stored in Supabase `products` table. Schema: id, code, description, image_url, category ('saree'|'fabric'), is_active, sort_order, created_at, updated_at.

**Supabase clients**:
- `lib/supabase/client.ts` — Browser client using `@supabase/ssr` `createBrowserClient`
- `lib/supabase/server.ts` — Server client using `@supabase/ssr` `createServerClient` with service role key
- `middleware.ts` — Auth check for `/admin/dashboard/*` routes and write operations on `/api/products/*`

**Styling**: Global CSS in `app/globals.css`. Uses CSS custom properties (`--color-primary`, `--color-gold`, `--font-family-heading`, etc.). Font Awesome 6 loaded via CDN `<link>` in `app/layout.tsx`. Admin panel uses inline styles.

**Image uploads**: Cloudinary Upload Widget loaded dynamically in `components/admin/CloudinaryUpload.tsx`. Product images are Cloudinary HTTPS URLs.

**Image assets**: All in `public/assets/` — hero images at `/assets/images/herosec*.webp`, watermark at `/assets/logowatermark.png`, about section images.

## Key Files

- `app/layout.tsx` — Root layout, imports globals.css, Font Awesome CDN, ScrollProgress
- `app/page.tsx` — Home page assembly with Suspense boundaries around server components
- `components/ProductCarousel.tsx` — Unified carousel with `variant` prop ('saree'|'fabric')
- `components/SectionAnimator.tsx` — Client component for IntersectionObserver section animations
- `middleware.ts` — Route protection for admin dashboard and API write operations
- `lib/types.ts` — Product, ProductInsert, ProductUpdate interfaces
- `lib/queries.ts` — Client-side Supabase query helpers

## Conventions

- Server Components by default; add `'use client'` only when needed (state, effects, event handlers)
- No `next/image` for product images — use `<img>` tags (existing CSS controls sizing)
- No CSS Modules — all styles in `globals.css`
- Admin panel uses inline styles
- Path alias `@/*` maps to project root
