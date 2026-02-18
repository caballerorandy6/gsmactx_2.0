# GSM A/C & General Contractor INC

Professional HVAC services platform with admin dashboard and email campaign management.

![Next.js](https://img.shields.io/badge/Next.js-15.3.6-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-cyan)
![Prisma](https://img.shields.io/badge/Prisma-7.4-teal)

**Live Site:** [https://www.gsmactx.com](https://www.gsmactx.com)

---

## Features

### Public Website
- Responsive landing page with hero, services, testimonials
- 6 HVAC service detail pages
- Contact form with reCAPTCHA v3 protection
- Online appointment booking system
- Newsletter subscription with unsubscribe
- Google Business reviews integration
- FAQ section
- SEO optimized (JSON-LD, meta tags, sitemap)

### Admin Dashboard
- Secure JWT authentication
- Appointment management (CRUD + calendar view)
- Email campaign creation and management
- Batch email sending (100/day Resend limit)
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

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Styling** | TailwindCSS 4, Framer Motion |
| **Database** | PostgreSQL (Supabase), Prisma 7 |
| **Email** | Resend API, React Email |
| **Auth** | JWT + bcrypt |
| **Forms** | React Hook Form + Zod |
| **State** | Zustand |

---

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

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npm run db:push
npm run seed
```

5. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run seed` | Seed database |
| `npm run db:push` | Push Prisma schema |
| `npm run db:studio` | Open Prisma Studio |

---

## Project Structure

```
src/
├── app/
│   ├── (admin)/           # Admin dashboard routes
│   ├── (auth)/            # Authentication
│   ├── api/cron/          # Cron jobs only
│   ├── actions/           # Server actions
│   ├── services/[id]/     # Service detail pages
│   └── book-appointment/  # Public booking
├── components/
│   ├── admin/             # Admin UI components
│   ├── landing/           # Landing page sections
│   ├── forms/             # Form components
│   └── ui/                # Shared components
├── lib/
│   ├── auth/              # JWT utilities
│   ├── db/                # Prisma client
│   ├── validations/       # Zod schemas
│   └── data.ts            # Static data
├── hooks/                 # Custom hooks
├── store/                 # Zustand state
└── types/                 # TypeScript types
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection |
| `DIRECT_URL` | Yes | Direct DB connection |
| `JWT_SECRET` | Yes | JWT signing secret |
| `RESEND_API_KEY` | Yes | Email API key |
| `FROM_EMAIL` | Yes | Sender email |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Yes | reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | Yes | reCAPTCHA secret |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Yes | Google Places API |
| `CRON_SECRET` | Yes | Cron job auth |
| `NEXT_PUBLIC_BASE_URL` | Yes | Production URL |

---

## Deployment

Optimized for Vercel deployment:

```bash
vercel deploy
```

### Cron Jobs (vercel.json)

```json
{
  "crons": [
    {
      "path": "/api/cron/keepalive",
      "schedule": "0 */5 * * *"
    },
    {
      "path": "/api/cron/send-campaigns",
      "schedule": "0 13 * * *"
    }
  ]
}
```

---

## Documentation

- [Campaign System Guide](docs/CAMPAIGN_SYSTEM.md)
- [Cron Setup Guide](docs/CRON_SETUP.md)
- [Integration Guide](docs/INTEGRATION_GUIDE.md)
- [LLM Context](llms.txt)

---

## License

Private - All rights reserved

---

## Contact

**GSM A/C & General Contractor INC**
- Website: [https://www.gsmactx.com](https://www.gsmactx.com)
- Phone: (281) 235-4684
- Location: Cypress, TX 77433
