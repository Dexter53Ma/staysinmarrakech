"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  author: string;
  slug: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) =>
        setPosts(data.filter((p: Post & { isPublished: boolean }) => p.isPublished).slice(0, 3))
      );
  }, []);

  const isLoading = posts.length === 0;

  return (
    <section className="max-w-[1140px] mx-auto py-[60px] px-4">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[#0d47a1]/10 rounded-full px-4 py-1.5 mb-5">
          <span className="text-[#0d47a1] text-sm font-semibold">Blog</span>
        </div>
        <h2 className="text-[26px] font-bold uppercase text-[#0b1014] mb-3">
          Derniers articles du blog
        </h2>
        <p className="text-[#666] text-[15px]">
          Découvrez nos actualités, conseils et inspirations pour un séjour inoubliable
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="w-full h-[200px] bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2 pt-2" />
              </div>
            </div>
          ))
        ) : (
          posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {post.image ? (
              <div className="relative w-full h-[200px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-400">
                Pas d&apos;image
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#0d47a1] mb-2 hover:underline">
                {post.title}
              </h3>
              <p className="text-sm text-[#34495e] leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="text-xs text-[#999] flex items-center gap-2">
                <span>{post.publishedAt}</span>
                <span>·</span>
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        ))
      )}
      </div>

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 mt-8 font-bold uppercase text-[#0d47a1] hover:text-[#0a3a82] transition-colors text-sm"
      >
        Voir tous les articles
        <span className="text-lg">→</span>
      </Link>
    </section>
  );
}
