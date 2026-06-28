const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.testimonial.deleteMany();

  const testimonials = [
    { guestName: "Famille Belkacem", guestCountry: "France", propertyName: "Nouma", duration: "7 jours", year: 2025, rating: 5, reviewText: "Pour la troisième année consécutive, nous venons à Marrakech grâce à l'équipe exceptionnelle de StaysInMarrakech. Ils connaissent nos goûts, nos habitudes, nos envies, et nous surprennent toujours avec une petite attention qui fait toute la différence entre un bon séjour et un séjour magique.", isApproved: true },
    { guestName: "Sophie & Marc Leclerc", guestCountry: "France", propertyName: "Nouma", duration: "5 jours", year: 2025, rating: 5, reviewText: "Notre villa était absolument magnifique. La piscine, le jardin, la vue sur l'Atlas — tout était parfait. Le cuisinier privé nous a préparé des tajines délicieux chaque soir. Une expérience inoubliable que nous recommandons vivement.", isApproved: true },
    { guestName: "Youssef & Amira", guestCountry: "Maroc", propertyName: "Nayma", duration: "3 jours", year: 2025, rating: 5, reviewText: "Nous avons organisé notre mariage dans la villa et c'était un rêve devenu réalité. L'équipe a géré chaque détail avec une perfection absolue. Nos invités étaient émerveillés. Merci infiniment !", isApproved: true },
    { guestName: "The Johnson Family", guestCountry: "UK", propertyName: "Lya", duration: "7 jours", year: 2025, rating: 5, reviewText: "We had an amazing week. The concierge service was exceptional — they arranged everything from airport transfers to desert excursions. The kids loved the pool and the quad biking. We'll definitely be back!", isApproved: true },
    { guestName: "Claire & Thomas Dubois", guestCountry: "Belgique", propertyName: "Nera", duration: "4 jours", year: 2025, rating: 5, reviewText: "Le service de conciergerie est bluffant de réactivité. Notre chef de conciergerie a transformé notre séjour en véritable aventure. Médina, souks, gastronomie, spa — chaque jour était une nouvelle découverte.", isApproved: true },
    { guestName: "Famille Al-Rashid", guestCountry: "Emirats Arabes Unis", propertyName: "Selma", duration: "10 jours", year: 2025, rating: 5, reviewText: "Villa parfaite pour notre réunion de famille. 12 invités, chacun avait son propre espace, la zone jardin et piscine était splendide. Le chef privé a préparé une cuisine marocaine authentique et exceptionnelle.", isApproved: true },
    { guestName: "Marie-Claire Dupont", guestCountry: "France", propertyName: "Gabriella", duration: "6 jours", year: 2025, rating: 5, reviewText: "J'ai passé un séjour de rêve. Le hammam à domicile était d'une qualité exceptionnelle, et le yoga en terrasse au lever du soleil reste un de mes plus beaux souvenirs de voyage. Merci pour cette magie.", isApproved: true },
    { guestName: "Ahmed & Fatima Benali", guestCountry: "Canada", propertyName: "Paloma", duration: "7 jours", year: 2024, rating: 5, reviewText: "Nous avons choisi Marrakech pour notre lune de miel et l'équipe a tout rendu magique. La villa était superbe, les dîners privés sur le toit-terrasse étaient romantiques au-delà des mots. L'attention aux détails est remarquable.", isApproved: true },
    { guestName: "La famille Martin", guestCountry: "France", propertyName: "Ilana", duration: "8 jours", year: 2025, rating: 5, reviewText: "Troisième visite, troisième villa. Chaque séjour est différent et toujours parfait. Les enfants adorent les activités (quad, montgolfière, peinture). Nous avons déjà réservé pour l'année prochaine !", isApproved: true },
    { guestName: "Robert & Susan Williams", guestCountry: "USA", propertyName: "Nemeno", duration: "7 jours", year: 2025, rating: 5, reviewText: "Our group of 8 friends had the most incredible week. The villa was stunning, the desert excursion was breathtaking, and the food prepared by our private chef was world-class. Marrakech exceeded all expectations.", isApproved: true },
    { guestName: "Léa & Julien Moreau", guestCountry: "France", propertyName: "Loubna", duration: "5 jours", year: 2024, rating: 5, reviewText: "La villa est un vrai bijou. Architecture traditionnelle, confort moderne, jardin luxuriant. Le service de transport avec chauffeur nous a permis de découvrir la région sans stress. On revient promis.", isApproved: true },
    { guestName: "Famille Kader", guestCountry: "France", propertyName: "Myriam", duration: "4 jours", year: 2025, rating: 5, reviewText: "Pour les 50 ans de mon père, nous avons organisé un séjour surprise. L'équipe a tout géré en secret — décorations, gâteau, activités. Mon père était ému aux larmes. Merci pour ce moment inoubliable.", isApproved: true },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
    console.log(`  Created: "${t.guestName}"`);
  }

  const count = await prisma.testimonial.count();
  console.log(`\nDone! Total testimonials: ${count}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
