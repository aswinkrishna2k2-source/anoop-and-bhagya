import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Link previews (WhatsApp etc.) need an absolute og:image URL.
// On Vercel the production domain is picked up automatically;
// set SITE_URL (e.g. https://anoop-weds-bhagya.com) to override it.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    },
  ],
});
