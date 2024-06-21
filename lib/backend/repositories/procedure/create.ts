"use server";

import postgres from "prisma/postgres.db";
import { parseProduct } from "../products/parse";

export default async function create(payload: Payload) {
  // const response = await postgres.procedure.create({
  //   data:{
  //     customer_id: ''
  //   }
  // });
  return true;
}

type Payload = {
  id: string;
  increment: number;
}[];
