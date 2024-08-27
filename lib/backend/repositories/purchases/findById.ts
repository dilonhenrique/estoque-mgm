"use server";

import { includer } from "@/utils/includer";
import { parsePurchase } from "@/utils/parser/purchase";
import { notFound } from "next/navigation";
import postgres from "prisma/postgres.db";

export default async function findById(id: string) {
  const response = await postgres.purchase.findUnique({
    where: { id },
    include: includer.purchaseWithLog,
  });

  if (!response) notFound();

  return parsePurchase(response);
}
