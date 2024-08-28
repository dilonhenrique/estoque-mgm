"use server";

import postgres from "prisma/postgres.db";
import { Prisma } from "@prisma/client";
import { includer } from "@/utils/backend/includer";
import { Procedure } from "@/types/schemas";
import { parseProcedure } from "@/utils/parser/schemas/procedure";

export default async function search(
  account_id: string,
  query?: Query
): Promise<{
  items: Procedure[];
  total: number;
}> {
  const [items, total] = await postgres.$transaction([
    postgres.procedure.findMany({
      ...query,
      where: {
        account_id,
        ...query?.where,
      },
      include: includer.procedure,
    }),
    postgres.procedure.count({ where: { account_id } }),
  ]);

  return {
    items: items?.map((item) => parseProcedure(item)),
    total,
  };
}

type Query = {
  where?: Prisma.ProcedureWhereInput;
  orderBy?: Prisma.ProcedureOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
