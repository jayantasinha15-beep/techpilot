"use client";

import { createClient } from "@/lib/supabase/client";

export default function DeleteCommentButton({
  id,
}: {
  id: string;
}) {
  async function remove() {
    if (!confirm("Delete this comment?")) return;

    const supabase = createClient();

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    location.reload();
  }

  return (
    <button
      onClick={remove}
      style={{
        marginLeft: 10,
        padding: "6px 12px",
        color: "white",
        background: "red",
        border: "none",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  );
}