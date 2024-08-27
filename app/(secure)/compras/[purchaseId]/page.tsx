import { purchaseService } from "@/backend/services/purchases";
import PurchaseForm from "@/components/Purchases/PurchaseForm";
import { notFound } from "next/navigation";

export default async function SinglePurchasePage({
  params,
}: {
  params: { purchaseId: string };
}) {
  const { purchaseId } = params;
  const purchase = await purchaseService.findById(purchaseId);

  if (!purchase.data) notFound();

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Editar compra</h2>
        <PurchaseForm purchase={purchase.data} />
      </div>
    </main>
  );
}
