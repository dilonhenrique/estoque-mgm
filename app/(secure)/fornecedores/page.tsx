import { supplierService } from "@/backend/services/suppliers";
import SupplierList from "@/components/Supplier/SupplierList";
import Icon from "@/components/ui/Icon/Icon";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function SuppliersPage() {
  const suppliers = await supplierService.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 items-center mb-4">
        <h1 className="flex gap-2">
          <Icon value="supplier" className="text-3xl" strokeWidth={1.2} />{" "}
          Fornecedores:
        </h1>

        <div className="flex gap-4 ms-auto">
          <Button color="primary" as={Link} href="/fornecedores/novo">
            Novo Fornecedor
          </Button>
        </div>
      </div>

      <SupplierList suppliers={suppliers.data?.items ?? []} />
    </main>
  );
}
