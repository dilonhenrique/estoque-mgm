"use server";

import { categoryService } from "@/backend/services/categories";
import { string } from "zod";

export async function resolveCategoryId(category?: {
  id?: string | null;
  name?: string;
}) {
  if (!category) return undefined;
  if (category.id && isUUID(category.id)) return category.id;

  if (!category.name) return undefined;

  const response = await categoryService.create(category.name);
  return response.data?.id;
}

function isUUID(val?: string) {
  return !!val && string().uuid().safeParse(val).success;
}
