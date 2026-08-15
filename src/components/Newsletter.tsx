import "./Newsletter.css";

export default function Newsletter() {
  return (
    <section className="newsletter">

      <div className="newsletter-box">

        <h2>Stay Updated</h2>

        <p>
          Get the latest technology news, AI guides,
          smartphone reviews and gaming tips directly in your inbox.
        </p>

        <form className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </div>

    </section>
  );
}