import { Product as PrismaProduct, ProductCategory } from "@prisma/client";
import { Product } from "../../../types/schemas";

export type ProductInput = PrismaProduct & {
  category: ProductCategory | null;
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
  };
}
