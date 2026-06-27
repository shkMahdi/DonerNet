# DonorNet

A blood donor network that connects patients in need with registered donors across Bangladesh. Built to close the gap between an empty blood bank and the next available donor.

## What it does

Patients or their families can post blood donation requests specifying the blood group, location, hospital, and required time. Registered donors can browse open requests and respond. Volunteers and admins manage the platform to keep requests moving.

## Features

- **Donor registration** — sign up with blood group, district, and upazila
- **Donation requests** — create, edit, and track requests through their lifecycle (pending → in progress → done)
- **Role-based dashboard** — donors see their own requests, volunteers see all requests, admins see everything including user management
- **Real-time status updates** — request status updates reflect immediately without a page reload
- **Platform funding** — supporters can fund DonorNet via Stripe; contributions are displayed publicly to encourage others
- **Authentication** — email/password auth with session management via Better Auth

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth | Better Auth |
| Database | MongoDB |
| Payments | Stripe |
| UI | HeroUI + Tailwind CSS v4 |
| Forms | React Hook Form |

## Getting started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Required environment variables

```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_BASE_URL=
```

## Project structure

```
src/
├── app/
│   ├── dashboard/        # Role-based dashboard pages
│   ├── funding/          # Stripe payment + contributions table
│   ├── login/
│   ├── register/
│   └── api/              # Route handlers
├── components/
│   ├── dashboard/        # Sidebar, navbar, tables, modals
│   └── ...
```
