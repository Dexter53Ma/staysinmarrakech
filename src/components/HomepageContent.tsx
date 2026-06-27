export default function HomepageContent() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#34495e] mb-4">
            StaysInMarrakech — Votre expert en villas de luxe à Marrakech
          </h2>
          <div className="w-20 h-1 bg-[#ffb000] mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Depuis 2014, StaysInMarrakech accompagne les voyageurs exigeants et les investisseurs dans la recherche de villas de luxe à Marrakech. Notre connaissance approfondie de la ville rouge et de ses quartiers prestigieux — Palmeraie, Gueliz, Route de l&apos;Ourika, Amelkis, Targa — nous permet de vous proposer des propriétés d&apos;exception, soigneusement sélectionnées pour leur architecture, leur cadre et leurs prestations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-[#ffb000] mb-2">1000+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide">Clients satisfaits</div>
            <p className="text-gray-500 text-sm mt-2">
              Plus de mille familles et voyageurs nous font confiance chaque année pour leurs séjours à Marrakech.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-[#ffb000] mb-2">50+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide">Villas de prestige</div>
            <p className="text-gray-500 text-sm mt-2">
              Une sélection exclusive de villas avec piscine privée, jardin et services de conciergerie haut de gamme.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-[#ffb000] mb-2">10+</div>
            <div className="text-sm font-semibold text-[#34495e] uppercase tracking-wide">Années d&apos;expérience</div>
            <p className="text-gray-500 text-sm mt-2">
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
              Nos villas sont situées dans les quartiers les plus prisés de Marrakech. La <strong>Palmeraie</strong> offre un cadre verdoyant et paisibel à quelques minutes du centre-ville. <strong>Gueliz</strong>, le quartier moderne, combine proximité des commerces et tranquilvilla. La <strong>route de l&apos;Ourika</strong> séduit par ses panoramas sur l&apos;Atlas, tandis qu&apos;<strong>Amelkis</strong> et <strong>Targa</strong> sont réputés pour leurs domaines golfiques et leur tranquillité.
            </p>
            <p>
              Chaque villa proposée par StaysInMarrakech est équipée de <strong>piscines privées chauffées</strong>, de jardins paysagers, d&apos;espaces de vie spacieux et d&apos;équipements haut de gamme. Notre équipe de conciergerie est disponible 7 jours sur 7 pour organiser vos transferts, réservations de restaurants, activités et excursions dans le désert d&apos;Agafay ou les montagnes de l&apos;Atlas.
            </p>
            <h4 className="text-lg font-semibold text-[#34495e] pt-2">
              Services de conciergerie premium
            </h4>
            <p>
              Au-delà de la location de villas, StaysInMarrakech vous propose une gamme complète de services : <strong>chef privée</strong> pour des dîners gastronomiques, <strong>bien-être et spa</strong> à domicile, <strong>excursions en quad, buggy et balade en dromadaire</strong>, <strong>location de voitures de luxe</strong> et <strong>organisation d&apos;événements</strong> dans des cadres exceptionnels. Notre objectif : transformer votre séjour à Marrakech en une expérience inoubliable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
