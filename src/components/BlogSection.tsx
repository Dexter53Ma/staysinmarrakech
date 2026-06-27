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

  return (
    <section
      style={{
        maxWidth: 1140,
        margin: "auto",
        padding: "50px 15px",
      }}
    >
      <h2
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#0b1014",
          marginBottom: 10,
        }}
      >
        Derniers articles du blog
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#666",
          marginBottom: 30,
        }}
      >
        Découvrez nos actualités, conseils et inspirations pour un séjour inoubliable
      </p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 30 }}
      >
        {posts.map((post) => (
          <div
            key={post.slug}
            style={{
              backgroundColor: "#fff",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                width={380}
                height={200}
                className="w-full"
                style={{ height: 200, objectFit: "cover" }}
              />
            ) : (
              <div
                className="w-full bg-gray-200 flex items-center justify-center text-gray-400"
                style={{ height: 200 }}
              >
                Pas d&apos;image
              </div>
            )}
            <div style={{ padding: 15 }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#0d47a1",
                  marginBottom: 10,
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#34495e",
                  lineHeight: "20px",
                }}
              >
                {post.excerpt}
              </p>
              <div style={{ fontSize: 12, color: "#999", marginTop: 10 }}>
                <span>{post.publishedAt}</span> · <span>{post.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/blog"
        className="inline-block mt-5 font-bold uppercase"
        style={{ color: "#0d47a1", marginTop: 20 }}
      >
        Voir tous les articles
      </Link>
    </section>
  );
}
