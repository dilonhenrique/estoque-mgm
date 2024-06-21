"use server";

import { Role } from "@prisma/client";
import postgres from "prisma/postgres.db";

export default async function upsert(user: Payload) {
  const response = await postgres.user.upsert({
    where: { email: user.email },
    update: {
      email: user.email,
      name: user.name,
      img_url: user.img_url,
    },
    create: {
      email: user.email,
      name: user.name,
      img_url: user.img_url,
      ...defaultUserData,
    },
  });

  return response;
}

type Payload = {
  name: string;
  email: string;
  img_url?: string;
};

const defaultUserData = {
  password: "qualquersenha",
  role: Role.admin,
  account: {
    create: {
      document: "123456",
      professional_number: "123456",
      fullname: "Bianca Ferreira de Assis",
      address: {
        create: {
          zip_code: "88090750",
          country: "Brasil",
          state: "SC",
          city: "Florianópolis",
          neighborhood: "Capoeiras",
          street: "Rua Acácio Moreira",
          number: "100",
          complement: "3",
        },
      },
    },
  },
};
