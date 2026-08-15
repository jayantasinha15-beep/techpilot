"use client";

import { useRouter } from "next/navigation";

export default function FeaturedToggle({
  id,
  featured,
}: {
  id: string;
  featured: boolean;
}) {
  const router = useRouter();

  async function toggleFeatured() {
    const res = await fetch(`/api/posts/${id}/featured`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        featured: !featured,
      }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update featured status.");
    }
  }

  return (
    <button onClick={toggleFeatured}>
      {featured ? "⭐ Featured" : "☆ Normal"}
    </button>
  );
}