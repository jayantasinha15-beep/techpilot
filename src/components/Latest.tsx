import "./Latest.css";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function Latest() {
  const supabase = await createClient();

  const { data: latestPosts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    return (
      <section className="latest">
        <h2>Latest Articles</h2>
        <p>Failed to load articles.</p>
      </section>
    );
  }

  return (
    <section className="latest">
      <div className="section-heading">
        <h2>Latest Articles</h2>
        <p>Stay updated with the newest technology content.</p>
      </div>

      <div className="latest-grid">
        {latestPosts?.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="latest-card"
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
  unoptimized
/>

            <div className="latest-content">
              <span>{post.category}</span>

              <h3>{post.title}</h3>

              <p>{post.description}</p>

              <div className="latest-meta">
                <small>{post.author}</small>
                <small>{post.reading_time}</small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}