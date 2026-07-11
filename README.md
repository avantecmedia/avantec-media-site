# Avantec Media — Website Setup Guide

## File Structure
```
avantec-media/
├── index.html       ← Main page (all sections)
├── style.css        ← Custom styles extending Tailwind
├── main.js          ← All vanilla JS logic
├── README.md        ← This file
└── assets/          ← CREATE this folder manually
    ├── logo.png         ← Your Avantec Media logo (exported from Inkscape)
    ├── hero.mp4         ← Your hero background video
    ├── hero-poster.jpg  ← Still frame fallback for video
    ├── about.jpg        ← Your photo for the About section
    ├── portfolio-01.jpg ← Portfolio images (01 through 06)
    ├── portfolio-02.jpg
    ├── portfolio-03.jpg
    ├── portfolio-04.jpg
    ├── portfolio-05.jpg
    └── portfolio-06.jpg
```

---

## Setup Checklist

### 1. Assets (Do First)
- [ ] Create the `assets/` folder in the same directory as index.html
- [ ] Export your logo from Inkscape as PNG (transparent background) → `assets/logo.png`
- [ ] Add your hero video → `assets/hero.mp4`
- [ ] Add portfolio images → `assets/portfolio-01.jpg` through `portfolio-06.jpg`
- [ ] Add your About photo → `assets/about.jpg`

### 2. Cal.com Booking Widget
1. Go to [cal.com](https://cal.com) and create a free account
2. Create an event type (e.g., "Real Estate Shoot Consultation")
3. In `index.html`, find `YOUR-CAL-USERNAME` and replace with your actual username
4. The dark theme and steel blue brand color are already configured

### 3. Contact Form (Formspree — Free)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — you'll get an endpoint like `https://formspree.io/f/XXXXXXXX`
3. In `index.html`, find `YOUR-FORMSPREE-ENDPOINT` and replace it with your URL
4. Test by submitting the form — responses go straight to your email

### 4. Payment Buttons (Stripe)
1. Create a [Stripe](https://stripe.com) account (free to set up)
2. Go to **Payment Links** in the Stripe dashboard
3. Create one payment link per package:
   - Essential — $199
   - Signature — $399
   - Pinnacle — $649
4. In `main.js`, find the `STRIPE_LINKS` object and paste in your URLs
5. No Stripe.js code needed — Payment Links handle everything

### 5. Update Your Contact Info
In `index.html`, find and replace:
- `hello@avantecmedia.com` → your real email
- `(727) 000-0000` → your real phone number
- Social media `href="#"` links → your real profile URLs

---

## Deploying to Vercel

1. Install [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
2. From your project folder, run: `vercel`
3. Follow the prompts — it auto-detects static sites
4. Your site is live at `yourproject.vercel.app`
5. Add a custom domain in the Vercel dashboard (avantecmedia.com)

**OR** — push to GitHub and connect the repo to Vercel for automatic deploys on every push.

---

## Customization Quick Reference

| What to change | Where |
|---|---|
| Brand colors | `style.css` top section + `tailwind.config` in `index.html` |
| Fonts | Google Fonts link in `index.html` `<head>` |
| Package prices | `index.html` — search for `$199`, `$399`, `$649` |
| Service descriptions | `index.html` — Services section |
| About copy | `index.html` — About section |
| Tagline | `index.html` — search for "Vantage Made Vivid" |

---

## Third-Party Services Used (All Free Tiers Available)

| Service | Purpose | Free Tier |
|---|---|---|
| [Vercel](https://vercel.com) | Hosting | Unlimited static sites |
| [Cal.com](https://cal.com) | Booking widget | Free for individuals |
| [Formspree](https://formspree.io) | Contact form | 50 submissions/month |
| [Stripe](https://stripe.com) | Payments | No monthly fee, 2.9% + 30¢ per transaction |
