import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getResource, resources } from "@/lib/cms/resources";
import { ResourceList } from "@/components/admin/cms/ResourceList";
import { SingletonResourceEditor } from "@/components/admin/cms/SingletonResourceEditor";

export function generateStaticParams() {
  return resources.map((r) => ({ resource: r.key }));
}

export default function ResourceListPage({ params }: { params: { resource: string } }) {
  const resource = getResource(params.resource);
  if (!resource) notFound();

  return (
    <div>
      <Link href="/admin/content" className="mb-4 flex items-center gap-1.5 text-sm font-medium text-navy-400 hover:text-navy-700">
        <ArrowLeft className="h-3.5 w-3.5" /> All content
      </Link>
      {resource.singleton ? <SingletonResourceEditor resource={resource} /> : <ResourceList resource={resource} />}
    </div>
  );
}
