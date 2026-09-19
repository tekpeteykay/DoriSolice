import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogClient } from "@/components/blog/BlogClient";
import { getUpdates } from "@/lib/cms/queries";
import { getPageContent } from "@/lib/cms/page-content";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 60;

export default async function BlogPage() {
  const [updates, content] = await Promise.all([getUpdates(), getPageContent("blog")]);
  const hero = content.hero as any;
  return (
    <Suspense fallback={null}>
      <BlogClient updates={updates} heading={hero.heading} />
    </Suspense>
  );
}
