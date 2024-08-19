"use server";

import postgres from "prisma/postgres.db";
import { Prisma } from "@prisma/client";
import { includer } from "@/utils/includer";
import { Service } from "../../../../types/schemas";
import { parseService } from "@/utils/parser/service";

export default async function search(
  account_id: string,
  query?: Query
): Promise<{
  items: Service[];
  total: number;
}> {
  const [items, total] = await postgres.$transaction([
    postgres.service.findMany({
      ...query,
      where: {
        account_id,
        ...query?.where,
      },
      include: includer.service,
    }),
    postgres.service.count({ where: { account_id } }),
  ]);

  return {
    items: items?.map((item) => parseService(item)),
    total,
  };
}

type Query = {
  where?: Prisma.ServiceWhereInput;
  orderBy?: Prisma.ServiceOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
