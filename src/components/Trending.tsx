import "./Trending.css";
import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function Trending() {
  const supabase = await createClient();

  const { data: trendingPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "Published")
    .order("views", { ascending: false })
    .limit(3);

  return (
    <section className="trending">
      <div className="section-heading">
        <h2>🔥 Trending Now</h2>
        <p>Most popular articles this week</p>
      </div>

      <div className="trending-grid">
        {trendingPosts?.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="trending-card"
          >
            <Image
              src={post.featured_image}
              alt={post.title}
              width={500}
              height={300}
              unoptimized
            />

            <div className="trending-content">
              <span>{post.category}</span>

              <h3>{post.title}</h3>

              <p>{post.description}</p>

              <small>👁 {post.views ?? 0} Views</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}