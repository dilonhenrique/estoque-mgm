"use server";

import { categoryRepo } from "@/backend/repositories/categories";
import { ProductCategory } from "@/types/schemas";
import { ServiceResult } from "@/types/types";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function create(name: string): Promise<ServiceResult<ProductCategory>> {
  const user = await getSessionUserOrLogout();

  const response = await categoryRepo.create({ name, account_id: user.account_id });
  return serviceResult.success(response);
}
