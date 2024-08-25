import { productService } from "@/backend/services/products";
import ModalProductLog from "@/components/Product/logs/ModalProductLog";
import { notFound } from "next/navigation";

export default async function ProductLogModal({
  params,
}: {
  params: { productId: string };
}) {
  const product = await productService.findById(params.productId);

  if (!product.data) notFound();

  return <ModalProductLog product={product.data} />;
}
