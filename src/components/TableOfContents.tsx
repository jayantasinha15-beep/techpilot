"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState<
    { id: string; text: string }[]
  >([]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(".blog-content h2")
    );

    const data = elements.map((el, index) => {
      const id = `heading-${index}`;

      el.setAttribute("id", id);

      return {
        id,
        text: el.textContent || "",
      };
    });

    setHeadings(data);
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="toc">
      <h3>📑 Table of Contents</h3>

      <ul>
        {headings.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}