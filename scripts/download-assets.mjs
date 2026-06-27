import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://www.villapremium.fr';
const PUBLIC_DIR = join(process.cwd(), 'public');

const images = [
  // Logo
  { url: '/assets/images/home/villapremium.svg', path: 'images/logo.svg' },
  // Favicon
  { url: '/assets/images/favicon.png', path: 'seo/favicon.png' },
  // Header background
  { url: '/assets/images/home/header-bg.webp', path: 'images/header-bg.webp' },
  // Hero carousel images
  { url: '/images/data/11-2024/front-67360e64633758fec.jpg', path: 'images/villas/nouma.jpg' },
  { url: '/images/data/06-2025/front-685bca812fe95cf00.jpeg', path: 'images/villas/nayma.jpeg' },
  { url: '/images/data/08-2025/front-68a5fc2b36e8aec89.jpg', path: 'images/villas/lya.jpg' },
  { url: '/images/data/06-2025/front-68416d8dae2d0cd00.jpg', path: 'images/villas/nera.jpg' },
  { url: '/images/data/10-2024/front-671f65ff0c87149c9.jpg', path: 'images/villas/selma.jpg' },
  { url: '/images/data/05-2025/front-682db51a7fe551c1d.jpeg', path: 'images/villas/shakira.jpeg' },
  // Section backgrounds
  { url: '/assets/images/home/location-villa-marrakech.webp', path: 'images/sections/location-villa-marrakech.webp' },
  { url: '/assets/images/home/location-villa-de-luxe-pour-vacances-a-marrakech.webp', path: 'images/sections/vacances-marrakech.webp' },
  { url: '/assets/images/home/location-villas-courte-duree-a-marrakech.webp', path: 'images/sections/courte-duree.webp' },
  { url: '/assets/images/home/location-villas-pour-evenements-a-marrakech.webp', path: 'images/sections/evenements.webp' },
  // Pattern
  { url: '/assets/images/pattern.png', path: 'images/pattern.png' },
  // Quartiers
  { url: '/assets/images/home/quartiers/Route-de-Fes.webp', path: 'images/quartiers/route-de-fes.webp' },
  { url: "/assets/images/home/quartiers/route-de-l'ourika.webp", path: "images/quartiers/route-de-lourika.webp" },
  { url: '/assets/images/home/quartiers/route-de-ouerzazate.webp', path: 'images/quartiers/route-de-ouerzazate.webp' },
  { url: '/assets/images/home/quartiers/Royal-palm-et-ses-environs.webp', path: 'images/quartiers/royal-palm.webp' },
  { url: '/assets/images/home/quartiers/Targa.webp', path: 'images/quartiers/targa.webp' },
  { url: '/assets/images/home/quartiers/Golf-Amelkis-Marrakech.webp', path: 'images/quartiers/golf-amelkis.webp' },
  { url: "/assets/images/home/quartiers/proche%20d'amelkis.webp", path: "images/quartiers/proche-damelkis.webp" },
  { url: '/assets/images/home/quartiers/samanah-golf.webp', path: 'images/quartiers/samanah-golf.webp' },
  { url: '/assets/images/home/quartiers/Palmeraie.webp', path: 'images/quartiers/palmeraie.webp' },
  { url: "/assets/images/home/quartiers/Desert%20d'agafay.webp", path: "images/quartiers/desert-agafay.webp" },
  { url: '/assets/images/home/quartiers/Gueliz.webp', path: 'images/quartiers/gueliz.webp' },
  { url: '/assets/images/home/quartiers/Medina.webp', path: 'images/quartiers/medina.webp' },
  // Activities
  { url: '/images/servicepages/67c03497ab49b-Side-car-Villa-Premium.webp', path: 'images/activities/side-car.webp' },
  { url: '/images/servicepages/67c03583e73e7-JETSKI.webp', path: 'images/activities/jet-ski.webp' },
  { url: '/images/servicepages/67c054929dc46-close-up-hands-playing-hank-drum_resultat.webp', path: 'images/activities/sonotherapie.webp' },
  { url: '/images/servicepages/67c0544d021c5-driver-dressed-elegant-costume_resultat.webp', path: 'images/activities/voiture-luxe.webp' },
  { url: '/images/servicepages/67c0548c6cce2-modern-interior-new-car_resultat.webp', path: 'images/activities/van-chauffeur.webp' },
  { url: '/images/servicepages/67c03560ac156-quad-boggy.webp', path: 'images/activities/quad-buggy.webp' },
  { url: '/images/servicepages/6808c07f4270f-montgolfiere.webp', path: 'images/activities/montgolfiere.webp' },
  { url: '/images/servicepages/67c19309d5093-3125%20(1).jpg', path: 'images/activities/wakeboard.jpg' },
  { url: '/images/servicepages/67c03525cde29-excursions-vtt.webp', path: 'images/activities/vtt.webp' },
  { url: '/images/servicepages/67c0351a6fd00-grand-canyon.webp', path: 'images/activities/grand-canyon.webp' },
  { url: '/images/servicepages/67c034706bd3f-Golf.webp', path: 'images/activities/golf.webp' },
  { url: '/images/servicepages/67c0350e538c3-DESERT%20SENSATION.webp', path: 'images/activities/desert-sensation.webp' },
  { url: '/images/servicepages/67c034fe77d91-VISITES%20DECOUVERTES.webp', path: 'images/activities/visites-decouvertes.webp' },
  { url: '/images/servicepages/67c034ee99b56-equitation.webp', path: 'images/activities/equitation.webp' },
  { url: '/images/servicepages/67c034e15409a-YOGA-PILATES.webp', path: 'images/activities/yoga-pilates.webp' },
  { url: '/images/servicepages/67c034d6a774e-aqua-karting.webp', path: 'images/activities/aqua-karting.webp' },
  { url: '/images/servicepages/67c034af30cb1-karting.webp', path: 'images/activities/karting.webp' },
  { url: '/images/servicepages/67c034a6b16ae-paintball.webp', path: 'images/activities/paintball.webp' },
  // Blog images
  { url: '/images/data/Feb-2025/67bdedb486ee4a4a0.webp', path: 'images/blog/blog1.webp' },
  { url: '/images/data/Feb-2025/67bddafd062fe9e3c.png', path: 'images/blog/blog2.png' },
  { url: '/images/data/Feb-2025/67bddb11720d41534.png', path: 'images/blog/blog3.png' },
];

async function downloadFile(url, path) {
  const fullPath = join(PUBLIC_DIR, path);
  const lastSep = Math.max(fullPath.lastIndexOf('/'), fullPath.lastIndexOf('\\'));
  const dir = fullPath.substring(0, lastSep);
  
  if (dir && !existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  
  if (existsSync(fullPath)) {
    console.log(`Already exists: ${path}`);
    return;
  }
  
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status}`);
      return;
    }
    const buffer = await response.arrayBuffer();
    await writeFile(fullPath, Buffer.from(buffer));
    console.log(`Downloaded: ${path}`);
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
  }
}

async function downloadAll() {
  console.log('Starting asset downloads...');
  
  // Download in batches of 4
  for (let i = 0; i < images.length; i += 4) {
    const batch = images.slice(i, i + 4);
    await Promise.all(batch.map(img => downloadFile(img.url, img.path)));
  }
  
  console.log('All downloads complete!');
}

downloadAll();
