"use server";

import { includer } from "@/utils/backend/includer";
import { parseService } from "@/utils/parser/schemas/service";
import postgres from "prisma/postgres.db";

export default async function update(id: string, payload: Payload) {
  const response = await postgres.service.update({
    where: { id },
    data: {
      name: payload.name,
      productsOnServices: payload.products
        ? {
            deleteMany: {},
            createMany: {
              data: payload.products.map((product) => ({
                qty: product.qty,
                product_id: product.id,
              })),
            },
          }
        : undefined,
    },
    include: includer.service,
  });

  return parseService(response);
}

type Payload = {
  name?: string;
  products?: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
};
