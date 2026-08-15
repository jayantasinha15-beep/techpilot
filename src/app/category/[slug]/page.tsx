import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import "./category.css";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const categoryMap: Record<string, string> = {
    ai: "AI",
    gaming: "Gaming",
    smartphones: "Smartphones",
    guides: "Guides",
    "pc-build": "PC Build",
  };

  const category = categoryMap[slug] || slug;

  const { data: filteredPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  return (
    <main className="category-page">
      <div className="container">

        <h1 className="category-title">{category}</h1>

        <div className="article-grid">

          {filteredPosts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="article-card"
            >
              <Image
                src={
                  post.featured_image && post.featured_image.trim() !== ""
                    ? post.featured_image
                    : "/images/placeholder.jpg"
                }
                alt={post.title}
                width={500}
                height={300}
                className="article-image"
                unoptimized
              />

              <div className="article-content">
                <span>{post.category}</span>

                <h3>{post.title}</h3>

                <p>{post.description}</p>
              </div>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}