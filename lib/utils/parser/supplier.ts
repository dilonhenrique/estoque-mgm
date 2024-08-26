import { Address, Supplier as PrismaSupplier } from "@prisma/client";
import { Supplier } from "../../../types/schemas";
import { parseAddress } from "./address";

export type SupplierInput = PrismaSupplier & {
  address: Address | null;
};

export function parseSupplier(payload: null): undefined;
export function parseSupplier(payload: SupplierInput): Supplier;
export function parseSupplier(payload: SupplierInput | null) {
  if (!payload) return undefined;

  const parsed: Supplier = {
    id: payload.id,
    name: payload.name,
    email: payload.email ?? undefined,
    phone: payload.phone ?? undefined,
    cnpj: payload.cnpj ?? undefined,
    address: parseAddress(payload.address),
  };

  return parsed;
}
