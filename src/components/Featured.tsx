import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import "./Featured.css";

export default async function Featured() {
  const supabase = await createClient();

  const { data: featuredPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("featured", true)
    .eq("status", "Published")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <section className="featured">
      <div className="container">

        <div className="section-heading">
          <h2>Featured Articles</h2>
          <p>Latest technology news, AI insights and buying guides.</p>
        </div>

        <div className="featured-grid">
          {featuredPosts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="featured-card"
            >
              <Image
  src={post.featured_image || "/images/placeholder.jpg"}
  alt={post.title}
  width={600}
  height={350}
  unoptimized
/>

              <div className="featured-content">
                <span>{post.category}</span>

                <h3>{post.title}</h3>

                <p>{post.description}</p>

                <div className="featured-meta">
                  <small>{post.author}</small>
                  <small>{post.reading_time}</small>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}