"use client";

import { useState } from "react";

type MediaItem = {
  id: string;
  name: string;
  url: string;
};

export default function MediaLibrary({
  initialMedia,
}: {
  initialMedia: MediaItem[];
}) {
  const [media, setMedia] = useState(initialMedia);
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/media", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setMedia((prev) => [data.media, ...prev]);
    } else {
      alert(data.error || "Upload failed");
    }

    setUploading(false);
  }

  async function deleteImage(name: string) {
    const ok = confirm(
      "Are you sure you want to delete this image?"
    );

    if (!ok) return;

    const res = await fetch("/api/media", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setMedia((prev) =>
        prev.filter((item) => item.name !== name)
      );
    } else {
      alert("Failed to delete image.");
    }
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    alert("Image URL copied!");
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>🖼 Media Library</h1>

      <div style={{ margin: "20px 0" }}>
        <label
          style={{
            display: "inline-block",
            padding: "10px 18px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {uploading ? "Uploading..." : "📤 Upload Image"}

          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                uploadImage(file);
              }

              e.target.value = "";
            }}
          />
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        {media.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 10,
            }}
          >
            <img
              src={item.url}
              alt={item.name}
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />

            <p
              style={{
                fontSize: 12,
                wordBreak: "break-all",
              }}
            >
              {item.name}
            </p>

            <button
              onClick={() => copyUrl(item.url)}
              style={{ marginRight: 8 }}
            >
              📋 Copy URL
            </button>

            <button
              onClick={() => deleteImage(item.name)}
              style={{
                background: "red",
                color: "white",
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}