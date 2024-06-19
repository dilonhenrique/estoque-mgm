import {
  Product as PrismaProduct,
  ProductCategory,
  Stock,
  Variant,
  VariantOption,
} from "@prisma/client";
import { Product, ProductVariant } from "../../../../types/schemas";

export function parseProduct(
  payload: PrismaProduct & {
    stock: Stock[];
    variants: (Variant & { options: VariantOption[] })[];
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
    stock: payload.stock.map((item) => ({ id: item.id, qty: item.qty })),
    category: payload.category ?? undefined,
    variants: payload.variants.map((variant) => parseVariant(variant)),
  };
}

export function parseVariant(
  payload: Variant & { options: VariantOption[] }
): ProductVariant {
  return {
    id: payload.id,
    name: payload.name,
    options: payload.options.map((opt) => ({ id: opt.id, name: opt.name })),
  };
}
