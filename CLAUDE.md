# GSM A/C & General Contractor INC - Project Guide

## Project Overview

**Business:** GSM A/C & General Contractor INC
**Website:** https://www.gsmactx.com
**Location:** Cypress, TX 77433
**Phone:** (281) 235-4684
**Type:** Full-stack HVAC Services Platform with Admin Dashboard

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.6 | Framework (App Router) |
| React | 19.2.4 | UI Library (with React Compiler) |
| TypeScript | 5+ | Type safety |
| TailwindCSS | 4.1.18 | Styling |
| Prisma | 7.4.0 | ORM (PostgreSQL via Supabase) |
| Resend | 6.9.2 | Email service |
| Zod | 4.3.6 | Schema validation |
| Zustand | 5.0.11 | State management |
| Framer Motion | 12.34.0 | Animations |
| React Hook Form | 7.71.1 | Form handling |
| bcrypt | 6.0.0 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT authentication |

---

## Project Structure

```
src/
├── app/
│   ├── (admin)/                  # Protected admin routes
│   │   ├── admin-dashboard/      # Main dashboard with stats
│   │   ├── appointments/         # Appointment list view
│   │   ├── appointments/[id]/    # Appointment detail
│   │   ├── create-appointment/   # Create new appointment
│   │   ├── edit-appointment/[id]/ # Edit existing appointment
│   │   ├── create-campaign/      # Create email campaign
│   │   ├── edit-campaign/[id]/   # Edit campaign
│   │   ├── view-campaigns/[id]/  # Campaign details & sending
│   │   ├── test-campaign/        # Test email functionality
│   │   └── layout.tsx            # Admin layout with sidebar
│   ├── (auth)/login/             # Admin login page
│   ├── api/cron/                 # Cron jobs ONLY
│   │   ├── keepalive/            # Health check (every 5 hours)
│   │   └── send-campaigns/       # Daily sender (8 AM CST)
│   ├── actions/                  # Server Actions (15+ actions)
│   ├── services/[id]/            # Dynamic service detail pages
│   ├── book-appointment/         # Public booking form
│   ├── unsubscribe/              # Email unsubscribe handler
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # SEO robots.txt
│   ├── opengraph-image.tsx       # OG image generation
│   └── twitter-image.tsx         # Twitter card image
├── components/
│   ├── admin/                    # Admin UI (23 components)
│   │   ├── appointments/         # Appointment CRUD UI
│   │   ├── campaigns/            # Campaign management
│   │   ├── dashboard/            # Dashboard widgets
│   │   └── layout/               # Admin navigation
│   ├── landing/                  # Landing page (12 components)
│   ├── layout/                   # Header, Footer
│   ├── forms/                    # Form components
│   ├── ui/                       # Shared UI components
│   ├── seo/                      # JSON-LD components
│   └── providers/                # Context providers
├── lib/
│   ├── auth/                     # JWT auth utilities
│   ├── db/prisma.ts              # Prisma singleton
│   ├── email/                    # Email templates
│   ├── utils/                    # Phone, general utilities
│   ├── validations/zod.ts        # All Zod schemas
│   ├── data.ts                   # Static data (services, nav)
│   └── interfaces.ts             # TypeScript interfaces
├── hooks/                        # Custom React hooks
├── store/gsmactx-store.ts        # Zustand global state
├── types/                        # Type definitions
├── seo/                          # SEO utilities
└── __tests__/                    # Vitest tests
```

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

---

## Server Actions vs API Routes

### Use Server Actions for:
- All CRUD operations
- Form submissions
- Data mutations
- Authentication
- Email sending

### Use API Routes ONLY for:
- Cron jobs (Vercel requirement)

### Current API Routes:
| Route | Schedule | Purpose |
|-------|----------|---------|
| `/api/cron/keepalive` | Every 5 hours | Prevent cold starts |
| `/api/cron/send-campaigns` | Daily 8 AM CST | Batch email sending |

---

## Email Campaign System

- **Daily limit:** 100 emails (Resend free tier)
- **Batch processing:** Automatic via cron
- **Templates:** Promotional, Newsletter, Announcement
- **Tracking:** Sent/Failed/Pending per subscriber
- **Features:** Image upload, retry failed emails

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
npm run dev          # Start with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest tests
npm run seed         # Seed database
npm run db:push      # Push schema
npm run db:studio    # Prisma Studio
```

---

## Code Conventions

### ALWAYS:
- Use Server Components by default
- Use Server Actions for CRUD (not API routes)
- Validate with Zod before DB operations
- Use `next/image` with alt text
- Mobile-first responsive design
- Parallel fetching with `Promise.all()`

### NEVER:
- Use `'use client'` without necessity
- Create API routes for CRUD
- Import entire libraries
- Hardcode colors (use Tailwind)
- Skip loading/error states
- Use `useCallback`/`useMemo` (React 19 compiler handles this)

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

## Performance Optimizations

- Preconnect hints for Google services
- Lazy load reCAPTCHA only on form pages
- Lazy load video in Testimonials
- Security headers (HSTS, X-Frame-Options, etc.)
- AVIF images, WebM video
- Code splitting via Next.js

---

## SEO Implementation

- Dynamic sitemap generation
- robots.txt with admin routes blocked
- JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb)
- Open Graph and Twitter cards
- Meta tags per page
- Canonical URLs

---

## Documentation

- `/docs/CAMPAIGN_SYSTEM.md` - Email workflow
- `/docs/CRON_SETUP.md` - Cron job configuration
- `/docs/INTEGRATION_GUIDE.md` - System integration
- `/llms.txt` - LLM-friendly project summary
