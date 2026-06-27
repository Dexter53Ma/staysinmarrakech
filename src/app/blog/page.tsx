import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — Évasion",
  description: "Conseils, idées et inspirations pour votre séjour à Marrakech : villas de luxe, immobilier, activités, événements et découverte de la ville rouge.",
};

const articles = [
  {
    title: "Plongée au cœur de nos 10 villas de luxe les plus somptueuses au Maroc",
    image: "/images/blog/blog1.webp",
    excerpt: "Préparez-vous à découvrir des villas d'exception, où chaque détail a ét...",
    date: "25 February 2025",
    author: "Amine",
  },
  {
    title: "5 stratégies incontournables pour dénicher une bonne affaire en immobilier au Maroc",
    image: "/images/blog/blog2.png",
    excerpt: "Vouloir investir dans l'immobilier au Maroc présente une réelle opportunité pour vous, que c...",
    date: "10 February 2025",
    author: "Amine",
  },
  {
    title: "Piscines chauffées : l'atout luxe des villas à Marrakech en hiver",
    image: "/images/blog/blog3.png",
    excerpt: "Envie de vous évader dans un...",
    date: "17 December 2024",
    author: "Amine",
  },
  {
    title: "3 Thèmes tendance pour décorer votre villa pour les fêtes de fin d'année",
    image: "/images/blog/blog4.png",
    excerpt: "Avec son ambiance magique et ses villas somptueuses, Marrakech s'impose comme le cadre idéal pour cr...",
    date: "17 December 2024",
    author: "Amine",
  },
  {
    title: "La location de villa à Marrakech : le choix parfait pour votre mariage de rêve",
    image: "/images/blog/blog5.png",
    excerpt: "Un mariage est un moment unique dans une vie, et son organisation mérite une attention particulière. De p...",
    date: "28 November 2024",
    author: "Amine",
  },
  {
    title: "Pourquoi choisir une villa de luxe à Marrakech pour votre événement privé inoubliable ?",
    image: "/images/blog/blog6.png",
    excerpt: "Marrakech, ville envoûtante au carrefour des cultures, est une destination de choix pour organiser des év...",
    date: "28 November 2024",
    author: "Amine",
  },
  {
    title: "Organiser un anniversaire à Marrakech : Pourquoi choisir une villa de luxe ?",
    image: "/images/blog/blog7.png",
    excerpt: "Marrakech, ville envoûtante au carrefour des cultures, est une destination de choix pour célébrer u...",
    date: "28 November 2024",
    author: "Amine",
  },
  {
    title: "Idées d'activités pour des vacances inoubliables à Marrakech",
    image: "/images/blog/blog8.png",
    excerpt: "Marrakech, une ville qui danse entre l'histoire ancienne et la modernité effervescente, est une destination de v...",
    date: "15 March 2024",
    author: "Amine",
  },
  {
    title: "Louer une villa à Marrakech : votre oasis de vacances au cœur du Maroc",
    image: "/images/blog/blog9.png",
    excerpt: "Marrakech, la ville rouge du Maroc, est une destination envoûtante qui combine tradition et modernité, off...",
    date: "15 February 2024",
    author: "Amine",
  },
  {
    title: "Les avantages de louer une villa, en particulier pour les familles et les groupes d'amis.",
    image: "/images/blog/blog10.png",
    excerpt: "Rien de mieux que de partir en vacances et de voyager ! Connaître de nouveaux endroits, se promener, profiter de...",
    date: "15 January 2024",
    author: "Amine",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 max-w-[1200px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0d47a1] mb-10 text-center">
            Evasion
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.title}
                className="bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-[200px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024) 50vw, 33vw"
                  />
                </div>
                <div className="p-[15px]">
                  <div className="flex items-center gap-3 text-[12px] text-[#7f8c8d] mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                  <h2 className="text-[18px] font-bold text-[#0d47a1] mb-2">
                    {article.title}
                  </h2>
                  <p className="text-[14px] text-[#34495e]">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
