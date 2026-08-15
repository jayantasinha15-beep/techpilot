import { createClient } from "@/lib/supabase/server";
import ApproveCommentButton from "./ApproveCommentButton";
import DeleteCommentButton from "./DeleteCommentButton";

export default async function CommentsPage() {
  const supabase = await createClient();

  const { data: comments, error } = await supabase
  .from("comments")
  .select(`
    id,
    post_id,
    name,
    email,
    comment,
    status,
    created_at,
    posts!comments_post_id_fkey (
      title
    )
  `)
  .order("created_at", { ascending: false });
console.log(comments);
console.log(error);

  return (
    <main style={{ padding: "30px" }}>
      <h1>💬 Manage Comments</h1>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Post</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {comments?.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.name}</td>

              <td>{comment.email}</td>

              <td>{(comment as any).posts?.title ?? "No Post"}</td>

              <td style={{ maxWidth: "350px" }}>
                {comment.comment}
              </td>

              <td>{comment.status}</td>

              <td>
                {new Date(
                  comment.created_at
                ).toLocaleDateString()}
              </td>

              <td>
                <ApproveCommentButton
                  id={comment.id}
                  status={comment.status}
                />

                {"  "}

                <DeleteCommentButton
                  id={comment.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}