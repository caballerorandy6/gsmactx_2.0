# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack HVAC Services Platform for GSM A/C & General Contractor INC (Cypress, TX).
- **Live:** https://www.gsmactx.com
- **Type:** Next.js 16 App Router + Admin Dashboard + Email Campaigns

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 + React 19 | Framework with React Compiler (no manual memoization) |
| TailwindCSS 4 | Styling (use `bg-linear-to-r` not `bg-gradient-to-r`) |
| Prisma 7 + Supabase | PostgreSQL ORM |
| Resend | Email (100/day limit on free tier) |
| Zod 4 | Schema validation |
| Zustand | Global state |
| Framer Motion | Animations (avoid infinite animations for Lighthouse) |
| React Hook Form | Forms |
| JWT + bcrypt | Admin authentication |

---

## Architecture

### Route Groups
- `(admin)/` - Protected routes with sidebar layout, JWT auth via middleware
- `(auth)/` - Login page, separate layout
- `api/cron/` - Cron jobs only (Vercel requirement), secured with CRON_SECRET

### Key Patterns
- **Server Actions** (`src/app/actions/`): All data mutations go through server actions, not API routes
- **Prisma singleton** (`src/lib/db/prisma.ts`): Single client instance to prevent connection exhaustion
- **Zod schemas** (`src/lib/validations/zod.ts`): Centralized validation, used both client and server side
- **Zustand store** (`src/store/gsmactx-store.ts`): Global UI state (scroll position, active section)

### Email Campaign Flow
1. Admin creates campaign → stored in DB with `sent: false`
2. Admin clicks "Send" → creates CampaignEmailLog entries for each subscriber (status: pending)
3. Cron job runs daily 8 AM CST → sends up to 100 emails, updates log status
4. Failed emails can be retried manually

---

## Database Models (8 total)

### Core Models

```prisma
Admin           # Admin users with JWT auth
Appointment     # Service appointments (9 types, 5 statuses)
Campaign        # Email campaigns with stats
Subscriber      # Newsletter subscribers
CampaignEmailLog # Email delivery tracking
SMSCampaign     # SMS campaigns (future)
SMSMessage      # SMS logs (future)
```

### Service Types (Enum)
```
AC_MAINTENANCE, HEATING_MAINTENANCE, AC_REPAIR, HEATING_REPAIR,
AC_INSTALLATION, HEATING_INSTALLATION, FULL_HVAC_INSTALLATION,
DUCT_CLEANING, FREE_ESTIMATE
```

### Appointment Statuses (Enum)
```
PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
```

---

## Authentication

- **Method:** JWT in HttpOnly cookies
- **Expiry:** 24 hours
- **Password:** bcrypt (8+ chars, uppercase, number, symbol)
- **Protected:** All `/admin-*` routes

### Cron Jobs (API Routes)
| Route | Schedule | Purpose |
|-------|----------|---------|
| `/api/cron/keepalive` | Every 5 hours | Prevent cold starts |
| `/api/cron/send-campaigns` | Daily 8 AM CST | Batch email sending (100/day limit) |

---

## Environment Variables

```env
# Database (Supabase)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret

# Email (Resend)
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=noreply@gsmactx.com

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_SECRET_KEY=xxx

# Google Places
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=xxx
PLACE_ID=xxx

# Cron Security
CRON_SECRET=xxx

# Deployment
NEXT_PUBLIC_BASE_URL=https://www.gsmactx.com
BLOB_READ_WRITE_TOKEN=xxx
```

---

## Development Commands

```bash
# Development
npm run dev              # Start with Turbopack (http://localhost:3000)
npm run build            # Production build (runs prisma generate + migrate)
npm run lint             # ESLint

# Testing
npm run test             # Vitest watch mode
npm run test:run         # Vitest single run
npm run test -- Hero     # Run specific test file
npm run test:e2e         # Playwright E2E tests (starts dev server)
npm run test:e2e:ui      # Playwright with UI

# Database
npm run db:push          # Push Prisma schema to DB
npm run db:studio        # Open Prisma Studio GUI
npm run seed             # Seed database with initial data

# Performance
npm run lighthouse       # Audit production site
npm run lighthouse:local # Audit localhost
```

---

## Code Conventions

### ALWAYS:
- Server Components by default, `'use client'` only when needed (hooks, events, browser APIs)
- Server Actions for all CRUD operations (API routes only for cron jobs)
- Validate with Zod before any DB operation
- `next/image` with descriptive alt text
- Mobile-first: `className="w-full md:w-[800px]"` not `"w-[800px] md:w-full"`
- Parallel fetching: `Promise.all([getA(), getB()])` not sequential awaits

### NEVER:
- `useCallback`/`useMemo` - React 19 compiler handles memoization automatically
- Infinite CSS animations (hurts Lighthouse performance)
- Hardcode colors - use Tailwind theme tokens
- Skip loading/error states on async operations
- Create API routes for data mutations

---

## File Naming

- **Components:** `PascalCase.tsx`
- **Actions:** `camelCaseAction.ts`
- **Utilities:** `camelCase.ts`
- **Routes:** `kebab-case/`

---

## Git Commits

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, chore
```

### Rules:
- NEVER mention AI in commits
- No "Co-Authored-By" AI references
- Professional, human-authored appearance

---

## Performance & SEO

- Preconnect hints for Google services, lazy load reCAPTCHA on form pages only
- AVIF images, WebM video, code splitting via Next.js
- Security headers configured in `next.config.ts`
- JSON-LD schemas: LocalBusiness, Service, FAQ, Breadcrumb
- Dynamic sitemap (`sitemap.ts`), OG/Twitter images auto-generated
