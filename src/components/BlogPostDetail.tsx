import Image from "next/image";
import Link from "next/link";
import { sanitizeHTML } from "@/lib/sanitize";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author?: string;
  authorRole?: string;
}

export interface RecentPost {
  slug: string;
  title: string;
  image: string;
  date: string;
}

interface BlogPostDetailProps {
  post: BlogPost;
  recentPosts?: RecentPost[];
  categories?: string[];
}

export default function BlogPostDetail({ post, recentPosts = [], categories = [] }: BlogPostDetailProps) {
  return (
    <div>
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            {post.category && (
              <span className="inline-block bg-[#ffb000] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded mb-4">
                {post.category}
              </span>
            )}
            <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              {post.title}
            </h1>
            <p className="text-white/80 text-sm md:text-base">{post.date}</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1140px] mx-auto px-4 py-[50px]">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 max-w-[800px]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0d47a1] hover:text-[#0a3a82] transition-colors mb-8 font-medium"
            >
              &larr; Retour au blog
            </Link>

            <div
              className="prose prose-lg max-w-none text-[#34495e] leading-relaxed
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0d47a1] [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#34495e] [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:text-base [&_p]:mb-6 [&_p]:leading-8"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.content) }}
            />

            {post.author && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#0d47a1] rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#34495e]">{post.author}</p>
                    {post.authorRole && (
                      <p className="text-sm text-gray-500">{post.authorRole}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">StaysInMarrakech — Expert en villas de luxe à Marrakech</p>
                  </div>
                </div>
              </div>
            )}
          </article>

          <aside className="lg:w-[300px] shrink-0">
            <div className="sticky top-24 space-y-8">
              {recentPosts.length > 0 && (
                <div className="bg-[#f8f9fa] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-[#0d47a1] mb-4">Articles récents</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recent) => (
                      <Link
                        key={recent.slug}
                        href={`/blog/${recent.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-16 h-16 rounded overflow-hidden shrink-0">
                          <Image
                            src={recent.image}
                            alt={recent.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#34495e] group-hover:text-[#0d47a1] transition-colors leading-snug">
                            {recent.title}
                          </h4>
                          <span className="text-xs text-gray-500">{recent.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {categories.length > 0 && (
                <div className="bg-[#f8f9fa] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-[#0d47a1] mb-4">Catégories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-block bg-white text-[#34495e] text-sm px-3 py-1.5 rounded border border-gray-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
