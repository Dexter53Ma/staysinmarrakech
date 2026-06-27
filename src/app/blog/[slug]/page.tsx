"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BlogPostDetail, { blogPosts } from "@/components/BlogPostDetail";

const BASE_URL = "https://staysinmarrakech.netlify.app";

const frenchMonths: Record<string, number> = {
  "janvier": 0, "février": 1, "mars": 2, "avril": 3, "mai": 4, "juin": 5,
  "juillet": 6, "août": 7, "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11,
};

function parseFrenchDate(dateStr: string): string {
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = frenchMonths[parts[1].toLowerCase()];
    const year = parseInt(parts[2]);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
  }
  return dateStr;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-[#0d47a1] mb-4">Article introuvable</h1>
            <p className="text-[#34495e]">L&apos;article que vous recherchez n&apos;existe pas.</p>
            <Link href="/blog" className="inline-block mt-6 bg-[#0d47a1] text-white px-6 py-3 rounded hover:bg-[#0a3a82] transition-colors">
              Retour au blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.image}`,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: parseFrenchDate(post.date),
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
        <BlogPostDetail post={post} />
      </main>
      <Footer />
    </div>
  );
}
