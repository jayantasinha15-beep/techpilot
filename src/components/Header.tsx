"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./Header.css";
import ThemeToggle from "./ThemeToggle";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>

      <div className="navbar">

        <Link href="/" className="logo" onClick={closeMenu}>
          <Image
            src="/logo-dark.png"
            alt="TechPilot"
            width={300}
            height={70}
            priority
            className="logo-dark"
          />
          <Image
            src="/logo-light.png"
            alt="TechPilot"
            width={300}
            height={70}
            priority
            className="logo-light"
          />
        </Link>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/category/ai" onClick={closeMenu}>AI</Link>
          <Link href="/category/gaming" onClick={closeMenu}>Gaming</Link>
          <Link href="/category/smartphones" onClick={closeMenu}>Smartphones</Link>
          <Link href="/category/guides" onClick={closeMenu}>Guides</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
        </nav>

        <Link href="/search" className="search-btn">
          🔍 Search
        </Link>
        <ThemeToggle />

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

    </header>
  );
}