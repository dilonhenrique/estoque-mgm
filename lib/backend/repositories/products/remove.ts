"use server";

import postgres from "prisma/postgres.db";

export default async function remove(id: string) {
  const response = await postgres.product.delete({ where: { id } });

  return !!response.id;
}
