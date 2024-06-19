"use server";

import postgres from "prisma/postgres.db";

export default async function update(id: string, user: Payload) {
  const response = await postgres.user.update({
    where: { email: user.email },
    data: {
      email: user.email,
      name: user.name,
      img_url: user.img_url,
    },
  });

  return response;
}

type Payload = {
  name?: string;
  email?: string;
  img_url?: string;
};
