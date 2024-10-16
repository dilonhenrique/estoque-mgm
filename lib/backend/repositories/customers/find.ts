"use server";

import { includer } from "@/utils/backend/includer";
import { parseCustomer } from "@/utils/parser/schemas/customer";
import { notFound } from "next/navigation";
import postgres from "prisma/postgres.db";

export default async function findById(id: string) {
  const response = await postgres.customer.findUnique({
    where: { id },
    include: includer.customer,
  });

  if (!response) notFound();

  return parseCustomer(response);
}
