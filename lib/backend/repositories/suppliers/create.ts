"use server";

import { includer } from "@/utils/backend/includer";
import { parseSupplier } from "@/utils/parser/schemas/supplier";
import postgres from "prisma/postgres.db";

export default async function create(payload: Payload) {
  const response = await postgres.supplier.create({
    data: {
      name: payload.name,
      cnpj: payload.cnpj,
      email: payload.email,
      phone: payload.phone,
      address: payload.address
        ? {
            create: payload.address,
          }
        : undefined,
    },
    include: includer.supplier,
  });

  return parseSupplier(response);
}

type Payload = {
  account_id: string;
  name: string;
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
