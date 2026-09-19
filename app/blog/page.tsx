import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogClient } from "@/components/blog/BlogClient";
import { getUpdates } from "@/lib/cms/queries";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 60;

export default async function BlogPage() {
  const updates = await getUpdates();
  return (
    <Suspense fallback={null}>
      <BlogClient updates={updates} />
    </Suspense>
  );
}
