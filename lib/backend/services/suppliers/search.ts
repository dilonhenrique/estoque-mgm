"use server";

import { MutationResult, SearchList } from "../../../../types/types";
import { Prisma } from "@prisma/client";
import { Supplier } from "../../../../types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { supplierRepo } from "@/backend/repositories/suppliers";

export default async function search(
  query?: Query
): Promise<MutationResult<SearchList<Supplier>>> {
  await getSessionUserOrLogout();

  const search = {
    OR: [
      { name: { contains: query?.search, mode: "insensitive" } },
      { email: { contains: query?.search, mode: "insensitive" } },
    ],
  } as Prisma.SupplierWhereInput;

  const find = {
    orderBy: query?.orderBy ?? [{ name: "asc" }],
    skip: query?.skip,
    take: query?.take,
    where: { AND: [search] },
  };

  const response = await supplierRepo.search(find);

  return { success: true, errors: {}, data: response };
}

type Query = {
  search?: string;
  where?: Prisma.SupplierWhereInput;
  orderBy?: Prisma.SupplierOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
