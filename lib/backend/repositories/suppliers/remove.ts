"use server";

import { includer } from "@/utils/backend/includer";
import postgres from "prisma/postgres.db";

export default async function remove(id: string) {
  const response = await postgres.supplier.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
    include: includer.supplier,
  });

  return !!response.id;
}
