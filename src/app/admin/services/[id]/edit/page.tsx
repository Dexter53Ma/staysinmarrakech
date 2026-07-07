import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceForm from "@/components/ServiceForm";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return notFound();

  return (
    <div className="max-w-2xl">
      <ServiceForm
        isEdit
        initialData={{
          id: service.id,
          title: service.title,
          titleEn: service.titleEn || "",
          description: service.description,
          descriptionEn: service.descriptionEn || "",
          longDescription: service.longDescription || "",
          longDescriptionEn: service.longDescriptionEn || "",
          metaDescription: service.metaDescription || "",
          metaDescriptionEn: service.metaDescriptionEn || "",
          features: service.features || "",
          featuresEn: service.featuresEn || "",
          image: service.image || "",
          category: service.category || "",
          price: service.price?.toString() || "",
          priceUnit: service.priceUnit || "",
        }}
      />
    </div>
  );
}
