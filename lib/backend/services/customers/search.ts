"use server";

import { MutationResult, SearchList } from "../../../../types/types";
import { Prisma } from "@prisma/client";
import { Customer } from "../../../../types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { customerRepo } from "@/backend/repositories/customers";

export default async function search(
  query?: Query
): Promise<MutationResult<SearchList<Customer>>> {
  const user = await getSessionUserOrLogout();

  const search = {
    OR: [
      { name: { contains: query?.search, mode: "insensitive" } },
      { email: { contains: query?.search, mode: "insensitive" } },
    ],
  } as Prisma.CustomerWhereInput;

  const find = {
    orderBy: query?.orderBy ?? [{ name: "asc" }],
    skip: query?.skip,
    take: query?.take,
    where: { AND: [search] },
  };

  const response = await customerRepo.search(user.account_id, find);

  return { success: true, errors: {}, data: response };
}

type Query = {
  search?: string;
  where?: Prisma.CustomerWhereInput;
  orderBy?: Prisma.CustomerOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
