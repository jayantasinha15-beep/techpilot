import Link from "next/link";

const categories = [
  {
    title: "Artificial Intelligence",
    icon: "🤖",
    slug: "ai",
    description: "AI tools, ChatGPT, Gemini & more",
  },
  {
    title: "Gaming",
    icon: "🎮",
    slug: "gaming",
    description: "Gaming news, PC builds & hardware",
  },
  {
    title: "Smartphones",
    icon: "📱",
    slug: "smartphones",
    description: "Reviews, comparisons & buying guides",
  },
  {
    title: "PC Builds",
    icon: "💻",
    slug: "pc-builds",
    description: "Custom PC build recommendations",
  },
];

export default function PopularCategories() {
  return (
    <section className="popular-categories">
      <div className="section-title">
        <h2>Popular Categories</h2>
        <p>Explore content by category</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="category-card"
          >
            <div className="category-icon">{category.icon}</div>

            <h3>{category.title}</h3>

            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}