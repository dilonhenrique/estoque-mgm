"use server";

import { ActionResult, AnyObject, ServiceResult } from "@/types/types";
import { Account } from "@prisma/client";
import { accountService } from "@/backend/services/accounts";
import { actionResult } from "@/utils/backend/actionResult";

export default async function create(
  account: FormData | AnyObject
): Promise<ActionResult<Account>> {
  const response = await accountService.create(account);
  return actionResult(response);
}
