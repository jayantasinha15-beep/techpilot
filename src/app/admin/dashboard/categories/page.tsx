import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";

export default async function Categories() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <main style={{ padding: 30 }}>
      <h1>Categories</h1>

      <Link href="/admin/dashboard/categories/add">
        ➕ Add Category
      </Link>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {categories?.map((cat) => (
    <tr key={cat.id}>
      <td>{cat.name}</td>

      <td>{cat.slug}</td>

      <td>
        <Link href={`/admin/dashboard/categories/edit/${cat.id}`}>
          ✏ Edit
        </Link>

        {" | "}

        <DeleteCategoryButton id={cat.id} />
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </main>
  );
}