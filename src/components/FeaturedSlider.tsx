import { createClient } from "@/lib/supabase/server";
import FeaturedSliderClient from "./FeaturedSliderClient";

export default async function FeaturedSlider() {
  const supabase = await createClient();

  const { data: featured = [] } = await supabase
    .from("posts")
    .select("*")
    .eq("featured", true)
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  return <FeaturedSliderClient posts={(featured ?? []) as any[]} />;
}