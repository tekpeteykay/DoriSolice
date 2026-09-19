import type { Metadata } from "next";
import { PagesSidebar } from "@/components/admin/pages/PagesSidebar";
import { pageRegistry } from "@/lib/cms/page-registry";

export const metadata: Metadata = { title: "Page Content" };

export default function PagesIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Page Content</h1>
      <p className="mt-1 max-w-2xl text-navy-500">
        Every page on the site, listed on the left. Pick one to edit its sections in the same top-to-bottom order they appear on the live page — headings, intro text, button labels, and repeating
        cards. Business contact details, social links, the main navigation and the footer are shared across every page, so those live under Site Settings instead.
      </p>

      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <PagesSidebar />
        <div className="flex-1 rounded-2xl border border-dashed border-navy-200 bg-white p-10 text-center text-sm text-navy-400">
          Choose a page from the list to start editing.
          <div className="mt-4 text-xs text-navy-300">{pageRegistry.length} pages available</div>
        </div>
      </div>
    </div>
  );
}
