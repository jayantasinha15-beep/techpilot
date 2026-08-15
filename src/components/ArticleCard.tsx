import Link from "next/link";
import Image from "next/image";

type Props = {
  post: any;
};

export default function ArticleCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="article-card">
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
  );
}