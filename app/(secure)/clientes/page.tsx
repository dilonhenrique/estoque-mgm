import { customerService } from "@/backend/services/customers";
import CustomerList from "@/components/Customer/CustomerList";
import Icon from "@/components/ui/Icon/Icon";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function CustomersPage() {
  const customers = await customerService.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 items-center mb-4">
        <h1 className="flex gap-2">
          <Icon value="customer" className="text-3xl" strokeWidth={1.2} />{" "}
          Clientes:
        </h1>

        <div className="flex gap-4 ms-auto">
          <Button color="primary" as={Link} href="/clientes/novo">
            Novo Cliente
          </Button>
        </div>
      </div>

      <CustomerList customers={customers.data?.items ?? []} />
    </main>
  );
}
