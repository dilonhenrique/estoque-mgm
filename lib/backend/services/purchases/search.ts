"use server";

import { ServiceResult, SearchList } from "@/types/types";
import { Prisma } from "@prisma/client";
import { Purchase } from "@/types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { purchaseRepo } from "@/backend/repositories/purchases";

export default async function search(
  query?: Query
): Promise<ServiceResult<SearchList<Purchase>>> {
  const user = await getSessionUserOrLogout();

  const search = {
    // OR: [
    //   { service: { name: { contains: query?.search, mode: "insensitive" } } },
    //   { customer: { name: { contains: query?.search, mode: "insensitive" } } },
    // ],
  } as Prisma.PurchaseWhereInput;

  const find = {
    orderBy: query?.orderBy ?? [{ created_at: "asc" }],
    skip: query?.skip,
    take: query?.take,
    where: { ...search },
  };

  const response = await purchaseRepo.search(user.account_id, find);

  return { success: true, fieldErrors: {}, data: response };
}

type Query = {
  search?: string;
  where?: Prisma.PurchaseWhereInput;
  orderBy?: Prisma.PurchaseOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
