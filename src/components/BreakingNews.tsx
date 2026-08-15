import Link from "next/link";

export default function BreakingNews() {
  return (
    <section className="breaking-news">
      <div className="breaking-container">
        <span className="breaking-label">Breaking</span>

        <Link href="/blog/best-ai-tools-2026" className="breaking-link">
          🚀 Best AI Tools in 2026 has been published. Read the complete guide →
        </Link>
      </div>
    </section>
  );
}