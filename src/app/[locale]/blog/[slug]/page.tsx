import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import BlogPostDetail from "@/components/BlogPostDetail";

export const dynamic = "force-dynamic";

const BASE_URL = "https://staysinmarrakech.netlify.app";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    select: { title: true, excerpt: true, image: true },
  });
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.image ? [{ url: `${BASE_URL}${post.image}`, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      image: true,
      author: true,
      category: true,
      publishedAt: true,
    },
  });

  if (!post) notFound();

  const recentPosts = await prisma.blogPost.findMany({
    where: { isPublished: true, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      slug: true,
      title: true,
      image: true,
      publishedAt: true,
    },
  });

  const categories = await prisma.blogPost.findMany({
    where: { isPublished: true, category: { not: null } },
    distinct: ["category"],
    select: { category: true },
  });

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.image ? `${BASE_URL}${post.image}` : undefined,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt?.toISOString(),
    author: { "@type": "Organization", name: "StaysInMarrakech" },
    publisher: {
      "@type": "Organization",
      name: "StaysInMarrakech",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/images/logo.png` },
    },
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    articleSection: post.category,
    inLanguage: "fr",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Header />
      <main className="flex-1">
        <BlogPostDetail
          post={{
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || "",
            content: post.content,
            image: post.image || "/images/blog/blog1.webp",
            date: post.publishedAt
              ? post.publishedAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
              : "",
            category: post.category || "",
            author: post.author || "Admin",
            authorRole: "StaysInMarrakech",
          }}
          recentPosts={recentPosts.map((p) => ({
            slug: p.slug,
            title: p.title,
            image: p.image || "/images/blog/blog1.webp",
            date: p.publishedAt
              ? p.publishedAt.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
              : "",
          }))}
          categories={categories.map((c) => c.category!).filter(Boolean)}
        />
      </main>
      <Footer />
    </div>
  );
}
