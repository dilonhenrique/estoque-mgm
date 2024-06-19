"use server";

export default async function updateStock(
  id: string,
  account_id: string,
  increment: number
) {
  // const response = await (await db()).collection<Product>("products").updateOne(
  //   {
  //     _id: new ObjectId(id),
  //     userId: userId,
  //   },
  //   { $inc: { stock: increment } }
  // );

  return true;
}
