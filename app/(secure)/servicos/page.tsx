import { serviceService } from "@/backend/services/services";
import ServicesList from "@/components/Services/ServicesList";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function CustomersPage() {
  const services = await serviceService.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 items-center mb-4">
        <h1>Serviços:</h1>

        <div className="flex gap-4 ms-auto">
          <Button color="primary" as={Link} href="/servicos/novo">
            Novo serviço
          </Button>
        </div>
      </div>

      <ServicesList services={services.data?.items ?? []} />
    </main>
  );
}
