"use server";

import { includer } from "@/utils/backend/includer";
import { parseSupplier } from "@/utils/parser/schemas/supplier";
import postgres from "prisma/postgres.db";

export default async function update(id: string, payload: Payload) {
  const [response] = await postgres.$transaction([
    postgres.supplier.update({
      where: { id },
      data: {
        name: payload.name,
        cnpj: payload.cnpj,
        email: payload.email,
        phone: payload.phone,
        address: payload.address
          ? {
              upsert: {
                create: payload.address,
                update: payload.address,
              },
            }
          : undefined,
      },
      include: includer.supplier,
    }),
    ...(payload.address === null
      ? [
          postgres.address.deleteMany({
            where: { suppliers: { id } },
          }),
        ]
      : []),
  ]);

  return parseSupplier(response);
}

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  cnpj?: string;
  address?: AddressPayload | null;
};

type AddressPayload = {
  zip_code: string;
  country: string;
  state: string;
  city: string;
  neighborhood?: string;
  street: string;
  number: string;
  complement?: string;
};
