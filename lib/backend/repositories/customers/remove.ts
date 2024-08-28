"use server";

import { includer } from "@/utils/backend/includer";
import postgres from "prisma/postgres.db";

export default async function remove(id: string) {
  const response = await postgres.customer.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
    include: includer.customer,
  });

  return !!response.id;
}
