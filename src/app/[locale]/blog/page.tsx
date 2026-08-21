import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import BlogCategoryFilter from "@/components/BlogCategoryFilter";

export const dynamic = "force-dynamic";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'seo'});
  const description = locale === 'en'
    ? "Read our articles about Marrakech: travel tips, luxury villas, local activities and events."
    : "Lisez nos articles sur Marrakech : conseils de voyage, villas de luxe, activités locales et événements.";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://staysinmarrakech.netlify.app';
  return {
    title: t('blogTitle'),
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        'fr': `${siteUrl}/fr/blog`,
        'en': `${siteUrl}/en/blog`,
      },
    },
    openGraph: {
      title: t('blogTitle'),
      description,
      url: `${siteUrl}/${locale}/blog`,
      siteName: 'StaysInMarrakech',
      locale: locale === 'fr' ? 'fr_MA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('blogTitle'),
      description,
    },
  };
}

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
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
          <BlogCategoryFilter posts={posts} locale={locale} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
