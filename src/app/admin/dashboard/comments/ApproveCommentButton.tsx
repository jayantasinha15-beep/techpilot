"use client";

import { createClient } from "@/lib/supabase/client";

export default function ApproveCommentButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  async function approve() {
    const supabase = createClient();

    const { error } = await supabase
      .from("comments")
      .update({
        status: "Approved",
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    location.reload();
  }

  if (status === "Approved") {
    return (
      <span
        style={{
          color: "green",
          fontWeight: "bold",
        }}
      >
        ✅ Approved
      </span>
    );
  }

  return (
    <button
      onClick={approve}
      style={{
        padding: "6px 12px",
        cursor: "pointer",
      }}
    >
      Approve
    </button>
  );
}