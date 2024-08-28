import { Address, Customer as PrismaCustomer } from "@prisma/client";
import { Customer } from "@/types/schemas";
import { parseAddress } from "./address";

export type CustomerInput = PrismaCustomer & {
  address: Address | null;
};

export function parseCustomer(payload: null): undefined;
export function parseCustomer(payload: CustomerInput): Customer;
export function parseCustomer(payload: CustomerInput | null) {
  if (!payload) return undefined;

  const parsed: Customer = {
    id: payload.id,
    name: payload.name,
    img_url: payload.img_url ?? undefined,
    email: payload.email ?? undefined,
    phone: payload.phone ?? undefined,
    birthday: payload.birthday ?? undefined,
    address: parseAddress(payload.address),
  };

  return parsed;
}
