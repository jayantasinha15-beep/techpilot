import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import "./blog.css";

import AuthorBox from "@/components/AuthorBox";
import Breadcrumb from "@/components/Breadcrumb";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import { incrementViews } from "@/lib/incrementViews";
import Comments from "@/components/Comments";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPost({
  params,
}: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
  .from("posts")
  .select("*")
  .eq("slug", slug)
  .eq("status", "Published")
  .single();

  if (!post) {
    notFound();
  }
  await incrementViews(post.id);

  const { data: relatedPosts } =
    await supabase
      .from("posts")
      .select("*")
      .eq("category", post.category)
      .neq("slug", post.slug)
      .limit(3);

  return (
    <>
      <ReadingProgress />

      <article className="blog-post">

      <div className="blog-container">
        <Breadcrumb
  category={post.category}
  title={post.title}
/>

        <span className="blog-category">
          {post.category}
        </span>

        <h1>{post.title}</h1>

        <div className="blog-meta">
          <span>{post.author}</span>
<span>•</span>
<span>{post.created_at?.slice(0, 10)}</span>
<span>•</span>
<span>{post.reading_time}</span>
<span>•</span>
<span>👁 {(post.views ?? 0) + 1} Views</span>
        </div>

        <Image
  src={post.banner || "/images/placeholder.jpg"}
  alt={post.title}
  width={1200}
  height={700}
  className="blog-image"
  priority
  unoptimized
/>
<TableOfContents />

      <div
  className="blog-content"
  dangerouslySetInnerHTML={{
    __html: post.content || "",
  }}
/>
<AuthorBox />

<ShareButtons />
<Comments postId={post.id} />
{relatedPosts && relatedPosts.length > 0 && (
  <>
    <h2 className="related-title">
      Related Articles
    </h2>

    <div className="related-grid">
      {relatedPosts?.map((item) => (
        <Link
  key={item.slug}
  href={`/blog/${item.slug}`}
  className="related-card"
>
          <Image
            src={item.featured_image || "/images/placeholder.jpg"}
            alt={item.title}
            width={400}
            height={250}
            unoptimized
          />

          <h3>{item.title}</h3>
        </Link>
      ))}
    </div>
  </>
)}

      </div>
      

    </article>

</>
  );
}