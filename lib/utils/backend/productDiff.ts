import { PurchaseItem } from "@/types/schemas";

type ProductPayload = {
  id: string;
  qty: number;
  cost?: number;
};

type ProductUpdate = {
  id: string;
  qtyDiff?: number;
  costUpdate?: number | { increment: number };
};

export function productDiff(
  current: PurchaseItem[],
  payload: ProductPayload[]
) {
  const toUpdate: ProductUpdate[] = [];
  const toAdd: ProductPayload[] = [];
  const toRemove: ProductPayload[] = [];

  for (let i = 0; i < Math.max(current.length, payload.length); i++) {
    const incomingProduct = payload[i];
    if (incomingProduct) {
      const dbEquivalent = current.find((c) => c.id === incomingProduct.id);

      if (!dbEquivalent) {
        toAdd.push(incomingProduct);
      } else {
        const qtyDiff = incomingProduct.qty - dbEquivalent.qty;
        const costDiff = (incomingProduct.cost ?? 0) - (dbEquivalent.cost ?? 0);

        if (qtyDiff !== 0 || costDiff !== 0) {
          const costUpdateObj = dbEquivalent.cost
            ? { increment: costDiff }
            : costDiff;
          const costUpdate = costDiff === 0 ? undefined : costUpdateObj;

          toUpdate.push({
            id: incomingProduct.id,
            qtyDiff: qtyDiff || undefined,
            costUpdate,
          });
        }
      }
    }

    const productInDb = current[i];
    if (productInDb) {
      const payloadEquivalent = payload.find((p) => p.id === productInDb.id);

      if (!payloadEquivalent) {
        toRemove.push({
          id: productInDb.id,
          qty: productInDb.qty,
          cost: productInDb.cost,
        });
      }
    }
  }

  return { toUpdate, toAdd, toRemove };
}
