"use server";

import { includer } from "@/utils/backend/includer";
import { parseService } from "@/utils/parser/schemas/service";
import postgres from "prisma/postgres.db";

export default async function create(payload: Payload) {
  const response = await postgres.service.create({
    data: {
      name: payload.name,
      account: { connect: { id: payload.account_id } },
      productsOnServices: {
        createMany: {
          data: payload.products.map((product) => ({
            qty: product.qty,
            product_id: product.id,
          })),
        },
      },
    },
    include: includer.service,
  });

  return parseService(response);
}

type Payload = {
  name: string;
  account_id: string;
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
};
