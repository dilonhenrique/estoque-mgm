import PurchaseForm from "@/components/Purchases/PurchaseForm";

export default async function SinglePurchasePage() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Cadastrar compra</h2>
        <PurchaseForm />
      </div>
    </main>
  );
}
