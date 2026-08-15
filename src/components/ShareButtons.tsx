"use client";

import { useEffect, useState } from "react";
import "./ShareButtons.css";

export default function ShareButtons() {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setMounted(true);
    setUrl(window.location.href);
    setTitle(document.title);
  }, []);

  if (!mounted) return null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  return (
    <div className="share-buttons">
      <h3>Share this article</h3>

      <div className="share-grid">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>

        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <button onClick={copyLink}>Copy Link</button>
      </div>
    </div>
  );
}