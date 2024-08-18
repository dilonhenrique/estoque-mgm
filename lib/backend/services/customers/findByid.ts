"use server";

import { customerRepo } from "@/backend/repositories/customers";

export default async function findById(id: string) {
  return await customerRepo.findById(id);
}
