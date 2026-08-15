import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login না থাকলে
  if (!user) {
    redirect("/admin/login");
  }

  // শুধু তোমার Email dashboard access পাবে
  if (user.email !== "admin@techpilot.in") {
    redirect("/");
  }

  return <>{children}</>;
}