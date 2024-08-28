"use server";

import { MutationResult, SearchList } from "@/types/types";
import { Prisma } from "@prisma/client";
import { Service } from "@/types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { serviceRepo } from "@/backend/repositories/services";

export default async function search(
  query?: Query
): Promise<MutationResult<SearchList<Service>>> {
  const user = await getSessionUserOrLogout();

  const search = {
    OR: [{ name: { contains: query?.search, mode: "insensitive" } }],
  } as Prisma.ServiceWhereInput;

  const find = {
    orderBy: query?.orderBy ?? [{ name: "asc" }],
    skip: query?.skip,
    take: query?.take,
    where: { AND: [search] },
  };

  const response = await serviceRepo.search(user.account_id, find);

  return { success: true, errors: {}, data: response };
}

type Query = {
  search?: string;
  where?: Prisma.ServiceWhereInput;
  orderBy?: Prisma.ServiceOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
