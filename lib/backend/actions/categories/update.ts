"use server";

import { categoryService } from "@/backend/services/categories";

export default async function update(id: string, name: string) {
  return await categoryService.update(id, name);
}
