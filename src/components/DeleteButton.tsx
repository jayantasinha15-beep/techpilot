"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm(
      "Are you sure you want to delete this article?"
    );

    if (!ok) return;

    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Article deleted successfully.");
      router.refresh();
    } else {
      alert("Failed to delete article.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        border: "none",
        background: "red",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      🗑 Delete
    </button>
  );
}