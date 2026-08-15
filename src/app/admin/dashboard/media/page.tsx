import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import MediaUpload from "@/components/MediaUpload";
import MediaActions from "@/components/MediaActions";
export default async function MediaLibrary() {
  const supabase = await createClient();

  const { data } = await supabase.storage
    .from("post-images")
    .list("", {
      limit: 100,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  return (
    <main style={{ padding: 30 }}>
      <h1>🖼 Media Library</h1>
      <MediaUpload />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(220px,1fr))",
          gap: 20,
          marginTop: 25,
        }}
      >
        {data?.map((image) => {
          const url =
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}` +
            `/storage/v1/object/public/post-images/${image.name}`;

          return (
            <div
              key={image.id}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Image
                src={url}
                alt={image.name}
                width={220}
                height={160}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                }}
                unoptimized
              />

              <p
                style={{
                  fontSize: 12,
                  marginTop: 8,
                  wordBreak: "break-all",
                }}
              >
                {image.name}
              </p>
              <MediaActions
                name={image.name}
                url={url}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}