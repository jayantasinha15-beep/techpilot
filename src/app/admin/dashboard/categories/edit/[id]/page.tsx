"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";

export default function EditCategory() {
  const supabase = createClient();

  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCategory() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setName(data.name);
        setSlug(data.slug);
      }
    }

    loadCategory();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("categories")
      .update({
        name,
        slug,
      })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    alert("✅ Category Updated");

    router.push("/admin/dashboard/categories");
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>Edit Category</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          maxWidth: 500,
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <button type="submit">
          Save Changes
        </button>

        <p>{message}</p>
      </form>
    </main>
  );
}