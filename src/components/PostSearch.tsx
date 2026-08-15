"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import StatusToggle from "./StatusToggle";
import FeaturedToggle from "./FeaturedToggle";

export default function PostSearch({
  posts,
}: {
  posts: any[];
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const postsPerPage = 10;

  const filteredPosts = posts.filter((post) => {
    const text =
      `${post.title} ${post.slug} ${post.category}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(
    filteredPosts.length / postsPerPage
  );

  const startIndex = (page - 1) * postsPerPage;

  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <>
      <input
        type="text"
        placeholder="🔍 Search by title, slug or category..."
        value={search}
        onChange={(e) =>
          handleSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      <p style={{ marginBottom: 15 }}>
        Showing {currentPosts.length} of{" "}
        {filteredPosts.length} posts
      </p>

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
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
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

                <td>
                  {post.created_at?.slice(0, 10)}
                </td>

                <td>
                  <Link
                    href={`/blog/${post.slug}`}
                  >
                    👁 View
                  </Link>

                  {" | "}

                  <Link
                    href={`/admin/dashboard/edit/${post.id}`}
                  >
                    ✏ Edit
                  </Link>

                  {" | "}

                  <DeleteButton
                    id={String(post.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: 30,
                }}
              >
                No posts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: 25,
          }}
        >
          <button
            onClick={() =>
              setPage((p) => Math.max(1, p - 1))
            }
            disabled={page === 1}
          >
            ← Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              style={{
                fontWeight:
                  page === pageNumber
                    ? "bold"
                    : "normal",
              }}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() =>
              setPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}