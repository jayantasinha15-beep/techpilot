import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPost({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main style={{ padding: 30 }}>

      <h1>Edit Article</h1>

      <EditPostForm post={post} />

    </main>
  );
}