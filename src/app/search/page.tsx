"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
//import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import "./search.css";
import ArticleCard from "@/components/ArticleCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
  async function loadPosts() {
    const supabase = createClient();

    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "Published");

    setPosts(data || []);
  }

  loadPosts();
}, []);

  const results = useMemo(() => {
    return posts.filter((post) => {
      const text = `
${post.title || ""}
${post.description || ""}
${post.category || ""}
${post.tags || ""}
`
.toLowerCase();

      return text.includes(query.toLowerCase());
    });
  }, [query, posts]);

  return (
    <section className="search-page">
      <div className="container">

        <h1>Search Articles</h1>

        <input
          type="text"
          placeholder="Search AI, Gaming, Smartphone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-box"
        />

        <div className="search-grid">
          {results.map((post) => (
  <ArticleCard
    key={post.slug}
    post={post}
  />
))}

          {results.length === 0 && (
            <p>No articles found.</p>
          )}
        </div>

      </div>
    </section>
  );
}