import { Purchase as PrismaPurchase, PurchaseItem } from "@prisma/client";
import { Purchase } from "@/types/schemas";
import { parseProduct, ProductInput } from "./product";
import { LogInputForAction, parseLogForAction } from "./log";
import { parseSupplier, SupplierInput } from "./supplier";
import { parseDate } from "./dateToLocal";

export type PurchaseInput = PrismaPurchase & {
  supplier: SupplierInput | null;
  purchaseItems: (PurchaseItem & { product: ProductInput })[];
  logs?: LogInputForAction[] | null;
};

export function parsePurchase(payload: PurchaseInput): Purchase {
  return {
    id: payload.id,
    supplier: payload.supplier ? parseSupplier(payload.supplier) : undefined,
    items: payload.purchaseItems.map((purchaseItem) => ({
      ...parseProduct(purchaseItem.product),
      qty: purchaseItem.qty,
      cost: purchaseItem.cost ?? undefined,
    })),
    created_at: parseDate(payload.created_at),
    logs: payload.logs?.map((item) => parseLogForAction(item)),
  };
}
