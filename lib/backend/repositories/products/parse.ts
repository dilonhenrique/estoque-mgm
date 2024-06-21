import { Product as PrismaProduct, ProductCategory } from "@prisma/client";
import { Product } from "../../../../types/schemas";

export function parseProduct(
  payload: PrismaProduct & {
    category: ProductCategory | null;
  }
): Product {
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

// export function parseVariant(
//   payload: Variant & { options: VariantOption[] }
// ): ProductVariant {
//   return {
//     id: payload.id,
//     name: payload.name,
//     options: payload.options.map((opt) => ({ id: opt.id, name: opt.name })),
//   };
// }
