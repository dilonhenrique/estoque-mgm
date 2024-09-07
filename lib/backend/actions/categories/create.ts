"use server";

import { categoryService } from "@/backend/services/categories";

export default async function create(name: string) {
  return await categoryService.create(name);
}
