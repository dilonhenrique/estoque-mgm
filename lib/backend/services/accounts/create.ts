"use server";

import { z } from "zod";
import { AnyObject, ServiceResult } from "@/types/types";
import { Account, DocType } from "@prisma/client";
import { accountRepo } from "@/backend/repositories/accounts";
import { cookies } from "next/headers";
import { SOCIAL_ACCOUNT_DATA } from "@/auth";
import { Account as AuthAccount } from "next-auth";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { validateYupSchema } from "@/utils/form/validateYupSchema";
import * as yup from "yup";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Account>> {
  const data = prepareDataForSchema(product);

  const accountPayload = validateYupSchema(accountSchema, data);
  const addressPayload = validateYupSchema(addressSchema, data);
  const userPayload = validateYupSchema(userSchema, data);

  if (
    !accountPayload.success ||
    !addressPayload.success ||
    !userPayload.success
  ) {
    return serviceResult.fieldErrors({
      ...(accountPayload.errors ?? {}),
      ...(addressPayload.errors ?? {}),
      ...(userPayload.errors ?? {}),
    });
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

const accountSchema = yup.object({
  fullname: yup.string().required(),
  professional_number: yup.string().required(),
  document_type: yup.string().oneOf(Object.values(DocType)).required(),
  document: yup.string().required(),
});

const addressSchema = yup.object({
  zip_code: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  neighborhood: yup.string().optional(),
  street: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().optional(),
});

const userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  img_url: yup.string().optional().required(),
  password: yup.string().min(8).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "passwords_must_be_equal")
    .required(),
});
// .refine(({ confirm_password, password }) => confirm_password === password, {
//   message: "passwords_must_be_equal",
//   path: ["confirm_password"],
// });

function getSocialAccountFromCookies() {
  const accountData = cookies().get(SOCIAL_ACCOUNT_DATA)?.value;

  if (!accountData) return undefined;

  const { expires_in, ...data } = JSON.parse(accountData) as AuthAccount;
  return data;
}
