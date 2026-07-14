import type { Metadata } from 'next';
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo'});
  const description = locale === 'en'
    ? "Read our articles about Marrakech: travel tips, luxury villas, local activities and events."
    : "Lisez nos articles sur Marrakech : conseils de voyage, villas de luxe, activités locales et événements.";
  return {
    title: t('blogTitle'),
    description,
  };
}

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const commonT = await getTranslations({locale, namespace: 'common'});
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
            <p className="text-center text-gray-500 py-12">{commonT("noArticles")}</p>
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
                          ? new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
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
