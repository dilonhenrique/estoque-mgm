"use server"

import { categoryRepo } from "@/backend/repositories/categories"

export default async function findById(id: string){
  return await categoryRepo.findById(id);
}