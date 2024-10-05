"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Account } from "@prisma/client";
import { accountRepo } from "@/backend/repositories/accounts";
import { cookies } from "next/headers";
import { SOCIAL_ACCOUNT_DATA } from "@/auth";
import { Account as AuthAccount } from "next-auth";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { signupSchema } from "@/utils/validation/schema/signup";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Account>> {
  const data = prepareDataForSchema(product);
  const payload = signupSchema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const { confirm_password, ...user } = payload.data.user;
  const social_account = getSocialAccountFromCookies();

  try {
    const response = await accountRepo.create({
      ...payload.data,
      user,
      social_account,
    });

    return serviceResult.success(response);
  } catch (e) {
    console.error(e);
    return serviceResult.error();
  }
}

function getSocialAccountFromCookies() {
  const accountData = cookies().get(SOCIAL_ACCOUNT_DATA)?.value;

  if (!accountData) return undefined;

  const { expires_in, ...data } = JSON.parse(accountData) as AuthAccount;
  return data;
}
