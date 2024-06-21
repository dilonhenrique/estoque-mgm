"use server";

import postgres from "prisma/postgres.db";
import { ProductCategory } from "../../../../types/schemas";

export default async function create({
  name,
  account_id,
}: Payload): Promise<ProductCategory> {
  const found = await postgres.productCategory.findFirst({
    where: { account_id, name },
  });

  let response: ProductCategory;

  if (found?.id) {
    response = await postgres.productCategory.update({
      where: { id: found?.id },
      data: { name },
    });
  } else {
    response = await postgres.productCategory.create({
      data: { name, account_id },
    });
  }

  return response;
}

type Payload = {
  name: string;
  account_id: string;
};
