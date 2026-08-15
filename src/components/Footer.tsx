import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

  <div className="footer-container">

    <div className="footer-logo">

<img
  src="/logo-dark.png"
  alt="TechPilot"
  width={300}
  height={70}
  className="logo-dark"
/>

<img
  src="/logo-light.png"
  alt="TechPilot"
  width={300}
  height={70}
  className="logo-light"
/>

      <p>
        TechPilot brings honest technology reviews,
        AI guides, smartphone reviews and gaming
        PC build tutorials.
      </p>

    </div>

    <div>

      <h3>Company</h3>

<ul>
  <li><Link href="/about">About</Link></li>

  <li><Link href="/contact">Contact</Link></li>

  <li><Link href="/search">Search</Link></li>
</ul>

    </div>

    <div>

      <h3>Categories</h3>

<ul>
  <li><Link href="/category/ai">AI</Link></li>

  <li><Link href="/category/gaming">Gaming</Link></li>

  <li><Link href="/category/smartphone">Smartphones</Link></li>

  <li><Link href="/category/guides">Guides</Link></li>
</ul>

    </div>

    <div>

      <h3>Legal</h3>

<ul>
  <li><Link href="/privacy-policy">Privacy Policy</Link></li>

  <li><Link href="/terms">Terms & Conditions</Link></li>

  <li><Link href="/disclaimer">Disclaimer</Link></li>

  <li><Link href="/cookie-policy">Cookie Policy</Link></li>
</ul>

    </div>

  </div>

  <div className="footer-bottom">

    <p>
© 2026 TechPilot. All Rights Reserved.
</p>

<p>
Made with ❤️ by Jayanta Singha
</p>

    <div className="footer-social">

      <a href="#">F</a>
      <a href="#">X</a>
      <a href="#">▶</a>

    </div>

  </div>

</footer>
  );
}