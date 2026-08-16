"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import "./comments.css";

export default function Comments({
  postId,
}: {
  postId: string;
}) {
  const supabase = createClient();

  const [comments, setComments] = useState<any[]>([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [comment, setComment] = useState("");
  
  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .eq("status", "Approved")
      .order("created_at", {
        ascending: false,
      });

    setComments(data || []);
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function submitComment() {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      name,
      email,
      comment,
      status: "Pending",
    })
    .select();

  console.log("POST ID:", postId);
  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(JSON.stringify(error, null, 2));
    return;
  }

  alert("Comment submitted!");
}

  return (
  <section className="comments">

    <h2 className="comments-title">
      💬 Comments ({comments.length})
    </h2>

    <div className="comment-form">

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={submitComment}>
        🚀 Submit Comment
      </button>

    </div>

    <div className="comments-list">

      {comments.map((c) => (
        <div
          className="comment-card"
          key={c.id}
        >

          <div className="comment-avatar">
            {c.name.charAt(0).toUpperCase()}
          </div>

          <div className="comment-body">

            <div className="comment-header">

              <h4>{c.name}</h4>

              <span>
  {c.created_at
    ? new Date(c.created_at).toLocaleDateString("en-IN")
    : "Date unavailable"}
</span>

            </div>

            <p>{c.comment}</p>

          </div>

        </div>
      ))}

    </div>

  </section>
);
}