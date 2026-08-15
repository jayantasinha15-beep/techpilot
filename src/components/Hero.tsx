import Link from "next/link";
import "./Hero.css";
export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-badge">
          🚀 Trusted Technology Website
        </span>

        <h1>
          Tech Reviews,
          <br />
          AI Guides &
          <br />
          Gaming Builds
        </h1>

        <p>
          Discover honest technology reviews, AI tools,
          smartphone buying guides, gaming PC builds,
          tutorials and the latest technology news.
        </p>
        <div className="hero-categories">

  <Link href="/category/ai" className="hero-chip">
    AI
  </Link>

  <Link href="/category/gaming" className="hero-chip">
    Gaming
  </Link>

 <Link href="/category/smartphones" className="hero-chip">
  Smartphones
</Link>

  <Link href="/category/guides" className="hero-chip">
    Guides
  </Link>

</div>

        <div className="hero-buttons">

          <Link href="/category/ai" className="primary-btn">
  Explore Articles
</Link>

          <Link href="/about" className="secondary-btn">
            Learn More
          </Link>

        </div>

      </div>

      <div className="hero-right">

        <div className="hero-card">

          <span>🔥 Featured</span>

          <h3>
            Best AI Tools
            <br />
            in 2026
          </h3>

          <p>
            Discover the best AI tools for
            productivity, coding,
            image generation and learning.
          </p>

        </div>

      </div>

    </section>
  );
}