import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface RelatedPost {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  label: string;
}

export default function RelatedPosts({ posts, label }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-[1140px] mx-auto px-4 py-[50px]">
      <h2 className="text-2xl font-bold text-[#0d47a1] mb-8">{label}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="relative w-full h-[180px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-[12px] text-[#7f8c8d] mb-2">
                {post.category && (
                  <span className="bg-[#0d47a1]/10 text-[#0d47a1] px-2 py-0.5 rounded font-medium">
                    {post.category}
                  </span>
                )}
                <span>{post.publishedAt}</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#0d47a1] mb-1 group-hover:underline line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[13px] text-[#34495e] line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
