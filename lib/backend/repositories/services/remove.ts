"use server";

import { includer } from "@/utils/includer";
import postgres from "prisma/postgres.db";

export default async function remove(id: string) {
  const response = await postgres.service.delete({
    where: { id },
    include: includer.service,
  });

  return !!response.id;
}
