"use client";

import { useState } from "react";

export default function MediaUpload() {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      alert("✅ Image uploaded successfully!");

      window.location.reload();
    } catch (error) {
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  }

  return (
    <label
      style={{
        display: "inline-block",
        padding: "10px 18px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: 6,
        cursor: uploading ? "not-allowed" : "pointer",
        marginTop: 15,
      }}
    >
      {uploading ? "⏳ Uploading..." : "📤 Upload Image"}

      <input
        type="file"
        accept="image/*"
        hidden
        disabled={uploading}
        onChange={handleUpload}
      />
    </label>
  );
}