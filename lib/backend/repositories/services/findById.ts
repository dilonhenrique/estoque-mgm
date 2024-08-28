"use server";

import { includer } from "@/utils/backend/includer";
import { parseService } from "@/utils/parser/schemas/service";
import { notFound } from "next/navigation";
import postgres from "prisma/postgres.db";

export default async function findById(id: string) {
  const response = await postgres.service.findUnique({
    where: { id },
    include: includer.service,
  });

  if (!response) notFound();

  return parseService(response);
}
