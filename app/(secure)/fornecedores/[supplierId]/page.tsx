import { supplierService } from "@/backend/services/suppliers";
import SupplierForm from "@/components/Supplier/SupplierForm";

export default async function SingleSupplierPage({
  params,
}: {
  params: { supplierId: string };
}) {
  const { supplierId } = params;
  const supplier = await supplierService.findById(supplierId);

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Editar Fornecedor</h2>
        <SupplierForm supplier={supplier.data} />
      </div>
    </main>
  );
}
