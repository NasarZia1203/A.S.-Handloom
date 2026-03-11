# Product Requirements Document — A S Handloom Website

**Product**: Marketing and catalog website for A S Handloom, a handloom textile business in Bhagalpur, Bihar, India (est. 2007). Sells sarees and fabrics.

**Current state**: Frontend-only site with static product catalog, Supabase auth stub, and no admin panel.

---

## What Exists (Working)

- Landing page with Hero, About, Saree Collection, Fabric Collection, Contact, Footer sections
- Anchor-based smooth scroll navigation
- `react-multi-carousel` product carousels with 16 sarees and 16 fabrics (images hardcoded)
- Watermark overlay on product images
- WhatsApp floating button and contact form that opens WhatsApp with pre-filled message
- Supabase email/password auth at `/admin` (sign-in + sign-up)
- Scroll progress bar, parallax effect, section entrance animations
- Responsive layout (mobile/tablet/desktop)

---

## Bugs to Fix

### Critical
- **Dead Swiper code** ([src/App.tsx](src/App.tsx) lines 85–129): `Swiper` is imported and initialized targeting `.saree-swiper` / `.fabric-swiper` selectors that don't exist in the DOM. Remove the Swiper import and both `new Swiper(...)` blocks entirely.
- **Auth loop after sign-in**: `AuthPage` redirects to `/window.location.href = "/admin"` which renders `AuthPage` again. Once an admin dashboard exists, redirect there. Until then, redirect to `/` or show a success state.

### Minor
- **Favicon broken**: `index.html` `<link rel="icon" href="/browser-tab-logo" />` is missing a file extension. Either add the correct icon file or fix the path.
- **Page title**: `<title>ashandloom</title>` → should be `A S Handloom`.
- **Import ordering in carousel files**: `CustomDot` is defined before `import` statements in both [SareeCarousel.tsx](src/components/SareeCarousel.tsx) and [FabricCarousel.tsx](src/components/FabricCarousel.tsx). Move `CustomDot` after the imports.
- **Contact form UX**: Replace `alert()` with an inline success message component.

---

## Features to Build

### 1. Admin Dashboard (Highest Priority)
After successful sign-in, redirect to a protected `/admin/dashboard` route.

**Requirements:**
- Route guard: redirect unauthenticated users from `/admin/*` to `/admin` (login page)
- Sign-out button
- Stub dashboard page is acceptable as a first milestone

### 2. Dynamic Product Catalog (Supabase Integration)
Currently product data is hardcoded. Move to Supabase so the owner can manage products without code changes.

**Sarees table**: `id`, `code` (e.g. SAR1001), `description`, `image_url`, `category`, `is_active`, `sort_order`

**Fabrics table**: `id`, `code` (e.g. FAB3001), `description`, `image_url`, `category`, `is_active`, `sort_order`

**Frontend**: Replace hardcoded arrays in `SareeCollection.tsx` and `FabricCollection.tsx` with Supabase queries. Handle loading and empty states.

**Admin CRUD**: Add/edit/delete/reorder products from the admin dashboard. Image uploads via Supabase Storage.

### 3. Refactor Duplicate Carousel Components
`SareeCarousel` and `FabricCarousel` are identical except for CSS class names. Merge into one generic `ProductCarousel` component accepting an optional `variant` prop (`"saree" | "fabric"`) for class names.

### 4. Social Media Links
Wire up real URLs for the Footer social icons (Facebook, Instagram, Twitter/X, LinkedIn). Currently all `href="#"`.

### 5. SEO & Meta
- Proper `<title>` and `<meta name="description">` tags
- Open Graph tags for sharing
- Structured data (LocalBusiness schema) for Google

### 6. Remove Admin Link from Public Navbar
The "Admin" link in the navbar exposes the admin route to all visitors. Either remove it from the public nav or hide it (e.g., only show when already authenticated).

---

## Tech Stack Constraints

- React 19 + TypeScript + Vite — do not change
- Supabase — already integrated, use for DB + Storage + Auth
- No test framework yet — add Vitest if tests are needed
- CSS custom properties for theming — maintain existing design tokens

---

## Out of Scope (for now)

- E-commerce / cart / payments
- Order management
- Multi-language support
- PWA / offline support
