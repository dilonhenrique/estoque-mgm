"use server"

import { categoryRepo } from "@/backend/repositories/categories"

export default async function remove(id: string){
  return await categoryRepo.remove(id);
}