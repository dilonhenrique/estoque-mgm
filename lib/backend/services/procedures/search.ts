"use server";

import { ServiceResult, SearchList } from "@/types/types";
import { Prisma } from "@prisma/client";
import { Procedure } from "@/types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { procedureRepo } from "@/backend/repositories/procedures";

export default async function search(
  query?: Query
): Promise<ServiceResult<SearchList<Procedure>>> {
  const user = await getSessionUserOrLogout();

  const search = {
    // OR: [
    //   { service: { name: { contains: query?.search, mode: "insensitive" } } },
    //   { customer: { name: { contains: query?.search, mode: "insensitive" } } },
    // ],
  } as Prisma.ProcedureWhereInput;

  const find = {
    orderBy: query?.orderBy ?? [{ created_at: "asc" }],
    skip: query?.skip,
    take: query?.take,
    where: { ...search },
  };

  const response = await procedureRepo.search(user.account_id, find);

  return { success: true, fieldErrors: {}, data: response };
}

type Query = {
  search?: string;
  where?: Prisma.ProcedureWhereInput;
  orderBy?: Prisma.ProcedureOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
