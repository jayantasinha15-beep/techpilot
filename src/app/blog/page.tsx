import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  return (
    <main className="article">
      <h1>Latest Articles</h1>

      {posts?.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: "30px",
            borderBottom: "1px solid #334155",
            paddingBottom: "20px",
          }}
        >
          <Image
            src={
              post.featured_image &&
              post.featured_image.trim() !== ""
                ? post.featured_image
                : "/images/placeholder.jpg"
            }
            alt={post.title}
            width={500}
            height={300}
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "10px",
            }}
            unoptimized
          />

          <h2>{post.title}</h2>

          <p>{post.description}</p>

          <Link href={`/blog/${post.slug}`}>
            Read Full Article →
          </Link>
        </div>
      ))}
    </main>
  );
}