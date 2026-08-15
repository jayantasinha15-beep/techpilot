import { createClient } from "@/lib/supabase/server";
import PostSearch from "@/components/PostSearch";

export default async function AllPosts() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <main style={{ padding: 30 }}>
      <h1>All Posts</h1>

      <PostSearch posts={posts ?? []} />
    </main>
  );
}