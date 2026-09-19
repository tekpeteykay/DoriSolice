import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getResource, resources } from "@/lib/cms/resources";
import { ResourceForm } from "@/components/admin/cms/ResourceForm";

export function generateStaticParams() {
  return resources.map((r) => ({ resource: r.key }));
}

export default function NewResourcePage({ params }: { params: { resource: string } }) {
  const resource = getResource(params.resource);
  if (!resource) notFound();

  return (
    <div>
      <Link href={`/admin/content/${resource.key}`} className="mb-4 flex items-center gap-1.5 text-sm font-medium text-navy-400 hover:text-navy-700">
        <ArrowLeft className="h-3.5 w-3.5" /> {resource.label}
      </Link>
      <h1 className="text-2xl font-bold text-navy-900">Add {resource.singularLabel}</h1>
      <div className="mt-6 max-w-3xl rounded-2xl border border-navy-100 bg-white p-6">
        <ResourceForm resource={resource} isNew />
      </div>
    </div>
  );
}
