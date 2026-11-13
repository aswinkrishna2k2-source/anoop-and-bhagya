# Anoop & Bhagya — Wedding e-Invite

A mobile-first wedding invitation built with React, Vite and Framer Motion.

**What it does**
- Guests first see a cherry-red envelope with an embossed floral pattern, sealed with an ivory "AB" wax seal.
- Tapping the seal cracks it and starts the music, "Let the celebration begin".
- The side flaps fold open, then the top and bottom flaps, revealing "You're *cordially* invited".
- The card then fades through to:
  - your photo, tinted, with the couple's names written in calligraphy
  - a live countdown with "Add to Calendar"
  - Wedding and Reception cards with **Get Directions** buttons
  - a Share button

## Deploy to Vercel

1. On <https://vercel.com/new>, import this GitHub repository.
2. Vercel detects **Vite** automatically: the build command is `npm run build` and the output directory is `dist`. No other settings are needed.
3. Click **Deploy**.

Every push to `main` redeploys the site automatically.

### WhatsApp link preview
The page includes a preview image (`public/og-image.jpg`), title and description.
On Vercel, the production domain is filled in automatically at build time.
If you use a custom domain, add an environment variable **`SITE_URL`** in Vercel, for example `https://anoopwedsbhagya.com`, and redeploy.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Change any text

All wording, dates, times and map links are in **`src/data/wedding.js`**.
Everything in that file ships with the public site, so keep private details
(home addresses, phone numbers) out of it.

## Home-screen photo

The photo is **`public/couple.webp`** (1200 × 1600 WebP, about 230 KB). To replace it, save a new
portrait photo under that same name and push.

- Convert it to WebP first (for example at <https://squoosh.app>) and keep it under about 400 KB.
- Conversion also strips the phone's GPS location data, which you don't want on a public site.
- The cherry tint and fade are applied automatically.
- To change which part of the photo shows on phones, edit `object-position` under `.hero-media img`
  in `src/styles.css`. The current value is `57% 40%`.

## Music

"Let the celebration begin" plays from **`public/audio/celebration.m4a`** (AAC, 45 s, about 700 KB).

- It starts the moment the guest taps the wax seal. Phones only allow sound after a tap, so it can't start earlier.
- It fades in, pauses when the guest leaves the tab or app, and resumes when they return.
- A floating button in the bottom-right corner lets guests pause or replay it.
- To change the song, replace that file with another `.m4a` or `.mp3`. If you change the name, update `SRC` in `src/music.js`.

## Later: photo gallery
The gallery section has been left out for now. When you're ready, add a
`<Gallery />` component in `src/App.jsx`, at the marked spot between the
Events section and the Footer.
