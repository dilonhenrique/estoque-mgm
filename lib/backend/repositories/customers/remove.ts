"use server";

import { includer } from "@/utils/includer";
import { parseCustomer } from "@/utils/parser/customer";
import { notFound } from "next/navigation";
import postgres from "prisma/postgres.db";

export default async function remove(id: string) {
  const response = await postgres.customer.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
    include: includer.customer,
  });

  if (!response) notFound();

  return parseCustomer(response);
}
