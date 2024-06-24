"use server";

import { DocType, Role } from "@prisma/client";
import postgres from "prisma/postgres.db";

export default async function create({
  account,
  address,
  user,
  social_account,
}: Payload) {
  const social_accounts = social_account
    ? { create: social_account }
    : undefined;

  const response = await postgres.account.create({
    data: {
      ...account,
      address: { create: address },
      users: { create: { ...user, role: Role.owner, social_accounts } },
    },
  });

  return response;
}

type Payload = {
  account: AccountPayload;
  address: AddressPayload;
  user: UserPayload;
  social_account?: SocialAccountPayload;
};

type AccountPayload = {
  fullname: string;
  professional_number: string;
  document_type: DocType;
  document: string;
};

type AddressPayload = {
  zip_code: string;
  country: string;
  state: string;
  city: string;
  neighborhood?: string;
  street: string;
  number: string;
  complement?: string;
};

type UserPayload = {
  name: string;
  email: string;
  img_url?: string;
  password: string;
};

type SocialAccountPayload = {
  type: string;
  provider: string;
  providerAccountId: string;
  expires_at?: number;
  id_token?: string;
  token_type?: string;
  scope?: string;
};
