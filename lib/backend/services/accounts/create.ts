"use server";

import { z } from "zod";
import { AnyObject, MutationResult } from "@/types/types";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { Account, DocType } from "@prisma/client";
import { accountRepo } from "@/backend/repositories/accounts";
import { cookies } from "next/headers";
import { SOCIAL_ACCOUNT_DATA } from "@/auth";
import { Account as AuthAccount } from "next-auth";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";

export default async function create(
  product: FormData | AnyObject
): Promise<MutationResult<Account>> {
  const data = prepareDataForZod(product);

  const accountPayload = accountSchema.safeParse(data);
  const addressPayload = addressSchema.safeParse(data);
  const userPayload = userSchema.safeParse(data);

  if (
    !accountPayload.success ||
    !addressPayload.success ||
    !userPayload.success
  ) {
    return {
      success: false,
      errors: mapZodErrors([
        ...(accountPayload.error?.errors ?? []),
        ...(addressPayload.error?.errors ?? []),
        ...(userPayload.error?.errors ?? []),
      ]),
    };
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

    return { success: true, errors: {}, data: response };
  } catch (e) {
    console.error(e);
    return { success: false, errors: { system: "error saving" } };
  }
}

const accountSchema = z.object({
  fullname: z.string(),
  professional_number: z.string(),
  document_type: z.nativeEnum(DocType),
  document: z.string(),
});

const addressSchema = z.object({
  zip_code: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string().optional(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
});

const userSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    img_url: z.string().optional(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine(({ confirm_password, password }) => confirm_password === password, {
    message: "passwords_must_be_equal",
    path: ["confirm_password"],
  });

function getSocialAccountFromCookies() {
  const accountData = cookies().get(SOCIAL_ACCOUNT_DATA)?.value;

  if (!accountData) return undefined;

  const { expires_in, ...data } = JSON.parse(accountData) as AuthAccount;
  return data;
}
