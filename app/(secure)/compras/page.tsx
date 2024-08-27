import { purchaseService } from "@/backend/services/purchases";
import PurchaseList from "@/components/Purchases/PurchaseList";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function PurchasePage() {
  const purchase = await purchaseService.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 items-center mb-4">
        <h1>Compras:</h1>

        <div className="flex gap-4 ms-auto">
          <Button color="primary" as={Link} href="/compras/novo">
            Nova compra
          </Button>
        </div>
      </div>

      <PurchaseList purchases={purchase.data?.items ?? []} />
    </main>
  );
}
