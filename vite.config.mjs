import { defineConfig } from 'vite';

// Development preview only. Production remains a buildless static site.
export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: ['terminal.local'],
  },
});
