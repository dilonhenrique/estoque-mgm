"use server";

import { includer } from "@/utils/includer";
import postgres from "prisma/postgres.db";

export default async function remove(id: string) {
  const response = await postgres.procedure.delete({
    where: { id },
    include: includer.procedure,
  });

  return !!response.id;
}
