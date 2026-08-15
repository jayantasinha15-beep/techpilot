"use client";

import { useEffect, useState } from "react";

type MediaItem = {
  id: string;
  name: string;
  url: string;
};

export default function MediaPicker({
  label,
  value,
  onSelect,
}: {
  label: string;
  value: string;
  onSelect: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadMedia() {
    setLoading(true);

    try {
      const res = await fetch("/api/media/list");
      const data = await res.json();

      if (res.ok) {
        setMedia(data.media || []);
      }
    } catch {
      alert("Failed to load media.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      loadMedia();
    }
  }, [open]);

  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </label>

      {value && (
        <img
          src={value}
          alt={label}
          style={{
            width: 220,
            height: 130,
            objectFit: "cover",
            borderRadius: 8,
            display: "block",
            marginBottom: 10,
          }}
        />
      )}

      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 14px",
          border: "none",
          borderRadius: 6,
          background: "#2563eb",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        🖼 Choose from Media Library
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 9999,
            padding: 30,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "30px auto",
              background: "#fff",
              padding: 25,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h2>Select Image</h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
              >
                ✕ Close
              </button>
            </div>

            {loading ? (
              <p>Loading images...</p>
            ) : media.length === 0 ? (
              <p>No images found.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill,minmax(180px,1fr))",
                  gap: 15,
                }}
              >
                {media.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url);
                      setOpen(false);
                    }}
                    style={{
                      border: "1px solid #ddd",
                      background: "#fff",
                      padding: 8,
                      borderRadius: 8,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 5,
                      }}
                    />

                    <small
                      style={{
                        display: "block",
                        marginTop: 6,
                        wordBreak: "break-all",
                      }}
                    >
                      {item.name}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}