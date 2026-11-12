# GSM A/C & General Contractor

**Website and admin dashboard for an HVAC company in Cypress, TX** — service pages, online appointment booking, contact management and email campaigns that send themselves within the daily email quota.

**Live:** [gsmactx.com](https://www.gsmactx.com)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169e1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38b2ac?logo=tailwindcss)

## What it does

### Public site
- Landing page with hero, services, Google reviews, FAQ and contact.
- Service detail pages (A/C installation and repair, heating and more).
- **Online booking:** customers request an appointment for a service, date and time.
- Contact form protected with reCAPTCHA v3; contacts can unsubscribe from emails.
- SEO: metadata, JSON-LD, sitemap and `llms.txt`.

### Admin dashboard
- Login with JWT in an httpOnly cookie, plus forgot and reset password.
- Overview with business stats.
- Appointments: list, detail, create and edit.
- Contacts: add, edit and manage the email list.
- **Email campaigns:** write a campaign with an image (Vercel Blob), send a test to a fixed list, then send it to all contacts. A daily Vercel Cron job sends in batches of up to 100 emails per day (the Resend free-plan limit) and logs every email.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions), React 19, TypeScript |
| UI | Tailwind CSS 4, Headless UI, Heroicons, Framer Motion, Embla Carousel |
| Data | PostgreSQL, Prisma 7 (`@prisma/adapter-pg`) |
| Auth | JWT (`jsonwebtoken`) and bcrypt |
| Forms and state | React Hook Form, Zod, Zustand |
| Email | Resend, React Email |
| Storage | Vercel Blob |
| Security | Google reCAPTCHA v3 |
| Testing | Vitest and Testing Library (unit and integration), Playwright (end-to-end), Lighthouse |
| Hosting | Vercel (with Vercel Cron and Speed Insights) |

## Project structure

```
src/
  app/
    (admin)/        dashboard, appointments, contacts, campaigns, settings
    (auth)/         login, forgot and reset password
    services/       service pages
    book-appointment/
    unsubscribe/
    api/cron/       daily campaign sending and database keep-alive
    actions/        server actions
  components/       landing, admin and UI components
  lib/              auth, database, email rendering, data
prisma/             schema, migrations and seed
e2e/                Playwright tests
docs/               campaign system, cron and integration guides
```

## Getting started

**Requirements:** Node.js 20.9+ and PostgreSQL.

```bash
git clone https://github.com/caballerorandy6/gsmactx_2.0.git
cd gsmactx_2.0
npm install
# create .env with the variables below
npx prisma migrate dev      # create the database tables
npm run seed                # create the admin user
npm run dev                 # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signs the admin session |
| `NEXT_PUBLIC_BASE_URL` | Site URL |
| `RESEND_API_KEY`, `FROM_EMAIL` | Emails |
| `TEST_CAMPAIGN_EMAILS` | Comma-separated recipients for test campaigns |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 |
| `API_KEY`, `PLACE_ID` | Google Places (reviews) |
| `CRON_SECRET` | Protects the cron routes |
| `BLOB_READ_WRITE_TOKEN` | Image uploads (Vercel Blob) |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Generate the Prisma client, apply migrations and build |
| `npm test` / `npm run test:run` | Unit and integration tests (Vitest) |
| `npm run test:coverage` | Test coverage |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm run lighthouse` | Lighthouse report of the live site |
| `npm run seed` | Seed the database |

More detail in [`docs/`](docs/): campaign system, cron setup and integrations.

## Author

**Randy Caballero** — Full-Stack Developer, Houston, TX
[rcweb.dev](https://rcweb.dev) · [LinkedIn](https://linkedin.com/in/caballerorandy) · [GitHub](https://github.com/caballerorandy6)
