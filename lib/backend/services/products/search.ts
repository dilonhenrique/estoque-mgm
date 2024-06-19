"use server";

import postgres from "prisma/postgres.db";
import { Prisma } from "@prisma/client";
import { parseProduct } from "./parse";
import { SearchList } from "../../../../types/types";
import { Product } from "../../../../types/schemas";

export default async function search(
  query?: Query
): Promise<SearchList<Product>> {
  const [items, total] = await postgres.$transaction([
    postgres.product.findMany({
      ...query,
      include: {
        category: true,
        stock: { include: { variants: true } },
        variants: { include: { options: true } },
      },
    }),
    postgres.product.count(),
  ]);

  return {
    items: items.map((item) => parseProduct(item)),
    total,
  };
}

type Query = {
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
