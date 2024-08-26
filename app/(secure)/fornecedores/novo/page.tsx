import SupplierForm from "@/components/Supplier/SupplierForm";

export default async function SingleSupplierPage() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Cadastrar Fornecedor</h2>
        <SupplierForm />
      </div>
    </main>
  );
}
