"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import StatusToggle from "./StatusToggle";
import FeaturedToggle from "./FeaturedToggle";

export default function PostTable({
  posts,
}: {
  posts: any[];
}) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="🔍 Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>

              <td>{post.category}</td>

              <td>
                <StatusToggle
                  id={String(post.id)}
                  status={post.status}
                />
              </td>

              <td>
                <FeaturedToggle
                  id={String(post.id)}
                  featured={post.featured}
                />
              </td>

              <td>{post.created_at?.slice(0, 10)}</td>

              <td>
                <Link href={`/blog/${post.slug}`}>👁 View</Link>

                {" | "}

                <Link href={`/admin/dashboard/edit/${post.id}`}>
                  ✏ Edit
                </Link>

                {" | "}

                <DeleteButton id={String(post.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}