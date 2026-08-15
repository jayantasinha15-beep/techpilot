"use client";

import { useRouter } from "next/navigation";

export default function StatusToggle({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();

  async function toggleStatus() {
    const newStatus =
      status === "Published" ? "Draft" : "Published";

    const res = await fetch(`/api/posts/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update status");
    }
  }

  return (
    <button onClick={toggleStatus}>
      {status === "Published"
        ? "🟢 Published"
        : "🟡 Draft"}
    </button>
  );
}