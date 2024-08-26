"use server";

import postgres from "prisma/postgres.db";
import { Prisma } from "@prisma/client";
import { includer } from "@/utils/includer";
import { Supplier } from "../../../../types/schemas";
import { parseSupplier } from "@/utils/parser/supplier";

export default async function search(query?: Query): Promise<{
  items: Supplier[];
  total: number;
}> {
  const [items, total] = await postgres.$transaction([
    postgres.supplier.findMany({
      ...query,
      where: {
        deleted_at: null,
        ...query?.where,
      },
      include: includer.supplier,
    }),
    postgres.supplier.count({ where: { deleted_at: null } }),
  ]);

  return {
    items: items?.map((item) => parseSupplier(item)),
    total,
  };
}

type Query = {
  where?: Prisma.SupplierWhereInput;
  orderBy?: Prisma.SupplierOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
