"use server";

import { customerRepo } from "@/backend/repositories/customers";

export default async function remove(id: string) {
  return await customerRepo.remove(id);
}
