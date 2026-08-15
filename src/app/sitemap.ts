import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("slug, created_at")
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Sitemap posts error:", error);

    return [
      {
        url: "https://techpilot.in",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }

  const blogPosts: MetadataRoute.Sitemap =
    (posts ?? [])
      .filter((post) => post.slug)
      .map((post) => ({
        url: `https://techpilot.in/blog/${post.slug}`,
        lastModified: post.created_at
          ? new Date(post.created_at)
          : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

  return [
    {
      url: "https://techpilot.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://techpilot.in/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://techpilot.in/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://techpilot.in/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...blogPosts,
  ];
}