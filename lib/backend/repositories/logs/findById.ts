"use server";

import { includer } from "@/utils/backend/includer";
import { parseLogComplete } from "@/utils/parser/schemas/log";
import { notFound } from "next/navigation";
import postgres from "prisma/postgres.db";

export default async function findById(id: string) {
  const response = await postgres.productLog.findUnique({
    where: { id },
    include: includer.logComplete,
  });

  if (!response) notFound();

  return parseLogComplete(response);
}
