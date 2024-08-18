"use server";

import postgres from "prisma/postgres.db";
import { Prisma } from "@prisma/client";
import { parseCustomer } from "@/utils/parser/customer";
import { includer } from "@/utils/includer";
import { Customer } from "../../../../types/schemas";

export default async function search(
  account_id: string,
  query?: Query
): Promise<{
  items: Customer[];
  total: number;
}> {
  const [items, total] = await postgres.$transaction([
    postgres.customer.findMany({
      ...query,
      where: {
        account_id,
        deleted_at: null,
        ...query?.where,
      },
      include: includer.customer,
    }),
    postgres.customer.count({ where: { account_id, deleted_at: null } }),
  ]);

  return {
    items: items?.map((booth) => parseCustomer(booth)),
    total,
  };
}

type Query = {
  where?: Prisma.CustomerWhereInput;
  orderBy?: Prisma.CustomerOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
