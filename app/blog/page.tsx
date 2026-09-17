import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogClient } from "@/components/blog/BlogClient";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogClient />
    </Suspense>
  );
}
