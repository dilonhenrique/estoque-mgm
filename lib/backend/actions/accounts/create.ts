"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Account } from "@prisma/client";
import { accountService } from "@/backend/services/accounts";

export default async function create(
  account: FormData | AnyObject
): Promise<MutationResult<Account>> {
  return await accountService.create(account);
}
