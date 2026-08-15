import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
  return (
    <section className="notfound">

      <div className="notfound-box">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry! The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="notfound-buttons">

          <Link href="/" className="home-btn">
            Go Home
          </Link>

          <Link href="/search" className="search-btn">
            Search Articles
          </Link>

        </div>

      </div>

    </section>
  );
}