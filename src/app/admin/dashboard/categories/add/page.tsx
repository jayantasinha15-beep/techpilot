"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AddCategory() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("categories")
      .insert([
        {
          name,
          slug,
        },
      ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("✅ Category Added");

    setName("");
    setSlug("");
  }

  return (
    <main style={{ padding: 30 }}>

      <h1>Add Category</h1>

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
          placeholder="Category Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSlug(generateSlug(e.target.value));
          }}
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <button type="submit">
          Add Category
        </button>
      </form>

      <p>{message}</p>

    </main>
  );
}