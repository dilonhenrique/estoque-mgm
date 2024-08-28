import { Address as PrismaAddress } from "@prisma/client";
import { Address } from "@/types/schemas";

export type AddressInput = PrismaAddress;

export function parseAddress(payload?: null): undefined;
export function parseAddress(payload?: AddressInput): Address;
export function parseAddress(
  payload?: AddressInput | null
): Address | undefined;
export function parseAddress(payload?: AddressInput | null) {
  if (!payload) return undefined;

  const parsed: Address = {
    id: payload.id,
    zip_code: payload.zip_code,
    country: payload.country,
    state: payload.state,
    city: payload.city,
    neighborhood: payload.neighborhood ?? undefined,
    street: payload.street,
    number: payload.number,
    complement: payload.complement ?? undefined,
  };

  return parsed;
}
