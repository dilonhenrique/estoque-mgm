"use server";

import postgres from "prisma/postgres.db";
import { Prisma } from "@prisma/client";
import { includer } from "@/utils/backend/includer";
import { Purchase } from "@/types/schemas";
import { parsePurchase } from "@/utils/parser/schemas/purchase";

export default async function search(
  account_id: string,
  query?: Query
): Promise<{
  items: Purchase[];
  total: number;
}> {
  const [items, total] = await postgres.$transaction([
    postgres.purchase.findMany({
      ...query,
      where: {
        account_id,
        ...query?.where,
      },
      include: includer.purchase,
    }),
    postgres.purchase.count({ where: { account_id } }),
  ]);

  return {
    items: items?.map((item) => parsePurchase(item)),
    total,
  };
}

type Query = {
  where?: Prisma.PurchaseWhereInput;
  orderBy?: Prisma.PurchaseOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
