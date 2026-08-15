import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("post-images")
    .list("", {
      limit: 100,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const media =
    data?.map((image) => {
      const { data: publicUrl } = supabase.storage
        .from("post-images")
        .getPublicUrl(image.name);

      return {
        id: image.id || image.name,
        name: image.name,
        url: publicUrl.publicUrl,
      };
    }) || [];

  return NextResponse.json({ media });
}