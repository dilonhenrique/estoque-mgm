"use server";

import { includer } from "@/utils/backend/includer";
import { parseSupplier } from "@/utils/parser/schemas/supplier";
import { notFound } from "next/navigation";
import postgres from "prisma/postgres.db";

export default async function findById(id: string) {
  const response = await postgres.supplier.findUnique({
    where: { id },
    include: includer.supplier,
  });

  if (!response) notFound();

  return parseSupplier(response);
}
