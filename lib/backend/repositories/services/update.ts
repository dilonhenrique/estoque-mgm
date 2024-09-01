"use server";

import postgres from "prisma/postgres.db";
import { includer } from "@/utils/backend/includer";
import { parseService } from "@/utils/parser/schemas/service";
import { serviceRepo } from ".";
import { productDiff } from "@/utils/backend/productDiff";

export default async function update(id: string, payload: Payload) {
  const currentService = await serviceRepo.findById(id);

  const products = productDiff(currentService.products, payload.products ?? []);

  const response = await postgres.service.update({
    where: { id },
    data: {
      name: payload.name,
      productsOnServices: {
        updateMany: products.toUpdate.map((prod) => ({
          where: { product_id: prod.id, service_id: id },
          data: {
            qty: { increment: prod.qtyDiff },
          },
        })),
        create: products.toAdd.map((prod) => ({
          product_id: prod.id,
          qty: prod.qty,
        })),
        deleteMany: products.toRemove.map((prod) => ({
          product_id: prod.id,
          service_id: id,
        })),
      },
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
