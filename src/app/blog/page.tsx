import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Évasion",
  description: "Conseils, idées et inspirations pour votre séjour à Marrakech : villas de luxe, immobilier, activités, événements et découverte de la ville rouge.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      image: true,
      author: true,
      category: true,
      publishedAt: true,
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 max-w-[1200px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0d47a1] mb-10 text-center">
            Evasion
          </h1>
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Aucun article pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={post.image || "/images/blog/blog1.webp"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-[15px]">
                    <div className="flex items-center gap-3 text-[12px] text-[#7f8c8d] mb-2">
                      {post.category && (
                        <span className="bg-[#0d47a1]/10 text-[#0d47a1] px-2 py-0.5 rounded font-medium">
                          {post.category}
                        </span>
                      )}
                      <span>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-[18px] font-bold text-[#0d47a1] mb-2 group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="text-[14px] text-[#34495e] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
