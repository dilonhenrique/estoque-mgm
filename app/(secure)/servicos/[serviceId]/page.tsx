import { serviceService } from "@/backend/services/services";
import ServiceForm from "@/components/Services/ServiceForm";
import { notFound } from "next/navigation";

export default async function SingleCustomerPage({
  params,
}: {
  params: { serviceId: string };
}) {
  const { serviceId } = params;
  const service = await serviceService.findById(serviceId);

  if (!service.data) notFound();

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Editar serviço</h2>
        <ServiceForm service={service.data} />
      </div>
    </main>
  );
}
