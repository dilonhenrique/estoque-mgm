"use server";

import { categoryService } from "@/backend/services/categories";
import { string } from "zod";

export async function resolveCategoryId(category?: string) {
  if (!category || isUUID(category)) return category;

  const response = await categoryService.create(category);
  return response.id;
}

function isUUID(val?: string) {
  return !!val && string().uuid().safeParse(val).success;
}
