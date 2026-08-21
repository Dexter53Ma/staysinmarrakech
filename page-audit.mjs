import { chromium } from 'playwright';

const pages = [
  { url: 'http://localhost:3000/fr', name: 'Homepage FR' },
  { url: 'http://localhost:3000/en', name: 'Homepage EN' },
  { url: 'http://localhost:3000/fr/properties', name: 'Properties FR' },
  { url: 'http://localhost:3000/en/properties', name: 'Properties EN' },
  { url: 'http://localhost:3000/fr/properties/zohra', name: 'Property Detail FR' },
  { url: 'http://localhost:3000/en/properties/zohra', name: 'Property Detail EN' },
  { url: 'http://localhost:3000/fr/blog', name: 'Blog FR' },
  { url: 'http://localhost:3000/en/blog', name: 'Blog EN' },
  { url: 'http://localhost:3000/fr/contactez-nous', name: 'Contact FR' },
  { url: 'http://localhost:3000/en/contactez-nous', name: 'Contact EN' },
  { url: 'http://localhost:3000/fr/service', name: 'Service FR' },
  { url: 'http://localhost:3000/en/service', name: 'Service EN' },
  { url: 'http://localhost:3000/fr/testimonials', name: 'Testimonials FR' },
  { url: 'http://localhost:3000/en/testimonials', name: 'Testimonials EN' },
  { url: 'http://localhost:3000/fr/mentions-legales', name: 'Legal FR' },
  { url: 'http://localhost:3000/en/mentions-legales', name: 'Legal EN' },
  { url: 'http://localhost:3000/fr/politique-de-confidentialite', name: 'Privacy FR' },
  { url: 'http://localhost:3000/en/politique-de-confidentialite', name: 'Privacy EN' },
  { url: 'http://localhost:3000/fr/agence', name: 'Agency FR' },
  { url: 'http://localhost:3000/en/agence', name: 'Agency EN' },
  { url: 'http://localhost:3000/fr/villas/wishlist', name: 'Wishlist FR' },
  { url: 'http://localhost:3000/fr/marrakech-villas/location-villa-marrakech', name: 'Location Villa' },
  { url: 'http://localhost:3000/fr/marrakech-villas/vente-villa-marrakech', name: 'Vente Villa' },
  { url: 'http://localhost:3000/fr/marrakech-villas/villa-de-luxe', name: 'Villa Luxe' },
  { url: 'http://localhost:3000/fr/marrakech-villas/villa-exception', name: 'Villa Exception' },
  { url: 'http://localhost:3000/fr/locations/palmeraie', name: 'Palmeraie' },
  { url: 'http://localhost:3000/fr/locations/gueliz', name: 'Gueliz' },
  { url: 'http://localhost:3000/fr/locations/route-ourika', name: 'Route Ourika' },
  { url: 'http://localhost:3000/fr/locations/amelkis', name: 'Amelkis' },
  { url: 'http://localhost:3000/fr/locations/targa', name: 'Targa' },
  { url: 'http://localhost:3000/admin/login', name: 'Admin Login' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const page of pages) {
    const context = await browser.newContext();
    const p = await context.newPage();
    const consoleErrors = [];
    const i18nErrors = [];
    let status = 'OK';
    let details = '';

    p.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        consoleErrors.push(text);
        if (text.includes('IntlError') || text.includes('i18n') || text.includes('missing message')) {
          i18nErrors.push(text);
        }
      }
    });

    p.on('pageerror', err => {
      status = 'ERROR';
      details = err.message;
    });

    try {
      const response = await p.goto(page.url, { waitUntil: 'networkidle', timeout: 15000 });

      if (!response) {
        status = 'NO_RESPONSE';
      } else if (response.status() >= 300 && response.status() < 400) {
        status = 'REDIRECT';
        details = response.headers()['location'] || 'unknown';
      } else if (response.status() === 404) {
        status = 'NOT_FOUND';
      } else if (response.status() >= 500) {
        status = 'SERVER_ERROR';
      } else if (response.status() === 200) {
        // Check for blank page
        const body = await p.textContent('body');
        if (!body || body.trim().length < 10) {
          status = 'BLANK';
        }
      }

      // Check for console errors specific to this page
      if (consoleErrors.length > 0 && status === 'OK') {
        status = 'CONSOLE_ERRORS';
      }
      if (i18nErrors.length > 0 && status === 'OK') {
        status = 'I18N_ERROR';
      }

      // Take screenshot
      const screenshotPath = `C:/Users/Ultrapc/Desktop/abdo data/z/screenshots/${page.name.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      await p.screenshot({ path: screenshotPath, fullPage: false });

    } catch (err) {
      status = 'TIMEOUT/ERROR';
      details = err.message;
    }

    results.push({
      name: page.name,
      url: page.url,
      status,
      consoleErrors: consoleErrors.length,
      i18nErrors: i18nErrors.length,
      details,
      errorMessages: [...consoleErrors, ...i18nErrors]
    });

    await context.close();
  }

  // Print results table
  console.log('\n| Page | Status | Console Errors | i18n Errors | Details |');
  console.log('|------|--------|----------------|-------------|---------|');
  for (const r of results) {
    console.log(`| ${r.name} | ${r.status} | ${r.consoleErrors} | ${r.i18nErrors} | ${r.details} |`);
  }

  // Print detailed errors
  console.log('\n=== DETAILED ERRORS ===\n');
  for (const r of results) {
    if (r.consoleErrors > 0 || r.i18nErrors > 0) {
      console.log(`\n${r.name} (${r.url}):`);
      if (r.errorMessages) {
        r.errorMessages.forEach(e => console.log(`  - ${e}`));
      }
    }
  }

  await browser.close();
})();
