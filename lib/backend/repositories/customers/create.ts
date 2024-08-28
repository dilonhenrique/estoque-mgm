"use server";

import { includer } from "@/utils/backend/includer";
import { parseCustomer } from "@/utils/parser/schemas/customer";
import postgres from "prisma/postgres.db";

export default async function create(payload: Payload) {
  const response = await postgres.customer.create({
    data: {
      account: { connect: { id: payload.account_id } },
      name: payload.name,
      img_url: payload.img_url,
      email: payload.email,
      phone: payload.phone,
      birthday: payload.birthday,
      address: payload.address
        ? {
            create: payload.address,
          }
        : undefined,
    },
    include: includer.customer,
  });

  return parseCustomer(response);
}

type Payload = {
  account_id: string;
  name: string;
  img_url?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
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
