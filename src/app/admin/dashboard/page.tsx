import Link from "next/link";
import "./dashboard.css";
import { createClient } from "@/lib/supabase/server";
import AdminLogout from "@/components/AdminLogout";

export default async function Dashboard() {
  const supabase = await createClient();

const { count: totalPosts } = await supabase
  .from("posts")
  .select("*", {
    count: "exact",
    head: true,
  });

const { count: publishedPosts } = await supabase
  .from("posts")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("status", "Published");

const { count: draftPosts } = await supabase
  .from("posts")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("status", "Draft");

const { count: featuredPosts } = await supabase
  .from("posts")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("featured", true);
  
  const { count: totalCategories } = await supabase
  .from("categories")
  .select("*", {
    count: "exact",
    head: true,
  });
  const now = new Date();

const startOfMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1
).toISOString();

const { count: thisMonthPosts } = await supabase
  .from("posts")
  .select("*", {
    count: "exact",
    head: true,
  })
  .gte("created_at", startOfMonth);
  const { count: totalComments } = await supabase
  .from("comments")
  .select("*", {
    count: "exact",
    head: true,
  });
  return (
    <main className="dashboard">

      <aside className="sidebar">

        <h2>🚀 TechPilot</h2>

        <nav>

          <Link href="/admin/dashboard">📊 Dashboard</Link>
          <Link href="/admin/dashboard/posts">📝 All Posts</Link>
          <Link href="/admin/dashboard/add-post">➕ Add New Post</Link>
          <Link href="/admin/dashboard/categories">📂 Categories</Link>
          <Link href="/admin/dashboard/comments">💬 Comments</Link>
          <Link href="/admin/dashboard/media">🖼 Media</Link>
          <Link href="/admin/dashboard/settings">⚙ Settings</Link>

        </nav>

      </aside>

      <section className="content">

        <h1>Dashboard</h1>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h1>Dashboard</h1>

  <AdminLogout />
</div>

        <div className="cards">

          <div className="card">
            <h3>Total Posts</h3>
            <p>{totalPosts}</p>
          </div>
          <div className="card">
            <h3>Categories</h3>
            <p>{totalCategories ?? 0}</p>
          </div>
          <div className="card">
            <h3>This Month</h3>
            <p>{thisMonthPosts ?? 0}</p>
          </div>
          <div className="card">
            <h3>Published</h3>
            <p>{publishedPosts}</p>
          </div>
          <div className="card">
            <h3>Draft</h3>
            <p>{draftPosts}</p>
          </div>
          <div className="card">
            <h3>Featured</h3>
            <p>{featuredPosts}</p>
          </div>
          <div className="card">
            <h3>This Month</h3>
            <p>{thisMonthPosts ?? 0}</p>
          </div>

          <div className="card">
            <h3>Visitors</h3>
            <p>0</p>
          </div>

          <div className="card">
            <h3>Comments</h3>
            <p>{totalComments}</p>
          </div>

        </div>

      </section>

    </main>
  );
}