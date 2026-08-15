"use client";

export default function MediaActions({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    alert("✅ Image URL copied!");
  }

  async function deleteImage() {
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
      alert("🗑 Image deleted successfully!");
      window.location.reload();
    } else {
      alert("Failed to delete image.");
    }
  }

  return (
    <div style={{ marginTop: 10 }}>
      <button
        onClick={copyUrl}
        style={{
          marginRight: 8,
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        📋 Copy URL
      </button>

      <button
        onClick={deleteImage}
        style={{
          padding: "6px 10px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        🗑 Delete
      </button>
    </div>
  );
}