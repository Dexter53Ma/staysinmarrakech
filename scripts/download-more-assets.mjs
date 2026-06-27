import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://www.villapremium.fr';
const PUBLIC_DIR = join(process.cwd(), 'public');

const images = [
  // Agence page
  { url: '/assets/images/cyrille-kouznetzoff-2.jpg', path: 'images/agence/cyrille.jpg' },
  // Testimonial flags
  { url: '/assets/images/flags/fr.png', path: 'images/flags/fr.png' },
  { url: '/assets/images/flags/gb.png', path: 'images/flags/gb.png' },
  // Blog images
  { url: '/images/data/Feb-2025/67bddb4d6dcc0eaae.png', path: 'images/blog/blog4.png' },
  { url: '/images/data/Feb-2025/67c0438a3536c8542.png', path: 'images/blog/blog5.png' },
  { url: '/images/data/Feb-2025/67c0439d58f801141.png', path: 'images/blog/blog6.png' },
  { url: '/images/data/Feb-2025/67bf5c521a2b46e07.png', path: 'images/blog/blog7.png' },
  { url: '/images/data/Feb-2025/67bf5cc617ce603af.png', path: 'images/blog/blog8.png' },
  { url: '/images/data/Feb-2025/67bf5f0346851285e.png', path: 'images/blog/blog9.png' },
  { url: '/images/data/Feb-2025/67bf5f2c61c335ef0.png', path: 'images/blog/blog10.png' },
  // More villa images for listing page
  { url: '/images/data/06-2026/front-6a2fc81d2cf6a7f1d.jpg', path: 'images/villas/nemeno.jpg' },
  { url: '/images/data/05-2026/front-6a047822421575751.jpg', path: 'images/villas/gabriella.jpg' },
  { url: '/images/data/04-2026/front-69f354c67ed97bac9.jpg', path: 'images/villas/messika.jpg' },
  { url: '/images/data/04-2026/front-69f090ae4a6dc1ce9.jpg', path: 'images/villas/amande.jpg' },
  { url: '/images/data/03-2026/front-69a6ff4935d563d8e.jpg', path: 'images/villas/anna.jpg' },
  { url: '/images/data/02-2026/front-69830b8ec5490ab23.JPG', path: 'images/villas/ilana.jpg' },
  { url: '/images/data/01-2026/front-6970c1db6ef1ddf26.jpg', path: 'images/villas/laura.jpg' },
  { url: '/images/data/01-2026/front-69734b887faa4a5e0.jpg', path: 'images/villas/paloma.jpg' },
  { url: '/images/data/12-2025/front-6953fbe14d3ab6c98.jpg', path: 'images/villas/dolcea.jpg' },
  { url: '/images/data/11-2025/front-691aff2f8c617b706.jpg', path: 'images/villas/ylona.jpg' },
  { url: '/images/data/11-2025/front-6915f73cbe6819cc1.jpg', path: 'images/villas/eden.jpg' },
  { url: '/images/data/10-2025/front-68ecac1b24c541aa4.jpg', path: 'images/villas/tamaris.jpg' },
  { url: '/images/data/06-2025/front-685d087d8440799c5.jpeg', path: 'images/villas/sabra.jpeg' },
  { url: '/images/data/06-2025/front-685a57de0c76715de.jpeg', path: 'images/villas/laora.jpeg' },
  { url: '/images/data/06-2025/front-68556dee42b2e1141.jpeg', path: 'images/villas/julia.jpeg' },
  { url: '/images/data/08-2025/front-689c67d915d273cef.webp', path: 'images/villas/akhara.webp' },
  { url: '/images/data/06-2025/front-683eac8babdf44e73.jpeg', path: 'images/villas/plenitude.jpeg' },
];

async function downloadFile(url, path) {
  const fullPath = join(PUBLIC_DIR, path);
  const lastSep = Math.max(fullPath.lastIndexOf('/'), fullPath.lastIndexOf('\\'));
  const dir = fullPath.substring(0, lastSep);
  
  if (dir && !existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  
  if (existsSync(fullPath)) {
    return;
  }
  
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    if (!response.ok) {
      console.error(`Failed: ${url} (${response.status})`);
      return;
    }
    const buffer = await response.arrayBuffer();
    await writeFile(fullPath, Buffer.from(buffer));
    console.log(`Downloaded: ${path}`);
  } catch (error) {
    console.error(`Error: ${url} - ${error.message}`);
  }
}

async function downloadAll() {
  console.log('Downloading additional assets...');
  for (let i = 0; i < images.length; i += 4) {
    const batch = images.slice(i, i + 4);
    await Promise.all(batch.map(img => downloadFile(img.url, img.path)));
  }
  console.log('Done!');
}

downloadAll();
