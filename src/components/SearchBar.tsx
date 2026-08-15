"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const supabase = createClient();

      const { data } = await supabase
        .from("posts")
        .select("id,title,slug")
        .eq("status", "Published");

      setPosts(data || []);
    }

    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="search-section">
      <input
        type="text"
        placeholder="Search articles..."
        className="search-box"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-results">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="search-item"
              >
                {post.title}
              </Link>
            ))
          ) : (
            <p className="no-result">No articles found.</p>
          )}
        </div>
      )}
    </section>
  );
}