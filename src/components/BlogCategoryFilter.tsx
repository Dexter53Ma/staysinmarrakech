"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Post {
  slug: string;
  title: string;
  excerpt: string | null;
  image: string | null;
  author: string;
  category: string | null;
  publishedAt: Date | null;
}

interface BlogCategoryFilterProps {
  posts: Post[];
  locale: string;
}

const CATEGORIES = [
  "All",
  "Travel Tips",
  "Marrakech Guide",
  "Villas",
  "Activities",
  "Events",
] as const;

export default function BlogCategoryFilter({ posts, locale }: BlogCategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const t = useTranslations("blog");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div>
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-[#0d47a1] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat === "All" ? t("allCategories") : cat}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 py-12">{t("noPostsInCategory")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
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
                      ? new Date(post.publishedAt).toLocaleDateString(
                          locale === "en" ? "en-US" : "fr-FR",
                          { day: "numeric", month: "long", year: "numeric" }
                        )
                      : ""}
                  </span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-[18px] font-bold text-[#0d47a1] mb-2 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-[14px] text-[#34495e] line-clamp-3">
                  {post.excerpt || ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
