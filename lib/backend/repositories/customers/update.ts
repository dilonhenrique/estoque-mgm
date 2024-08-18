"use server";

import { includer } from "@/utils/includer";
import { parseCustomer } from "@/utils/parser/customer";
import postgres from "prisma/postgres.db";

export default async function update(id: string, payload: Payload) {
  const response = await postgres.customer.update({
    where: { id },
    data: {
      name: payload.name,
      img_url: payload.img_url,
      email: payload.email,
      phone: payload.phone,
      birthday: payload.birthday,
      address: payload.address
        ? {
            upsert:{
              create: payload.address,
              update: payload.address,
            }
          }
        : undefined,
    },
    include: includer.customer,
  });

  return parseCustomer(response);
}

type Payload = {
  name?: string;
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
