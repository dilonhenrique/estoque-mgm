"use server";

import { categoryRepo } from "@/backend/repositories/categories";
import { getSessionUserOrLogout } from "@/utils/authUtils";

export default async function create(name: string) {
  const user = await getSessionUserOrLogout();

  return await categoryRepo.create({ name, account_id: user.account_id });
}
