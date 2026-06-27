const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.eltzpybedrveeitdgjig:wpFvLp8KGMlkxIHv@aws-0-eu-west-3.pooler.supabase.com:6543/postgres' });

(async () => {
  await client.connect();
  const settings = [
    ['location_title', 'StaysInMarrakech : Location de villa de luxe à Marrakech'],
    ['location_description', 'StaysInMarrakech est une société spécialisée dans la location de villas de luxe et de prestige à Marrakech.'],
    ['location_image', '/images/sections/location-villa-marrakech.webp'],
    ['location_link_text', 'Voir plus'],
    ['location_link_href', '/marrakech-villas/location-villa-marrakech'],
    ['shortrental_title', 'Location villas courte durée à Marrakech'],
    ['shortrental_description', 'Notre équipe connaît parfaitement Marrakech et se passionne pour proposer des villas de charme et de caractère, idéales pour une location de villa de luxe à Marrakech.'],
    ['shortrental_image', '/images/sections/courte-duree.webp'],
    ['shortrental_link_text', 'Contactez-nous'],
    ['shortrental_link_href', '/contactez-nous'],
    ['events_title', 'Location villas pour événements à Marrakech'],
    ['events_description', 'Organisez vos événements dans un cadre d\'exception grâce à nos villas de luxe à Marrakech.'],
    ['events_image', '/images/sections/evenements.webp'],
    ['vacations_title', 'Location villa de luxe pour vacances à Marrakech'],
    ['vacations_description', 'Découvrez nos villas de luxe à Marrakech, parfaites pour des vacances inoubliables.'],
    ['vacations_image', '/images/sections/vacances-marrakech.webp'],
  ];
  for (const [key, value] of settings) {
    await client.query('INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING', [key, value]);
  }
  console.log(settings.length + ' section settings seeded');
  await client.end();
})().catch(e => { console.error(e.message); process.exit(1); });
