"use server";

import { categoryRepo } from "@/backend/repositories/categories";

export default async function update(id: string, name: string) {
  return await categoryRepo.update(id, name);
}
