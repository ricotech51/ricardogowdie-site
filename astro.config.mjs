// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Your live domain. Used for the sitemap and Open Graph links.
  site: 'https://ricardogowdie.com',
  // Static files only: no server, no API routes.
  output: 'static',
  // Pages end in a slash (/about/), which every static host handles the same way.
  trailingSlash: 'always',
  build: {
    // Keep CSS in separate files so the security policy never has to allow inline styles.
    inlineStylesheets: 'never',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
