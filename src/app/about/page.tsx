
import "./about.css";

export default function AboutPage() {
  return (
    <>
     

      <main className="about-page">

        <section className="about-hero">
          <h1>About TechPilot</h1>
          <p>
            TechPilot is a technology blog dedicated to providing honest
            reviews, AI guides, gaming PC builds, smartphone reviews and
            useful technology tutorials.
          </p>
        </section>

        <section className="about-content">

          <div className="about-card">
            <h2>🎯 Our Mission</h2>
            <p>
              Our mission is to simplify technology by creating accurate,
              beginner-friendly and trustworthy content for everyone.
            </p>
          </div>

          <div className="about-card">
            <h2>💡 What We Cover</h2>

            <ul>
              <li>Artificial Intelligence</li>
              <li>Gaming PC Builds</li>
              <li>Smartphone Reviews</li>
              <li>Technology News</li>
              <li>Buying Guides</li>
            </ul>

          </div>

          <div className="about-card">
            <h2>🚀 Why TechPilot?</h2>

            <p>
              Every article is written with a focus on clarity, practical
              advice and real-world experience so readers can make informed
              decisions.
            </p>

          </div>

        </section>

      </main>

      
    </>
  );
}