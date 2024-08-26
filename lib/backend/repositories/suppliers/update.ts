"use server";

import { includer } from "@/utils/includer";
import { parseSupplier } from "@/utils/parser/supplier";
import postgres from "prisma/postgres.db";

export default async function update(id: string, payload: Payload) {
  const response = await postgres.supplier.update({
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
      // : { disconnect: {} },
    },
    include: includer.supplier,
  });

  return parseSupplier(response);
}

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  cnpj?: string;
  address?: AddressPayload;
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
