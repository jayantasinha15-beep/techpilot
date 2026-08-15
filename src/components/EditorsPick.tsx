import "./EditorsPick.css";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function EditorsPick() {
  const supabase = await createClient();

  const { data: picks } = await supabase
  .from("posts")
  .select("*")
  .eq("status", "Published")
  .eq("featured", true)
  .order("created_at", { ascending: false })
  .limit(3);

  return (
    <section className="editors">
      <div className="section-heading">
        <h2>Editor's Picks</h2>
        <p>Our hand-picked articles for you.</p>
      </div>

      <div className="editors-grid">
        {picks?.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="editor-card"
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
              unoptimized
            />

            <div className="editor-content">
              <span>{post.category}</span>

              <h3>{post.title}</h3>

              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}