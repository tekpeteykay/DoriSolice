import { notFound } from "next/navigation";
import { PagesSidebar } from "@/components/admin/pages/PagesSidebar";
import { PageContentEditor } from "@/components/admin/pages/PageContentEditor";
import { pageRegistry, getPage } from "@/lib/cms/page-registry";

export function generateStaticParams() {
  return pageRegistry.map((p) => ({ pageKey: p.key }));
}

export default function AdminPageContentPage({ params }: { params: { pageKey: string } }) {
  if (!getPage(params.pageKey)) notFound();

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <PagesSidebar />
      <div className="flex-1">
        <PageContentEditor pageKey={params.pageKey} />
      </div>
    </div>
  );
}
