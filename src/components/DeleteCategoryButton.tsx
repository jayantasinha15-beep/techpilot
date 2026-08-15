"use client";

import { useRouter } from "next/navigation";

export default function DeleteCategoryButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Category deleted.");
      router.refresh();
    } else {
      alert("Delete failed.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        border: "none",
        background: "red",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      🗑 Delete
    </button>
  );
}