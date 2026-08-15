import Link from "next/link";
import "./Breadcrumb.css";

type Props = {
  category: string;
  title: string;
};

export default function Breadcrumb({
  category,
  title,
}: Props) {
  return (
    <nav className="breadcrumb">

      <Link href="/">Home</Link>

      <span>/</span>

      <Link href="/blog">Blog</Link>

      <span>/</span>

      <Link href={`/category/${category.toLowerCase()}`}>
        {category}
      </Link>

      <span>/</span>

      <span className="current">
        {title}
      </span>

    </nav>
  );
}