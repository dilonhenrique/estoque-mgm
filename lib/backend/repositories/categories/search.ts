"use server";

import postgres from "prisma/postgres.db";
import { Prisma } from "@prisma/client";
import { SearchList } from "../../../../types/types";
import { ProductCategory } from "../../../../types/schemas";

export default async function search(
  account_id: string,
  query?: Query
): Promise<SearchList<ProductCategory>> {
  const [items, total] = await postgres.$transaction([
    postgres.productCategory.findMany({
      ...query,
      where: {
        ...query?.where,
        account_id,
      },
    }),
    postgres.productCategory.count({ where: { account_id } }),
  ]);

  return {
    items,
    total,
  };
}

type Query = {
  where?: Prisma.ProductCategoryWhereInput;
  orderBy?: Prisma.ProductCategoryOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
