import { Product as PrismaProduct, ProductCategory } from "@prisma/client";
import { Product } from "@/types/schemas";
import { LogInputForProduct, parseLogForProduct } from "./log";

export type ProductInput = PrismaProduct & {
  category: ProductCategory | null;
  logs?: LogInputForProduct[];
};

export function parseProduct(payload: ProductInput): Product {
  return {
    id: payload.id,
    name: payload.name,
    account_id: payload.account_id,
    unit: payload.unit,
    code: payload.code ?? undefined,
    img_url: payload.img_url ?? undefined,
    minStock: payload.minStock ?? undefined,
    stock: payload.stock,
    category: payload.category ?? undefined,
    logs: payload.logs
      ? payload.logs.map((log) => parseLogForProduct(log))
      : undefined,
  };
}
