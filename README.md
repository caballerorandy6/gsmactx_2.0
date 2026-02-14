# GSM A/C & General Contractor INC

Professional HVAC services landing page with admin dashboard and email campaign management system.

![Next.js](https://img.shields.io/badge/Next.js-15.3.6-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-cyan)
![Prisma](https://img.shields.io/badge/Prisma-6.12-teal)

## Overview

A full-stack HVAC business website featuring:
- Public landing page with services, testimonials, and contact form
- Admin dashboard for email campaign management
- Newsletter subscription system with batch email sending
- Google Business reviews integration
- SEO optimized with JSON-LD structured data

**Live Site:** [https://www.gsmactx.com](https://www.gsmactx.com)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TailwindCSS 4, Framer Motion
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma 6
- **Email:** Resend API
- **Auth:** JWT + bcrypt
- **Forms:** React Hook Form + Zod validation
- **State:** Zustand

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Supabase recommended)
- Resend API key
- Google reCAPTCHA v3 keys
- Google Places API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/caballerorandy6/gsmactx_2.0.git
cd gsmactx_2.0
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication
JWT_SECRET="your-secret-key"

# Email (Resend)
RESEND_API_KEY="re_xxxxx"
FROM_EMAIL="noreply@yourdomain.com"

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="xxx"
RECAPTCHA_SECRET_KEY="xxx"

# Google Places
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY="xxx"

# Cron Security
CRON_SECRET="xxx"

# Base URL
NEXT_PUBLIC_BASE_URL="https://www.gsmactx.com"
```

5. Set up the database:
```bash
npm run db:push
npm run seed
```

6. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with initial data |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:studio` | Open Prisma Studio |

## Project Structure

```
src/
├── app/
│   ├── (admin)/           # Admin dashboard routes
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── actions/           # Server actions
│   ├── services/          # Service detail pages
│   └── page.tsx           # Homepage
├── components/
│   ├── admin-components/  # Admin UI
│   └── [Section].tsx      # Page sections
├── hooks/                 # Custom React hooks
├── libs/                  # Utilities, types, data
├── store/                 # Zustand state
└── types/                 # TypeScript definitions
```

## Features

### Public Website
- Responsive landing page
- Service showcase with detailed pages
- Contact form with reCAPTCHA protection
- Newsletter subscription
- Google Business reviews display
- FAQ section
- SEO optimized (JSON-LD, meta tags, sitemap)

### Admin Dashboard
- Secure JWT authentication
- Email campaign creation and management
- Batch email sending (100/day free tier)
- Campaign analytics and tracking
- Subscriber management
- Image upload (Vercel Blob)

### Services Offered
1. Air Conditioning Installation
2. Air Conditioning Repair
3. Heating Installation
4. Heating Repair
5. Air Duct Sanitizing
6. Attic Insulation

## Deployment

The project is optimized for Vercel deployment:

```bash
vercel deploy
```

### Cron Jobs (Vercel)

Configure in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/send-campaigns",
      "schedule": "0 13 * * *"
    }
  ]
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `DIRECT_URL` | Yes | Direct DB connection (for migrations) |
| `JWT_SECRET` | Yes | Secret for JWT signing |
| `RESEND_API_KEY` | Yes | Resend API key for emails |
| `FROM_EMAIL` | Yes | Sender email address |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Yes | reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | Yes | reCAPTCHA secret key |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Yes | Google Places API key |
| `CRON_SECRET` | Yes | Secret for cron job auth |
| `NEXT_PUBLIC_BASE_URL` | Yes | Production URL |

## License

Private - All rights reserved

## Contact

**GSM A/C & General Contractor INC**
- Website: [https://www.gsmactx.com](https://www.gsmactx.com)
- Phone: (281) 235-4684
- Location: Cypress, TX 77433
