# MediQr

**Tagline:** *Scan it before you swallow it*

## About the Project

MediQr is a comprehensive medicine verification and management system designed to enhance pharmaceutical safety and transparency. The platform enables administrators to manage medicine databases with detailed product information, while users can scan QR codes on medicine packaging to instantly access complete product details including expiry dates, batch numbers, and manufacturer information. Each medicine entry generates a unique, high-resolution QR code (2400x2400px PDF) that links to a dedicated public page with all relevant medicine information.

## About Me

This project was developed to address the critical need for quick and reliable medicine verification in healthcare settings. By bridging the gap between manufacturers, distributors, and end consumers, MediQr empowers users to make informed decisions about their medications through simple QR code scanning technology.

## Tech Stack

- **Frontend:** React, Next.js 15 (App Router), TypeScript
- **UI Framework:** Shadcn/UI, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Turso (SQLite), Drizzle ORM
- **QR Generation:** QRCode library with PDF export
- **Deployment:** Vercel-ready

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.