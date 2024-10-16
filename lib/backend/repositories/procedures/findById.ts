"use server";

import { includer } from "@/utils/backend/includer";
import { parseProcedure } from "@/utils/parser/schemas/procedure";
import { notFound } from "next/navigation";
import postgres from "prisma/postgres.db";

export default async function findById(id: string) {
  const response = await postgres.procedure.findUnique({
    where: { id },
    include: includer.procedureWithLog,
  });

  if (!response) notFound();

  return parseProcedure(response);
}
