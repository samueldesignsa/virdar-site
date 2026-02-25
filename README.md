# virdar.co — Landing Page

AI automation agency landing page for Virdar.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Formspree for contact form
- Vercel for deployment

## Setup

```bash
npm install
npm run dev
```

## Before Going Live

### 1. Formspree

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your form ID (looks like `xpwzabcd`)
4. In `src/App.tsx`, replace `YOUR_FORMSPREE_ID` with your actual form ID:
   ```
   https://formspree.io/f/YOUR_FORMSPREE_ID
   ```

### 2. Vercel Deploy

1. Go to [vercel.com](https://vercel.com) and import this GitHub repo
2. Vercel will auto-detect Vite — no config needed (vercel.json is included)
3. Set your custom domain `virdar.co` in Vercel project settings
4. Update DNS records at your domain registrar to point to Vercel

### 3. DNS Setup

Add these records at your DNS provider:
- `A` record: `@` → `76.76.21.21` (Vercel IP)
- `CNAME` record: `www` → `cname.vercel-dns.com`

## Build

```bash
npm run build
```

Output goes to `dist/`.
