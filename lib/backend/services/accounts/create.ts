"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Account } from "@prisma/client";
import { accountRepo } from "@/backend/repositories/accounts";
import { cookies } from "next/headers";
import { SOCIAL_ACCOUNT_DATA } from "@/auth";
import { Account as AuthAccount } from "next-auth";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { addressSchema } from "@/utils/validation/schema/address";
import { accountSchema } from "@/utils/validation/schema/account";
import { userSchema } from "@/utils/validation/schema/user";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Account>> {
  const data = prepareDataForSchema(product);

  const accountPayload = accountSchema.safeParse(data);
  const addressPayload = addressSchema.safeParse(data);
  const userPayload = userSchema.safeParse(data);

  if (
    !accountPayload.success ||
    !addressPayload.success ||
    !userPayload.success
  ) {
    return serviceResult.fieldErrors([
      ...(accountPayload.error?.errors ?? []),
      ...(addressPayload.error?.errors ?? []),
      ...(userPayload.error?.errors ?? []),
    ]);
  }

  const { data: account } = accountPayload;
  const { data: address } = addressPayload;
  const {
    data: { confirm_password, ...user },
  } = userPayload;
  const social_account = getSocialAccountFromCookies();

  try {
    const response = await accountRepo.create({
      account,
      address,
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
