"use server";

import { createClient } from "@/lib/supabase/server";

export async function incrementViews(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("posts")
    .select("views")
    .eq("id", id)
    .single();

  if (!data) return;

  await supabase
    .from("posts")
    .update({
      views: (data.views || 0) + 1,
    })
    .eq("id", id);
}