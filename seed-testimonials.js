const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.eltzpybedrveeitdgjig:wpFvLp8KGMlkxIHv@aws-0-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true' });

const testimonials = [
  {
    guest_name: "Famille Dupont",
    guest_country: "France",
    property_name: "Villa Les Oliviers",
    duration: "1 semaine",
    year: 2025,
    rating: 5,
    review_text: "Séjour absolument magnifique ! La villa était immaculée, la piscine chauffée un pur bonheur. L'équipe StaysInMarrakech a été aux petits soins. Nous reviendrons sans hésiter.",
    is_approved: true,
  },
  {
    guest_name: "Sarah & James",
    guest_country: "Royaume-Uni",
    property_name: "Villa Dar El Bacha",
    duration: "10 jours",
    year: 2025,
    rating: 5,
    review_text: "We celebrated our anniversary in Marrakech and it was magical. The villa was stunning, the concierge organized everything from airport transfers to a private dinner on the terrace. Highly recommend!",
    is_approved: true,
  },
  {
    guest_name: "Marc Lefèvre",
    guest_country: "Belgique",
    property_name: "Villa Palmeraie",
    duration: "2 semaines",
    year: 2024,
    rating: 5,
    review_text: "Une expérience luxueuse du début à la fin. La villa est encore plus belle que sur les photos. Le quartier de la Palmeraie est calme et prestigieux. Merci à toute l'équipe !",
    is_approved: true,
  },
  {
    guest_name: "Famille Al-Rashid",
    guest_country: "Émirats Arabes Unis",
    property_name: "Villa Les Jardins",
    duration: "5 jours",
    year: 2025,
    rating: 5,
    review_text: "Villa exceptionnelle avec un jardin à couper le souffle. Le service de conciergerie était impeccable. Les enfants ont adoré la piscine. On recommande à 100%.",
    is_approved: true,
  },
  {
    guest_name: "Giulia Rossi",
    guest_country: "Italie",
    property_name: "Villa Amelkis",
    duration: "1 semaine",
    year: 2024,
    rating: 4,
    review_text: "Bella villa con una piscina fantastica. La posizione è perfetta per esplorare Marrakech. Il servizio di concierge è stato molto professionale. Consigliato!",
    is_approved: true,
  },
  {
    guest_name: "Thomas & Anna",
    guest_country: "Allemagne",
    property_name: "Villa Targa",
    duration: "4 jours",
    year: 2025,
    rating: 5,
    review_text: "Wir haben unsere Flitterwochen hier verbracht und es war wunderschön. Die Villa ist luxuriös, der Service erstklassig. Marrakech ist eine wunderbare Stadt!",
    is_approved: true,
  },
];

(async () => {
  await client.connect();
  for (const t of testimonials) {
    await client.query(
      `INSERT INTO testimonials (id, guest_name, guest_country, property_name, duration, year, rating, review_text, is_approved, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())
       ON CONFLICT DO NOTHING`,
      [t.guest_name, t.guest_country, t.property_name, t.duration, t.year, t.rating, t.review_text, t.is_approved]
    );
  }
  await client.end();
  console.log(`Seeded ${testimonials.length} testimonials`);
})();
