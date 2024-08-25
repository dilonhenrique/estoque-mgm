import { productService } from "@/backend/services/products";
import ProductLogList from "@/components/Product/logs/ProductLogList";
import { notFound } from "next/navigation";

export default async function ProductLogsPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await productService.findById(params.productId);

  if (!product.data) notFound();

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4">
        <h2>Logs do Produto: {product.data.name}</h2>
        <ProductLogList logs={product.data.logs ?? []} />
      </div>
    </main>
  );
}
