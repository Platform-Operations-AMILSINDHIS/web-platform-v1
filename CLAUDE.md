# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# GraphQL codegen (run after changing .graphql files)
npm run graphql-codegen:generate
npm run graphql-codegen:watch

# Prisma (NextAuth models only — Supabase handles main DB)
npx prisma generate
npx prisma db push
```

## Architecture Overview

This is a **Next.js 13 + tRPC** community management platform for the Amil Sindhi organization (Khudabadi Amil Panchayat). It handles membership enrollment, matrimony matching, events, blog, and donations.

### Data Flow

```
React Component
  → tRPC client (wraps React Query)
  → tRPC router (src/server/api/root.ts aggregates all routers)
  → Router handler (src/server/api/routers/)
  → Supabase PostgreSQL (main data) or Prisma/MySQL (NextAuth only)
```

All routers live in `src/server/api/routers/`. Key ones: `form`, `matrimonyProfiles`, `authRouter`, `profileRequests`, `admin`, `aws`, `r2`.

### Dual Database Setup

- **Supabase PostgreSQL** — primary database for all application data (users, memberships, matrimony, forms, requests, file metadata)
- **Prisma + MySQL** — only for NextAuth session tables (`User`, `Account`, `Session`, `VerificationToken`)

Do not use Prisma for application data. Use the Supabase client from `src/lib/supabase.ts`.

### Authentication — Three Layers

1. **User auth** — Supabase Auth (email/password). Session lives in `general_accounts` table. Checked in tRPC middleware.
2. **Admin auth** — Custom implementation against `admin_accounts` Supabase table. Managed with Jotai atoms client-side.
3. **NextAuth.js** — Present in `src/server/auth.ts` but secondary; used as a wrapper and for potential OAuth expansion.

Membership guards are tRPC middleware: `requireKAPMember()`, `requireYACMember()`, `requireMatrimonyMember()`, `verifyAgeForMembership()`.

### File Storage — Two Tiers

- **Cloudflare R2** (`r2Router`) — primary store for matrimony photos and profile images. Client uploads directly via presigned URL from `r2Router.getPresignedUrl()`. Metadata stored in `application_s3_meta`.
- **AWS S3** (`aws` router) — user documents (PAN cards, address proofs).

Public URL for R2 assets comes from `NEXT_PUBLIC_R2_ACCESS_URL` env var.

### Form Submission Flow

1. Formik + Yup for client-side validation (schemas in `src/utils/schemas.ts`)
2. `formRouter.submitForm()` via tRPC
3. Server generates membership ID (`K`/`Y`/`P` prefix + number), stores in `form_buffer` with status `PENDING`
4. Sends confirmation email via AWS SES with PDF attachment
5. PDF generated server-side using `@react-pdf/renderer` from `src/server/pdfs/`

### Email System

Primary: AWS SES via `src/lib/aws/ses.ts`. Fallback: Nodemailer. Email templates and types defined in `src/types/mails.d.ts`. All outbound mail goes through `src/server/mail.ts`.

### State Management

- **Jotai** — primary global state (user session, admin session, selected profiles). Atoms typed in `src/types/atoms/`.
- **Redux Toolkit** — present but minimal usage.
- **React Query** — server state via tRPC.

### Content (CMS)

Blog posts and events come from **Contentful** via GraphQL. Types are generated — after changing `.graphql` files in `src/lib/graphql/`, run `graphql-codegen:generate`. The generated SDK is at `src/lib/__generated/sdk.ts`.

### Key Directory Map

| Path | Purpose |
|------|---------|
| `src/server/api/routers/` | All tRPC endpoint logic |
| `src/server/pdfs/` | PDF generation (membership cards, matrimony profiles) |
| `src/server/mail.ts` | Email sending logic |
| `src/server/auth.ts` | NextAuth config |
| `src/lib/` | AWS, Supabase, GraphQL clients |
| `src/hooks/` | `useAWS`, `useProfile`, `usePayment`, `useServerActions` |
| `src/types/` | TypeScript interfaces for API, forms, atoms |
| `src/utils/schemas.ts` | All Yup validation schemas |
| `src/constants/LandingConstants.tsx` | Static page content |
| `src/sections/` | Page-level section components |
| `src/layouts/` | Layout wrappers (Admin, Profile, Table, Modal) |

### Membership Types

- **KAP** (Khudabadi Amil Panchayat) — age 21+, membership ID prefix `K`
- **YAC** (Young Amil Circle) — age 16–30, prefix `Y`
- **Patron** — prefix `P`

### Payments

Razorpay (`react-razorpay`) handles membership fees and donations. Payment success callback hits `/api/pay/success`, which verifies and updates membership status, then redirects to `/paymentsuccess`.

## Environment Variables

Defined and validated in `src/env.mjs`. Key groups:

- `DATABASE_URL` — MySQL for Prisma/NextAuth
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- `SUPABASE_URL`, `SUPABASE_API_KEY`
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ACCOUNT_ID`
- `NEXT_PUBLIC_R2_ACCESS_URL` — public base URL for R2 files
- `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`
- `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`
- `EMAIL_USER`, `EMAIL_PASS` — Nodemailer fallback
- AWS SES credentials live in `.env` (not in `env.mjs`)
