import Link from "next/link";

export default function HomepageContent() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0d47a1]/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#0d47a1] text-sm font-semibold">Notre expertise</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-4">
            StaysInMarrakech — Votre expert en villas de luxe à Marrakech
          </h2>
          <div className="w-20 h-1 bg-[#ffb000] mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Depuis 2014, StaysInMarrakech accompagne les voyageurs exigeants et les investisseurs dans la recherche de villas de luxe à Marrakech. Notre connaissance approfondie de la ville rouge et de ses quartiers prestigieux — Palmeraie, Gueliz, Route de l&apos;Ourika, Amelkis, Targa — nous permet de vous proposer des propriétés d&apos;exception, soigneusement sélectionnées pour leur architecture, leur cadre et leurs prestations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0d47a1]/5 to-transparent border border-[#0d47a1]/10 hover:border-[#ffb000]/30 transition-colors duration-300">
            <div className="text-5xl font-bold text-[#ffb000] mb-3">1000+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide mb-3">Clients satisfaits</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Plus de mille familles et voyageurs nous font confiance chaque année pour leurs séjours à Marrakech.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0d47a1]/5 to-transparent border border-[#0d47a1]/10 hover:border-[#ffb000]/30 transition-colors duration-300">
            <div className="text-5xl font-bold text-[#ffb000] mb-3">50+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide mb-3">Villas de prestige</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Une sélection exclusive de villas avec piscine privée, jardin et services de conciergerie haut de gamme.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0d47a1]/5 to-transparent border border-[#0d47a1]/10 hover:border-[#ffb000]/30 transition-colors duration-300">
            <div className="text-5xl font-bold text-[#ffb000] mb-3">10+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide mb-3">Années d&apos;expérience</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Une décennie d&apos;expertise dans l&apos;immobilier de luxe à Marrakech, au service de votre satisfaction.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#34495e] mb-4">
            Location de villas de luxe à Marrakech — Un séjour d&apos;exception vous attend
          </h3>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              Marrakech, la ville rouge, fascine par ses palais, ses jardins et son atmosphère unique. Que vous veniez pour des vacances en famille, un voyage entre amis, un mariage d&apos;exception ou un séjour d&apos;affaires, StaysInMarrakech met à votre disposition des villas de luxe qui sublimeront votre expérience.
            </p>
            <p>
              Nos villas sont situées dans les quartiers les plus prisés de Marrakech. La <Link href="/locations/palmeraie" className="text-[#0d47a1] underline hover:text-[#0d47a1]/80">Palmeraie</Link> offre un cadre verdoyant et paisibel à quelques minutes du centre-ville. <Link href="/locations/gueliz" className="text-[#0d47a1] underline hover:text-[#0d47a1]/80">Gueliz</Link>, le quartier moderne, combine proximité des commerces et tranquillité. La <Link href="/locations/route-ourika" className="text-[#0d47a1] underline hover:text-[#0d47a1]/80">route de l&apos;Ourika</Link> séduit par ses panoramas sur l&apos;Atlas, tandis qu&apos;<Link href="/locations/amelkis" className="text-[#0d47a1] underline hover:text-[#0d47a1]/80">Amelkis</Link> et <Link href="/locations/targa" className="text-[#0d47a1] underline hover:text-[#0d47a1]/80">Targa</Link> sont réputés pour leurs domaines golfiques et leur tranquillité.
            </p>
            <p>
              Chaque villa proposée par StaysInMarrakech est équipée de <strong>piscines privées chauffées</strong>, de jardins paysagers, d&apos;espaces de vie spacieux et d&apos;équipements haut de gamme. Notre équipe de conciergerie est disponible 7 jours sur 7 pour organiser vos transferts, réservations de restaurants, activités et excursions dans le désert d&apos;Agafay ou les montagnes de l&apos;Atlas.
            </p>

            <h4 className="text-lg font-semibold text-[#34495e] pt-4">
              Comment réserver votre villa de luxe à Marrakech ?
            </h4>
            <p>
              Réserver une villa avec StaysInMarrakech est simple et sécurisé. Parcourez notre catalogue de propriétés, sélectionnez les dates de votre séjour et complétez le formulaire de réservation. Notre équipe vous recontacte sous 24 heures pour finaliser votre booking et répondre à toutes vos questions. Vous pouvez également nous contacter directement par téléphone au +212 6 21 18 94 96 ou par email à contact@staysinmarrakech.com pour un accompagnement personnalisé.
            </p>
            <p>
              Chaque réservation inclut un accueil personnalisé à l&apos;aéroport de Marrakech-Ménara, un transfert privé vers votre villa, et un briefing complet avec notre équipe sur site. Vous bénéficiez également d&apos;un interlocuteur dédié pendant toute la durée de votre séjour pour gérer toutes vos demandes.
            </p>

            <h4 className="text-lg font-semibold text-[#34495e] pt-4">
              Services de conciergerie premium
            </h4>
            <p>
              Au-delà de la location de villas, StaysInMarrakech vous propose une gamme complète de services : <strong>chef privée</strong> pour des dîners gastronomiques, <strong>bien-être et spa</strong> à domicile, <strong>excursions en quad, buggy et balade en dromadaire</strong>, <strong>location de voitures de luxe</strong> et <strong>organisation d&apos;événements</strong> dans des cadres exceptionnels. Notre objectif : transformer votre séjour à Marrakech en une expérience inoubliable.
            </p>
            <p>
              Notre équipe de conciergerie est composée de professionnels locaux qui connaissent intimement Marrakech et ses alentours. Ils se chargent de tout : réservations dans les meilleurs restaurants, organisent des visites privées de la médina, des jardins Majorelle et Bahia, ou des excursions au désert d&apos;Agafay. Que vous souhaitiez une journée détente au bord de la piscine ou une aventure dans les montagnes de l&apos;Atlas, nous créons un programme sur mesure adapté à vos envies.
            </p>

            <h4 className="text-lg font-semibold text-[#34495e] pt-4">
              Marrakech — Une destination qui fascine
            </h4>
            <p>
              Marrakech est bien plus qu&apos;une simple destination touristique. C&apos;est une ville qui maroque les esprits par son contraste saisissant entre la médina millénaire et la ville moderne de Gueliz, entre les souks animés et les riads paisibles, entre le désert et les montagnes enneigées de l&apos;Atlas. La ville rouge offre une mosaïque d&apos;expériences culturelles, gastronomiques et sportives qui raviront tous les types de voyageurs.
            </p>
            <p>
              Que vous soyez passionné d&apos;histoire et d&apos;architecture, amateur de bonne cuisine, sportif en quête d&apos;aventure ou simplement en quête de détente et de bien-être, Marrakech a tout pour vous satisfaire. Et avec une villa de luxe StaysInMarrakech comme base, vous profiterez du meilleur de la ville dans le confort et l&apos;élégance les plus absolus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
