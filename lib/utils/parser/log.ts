import { ProductLog as PrismaLog } from "@prisma/client";
import { LogWithProduct } from "../../../types/schemas";
import { parseProduct, ProductInput } from "./product";

export type LogInput = PrismaLog & {
  product: ProductInput;
};

export function parseLog(payload: null): undefined;
export function parseLog(payload: LogInput): LogWithProduct;
export function parseLog(payload: LogInput | null) {
  if (!payload) return undefined;

  const parsed: LogWithProduct = {
    id: payload.id,
    qty: payload.qty,
    product: parseProduct(payload.product),
  };

  return parsed;
}
