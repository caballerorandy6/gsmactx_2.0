# GSM A/C & General Contractor INC - Project Guide

## Project Overview
**Business:** GSM A/C & General Contractor INC
**Website:** https://www.gsmactx.com
**Location:** Cypress, TX 77433
**Phone:** (281) 235-4684
**Type:** HVAC Services Landing Page + Admin Dashboard + Email Campaign System

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.6 | Framework (App Router) |
| React | 19.2.4 | UI Library |
| TypeScript | 5+ | Type safety |
| TailwindCSS | 4.1.18 | Styling |
| Prisma | 7.4.0 | ORM (PrismaPg adapter) |
| PostgreSQL | - | Database (Supabase) |
| Resend | 4.8.0 | Email service |
| Zod | 3.25.76 | Validation |
| Zustand | 5.0.11 | State management |
| Framer Motion | 12.34.0 | Animations |

---

## Installed Skills

| Skill | Purpose |
|-------|---------|
| `vercel-react-best-practices` | React and Next.js performance optimization guidelines |

---

## Project Structure

```
src/
├── app/
│   ├── (admin)/              # Protected admin routes
│   │   ├── admin-dashboard/  # Main dashboard
│   │   ├── appointments/     # List appointments
│   │   ├── appointments/[id] # Appointment detail
│   │   ├── create-appointment/ # Create appointment
│   │   ├── edit-appointment/[id]/ # Edit appointment
│   │   ├── create-campaign/  # Create email campaigns
│   │   ├── edit-campaign/    # Edit campaigns
│   │   ├── view-campaigns/   # List & send campaigns
│   │   └── layout.tsx
│   ├── (auth)/login/         # Admin login
│   ├── book-appointment/     # Public booking page
│   ├── api/cron/             # Cron jobs only
│   ├── actions/              # Server actions
│   ├── services/[id]/        # Dynamic service pages
│   └── unsubscribe/          # Email unsubscribe
├── components/
│   ├── admin-components/     # Admin UI components
│   ├── icons/                # SVG icons
│   └── [Section].tsx         # Page sections
├── hooks/                    # Custom React hooks
├── libs/                     # Utilities & data
├── store/                    # Zustand store
└── types/                    # TypeScript types
```

---

## HVAC Services

1. **Air Conditioning Installation** - `/services/air-conditioning-installation`
2. **Air Conditioning Repair** - `/services/air-conditioning-repair`
3. **Heating Installation** - `/services/heating-installation`
4. **Heating Repair** - `/services/heating-repair`
5. **Air Duct Sanitizing** - `/services/air-duct-sanitizing`
6. **Attic Insulation** - `/services/attic-insullation`

---

## Database Models (Prisma)

### Current Models
- **Admin** - Admin users with JWT auth
- **Subscriber** - Newsletter subscribers
- **Campaign** - Email campaigns
- **CampaignEmailLog** - Email sending logs
- **SMSCampaign** - SMS campaigns (future)
- **SMSMessage** - SMS logs (future)

### New Models (Appointments Feature)
```prisma
model Appointment {
  id            String   @id @default(uuid())
  clientName    String
  clientEmail   String
  clientPhone   String
  serviceType   ServiceType
  scheduledDate DateTime
  scheduledTime String
  address       String?
  notes         String?
  status        AppointmentStatus @default(PENDING)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  createdBy     String?
  admin         Admin?   @relation(fields: [createdBy])
}

enum ServiceType {
  AC_MAINTENANCE
  HEATING_MAINTENANCE
  AC_REPAIR
  HEATING_REPAIR
  AC_INSTALLATION
  HEATING_INSTALLATION
  FULL_HVAC_INSTALLATION
  DUCT_CLEANING
  FREE_ESTIMATE
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

---

## Authentication

- **Method:** JWT stored in HttpOnly cookies
- **Expiry:** 24 hours
- **Password:** bcrypt hashed (8+ chars, uppercase, number, symbol)
- **Protected routes:** All `/admin-*` routes

---

## Environment Variables

```env
# Database (Supabase)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Auth
JWT_SECRET=your-secret

# Email (Resend)
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=noreply@gsmactx.com

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_SECRET_KEY=xxx

# Google Places
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=xxx

# Cron
CRON_SECRET=xxx

# App
NEXT_PUBLIC_BASE_URL=https://www.gsmactx.com
```

---

## Development Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run lint         # Run ESLint
npm run seed         # Seed database
npm run db:push      # Push schema to DB
npm run db:studio    # Open Prisma Studio
```

---

## Code Conventions

### ALWAYS:
- Use Server Components by default
- **Use Server Actions instead of API routes** (except for cron jobs)
- Validate with Zod before DB operations
- Use `next/image` for images with proper alt text
- Mobile-first responsive design
- Parallel data fetching with `Promise.all()`

### NEVER:
- Use `'use client'` without necessity
- **Create API routes for CRUD operations** (use server actions)
- Import entire libraries (use tree-shaking)
- Hardcode colors (use Tailwind classes)
- Skip loading states or error boundaries
- Create data fetching waterfalls

---

## Server Actions vs API Routes

### Use Server Actions for:
- All CRUD operations (create, read, update, delete)
- Form submissions
- Data mutations
- Authentication actions
- Email sending

### Use API Routes ONLY for:
- Cron jobs (Vercel requires HTTP endpoints)
- Webhooks from external services
- Public APIs consumed by third parties

### Current API Routes to Remove:
| Route | Replacement |
|-------|-------------|
| `/api/send-email` | `sendEmailContactAction` (already exists) |
| `/api/campaigns/[id]` | `getCampaignByIdAction` |

### API Routes to KEEP:
| Route | Reason |
|-------|--------|
| `/api/cron/keepalive` | Vercel cron job |
| `/api/cron/send-campaigns` | Vercel cron job |

### File Naming:
- Components: `PascalCase.tsx`
- Actions: `camelCaseAction.ts`
- Utilities: `camelCase.ts`
- Routes: `kebab-case/`

---

## SEO Keywords

- "HVAC services Houston TX"
- "Air conditioning repair Cypress TX"
- "Heating installation Texas"
- "AC maintenance Houston"
- "Duct cleaning services"

---

## Email Campaign System

- **Daily limit:** 100 emails (Resend free tier)
- **Batch sending:** Automatic via cron job at 8 AM CST
- **Templates:** Promotional, Newsletter, Announcement
- **Tracking:** Sent/Failed/Pending status per subscriber

---

## Appointment System (NEW FEATURE)

### Service Types for Appointments:
1. A/C Maintenance (AC_MAINTENANCE)
2. Heating Maintenance (HEATING_MAINTENANCE)
3. A/C Repair (AC_REPAIR)
4. Heating Repair (HEATING_REPAIR)
5. A/C Installation (AC_INSTALLATION)
6. Heating Installation (HEATING_INSTALLATION)
7. Full HVAC Installation (FULL_HVAC_INSTALLATION)
8. Duct Cleaning (DUCT_CLEANING)
9. Free Estimate (FREE_ESTIMATE)

### Admin Features:
- Create/Read/Update/Delete appointments
- View daily/weekly/monthly calendar
- Filter by service type and status
- Client contact information management

### Public Features:
- Online appointment booking form
- Service type selection
- Date/time picker
- Confirmation email

---

## Git Commit Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, chore
Example: feat(appointments): add booking form component
```

### Commit Rules:
- **NEVER mention AI, Claude, Copilot, or any AI assistant in commits**
- No "Co-Authored-By" AI references
- Keep commits professional and human-authored in appearance
