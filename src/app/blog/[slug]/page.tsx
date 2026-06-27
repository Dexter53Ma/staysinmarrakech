"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BlogPostDetail, { blogPosts } from "@/components/BlogPostDetail";

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
            <Link
              href="/blog"
              className="inline-block mt-6 bg-[#0d47a1] text-white px-6 py-3 rounded hover:bg-[#0a3a82] transition-colors"
            >
              Retour au blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BlogPostDetail post={post} />
      </main>
      <Footer />
    </div>
  );
}
