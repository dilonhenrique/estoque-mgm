import { productService } from "@/backend/services/products";
import ProductForm from "@/components/Product/ProductForm";
import { notFound } from "next/navigation";

export default async function SingleProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = await productService.findById(productId);

  if (!product.data) notFound();

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Edite seu produto</h2>
        <ProductForm product={product.data} actionFn={productService.update} />
      </div>
    </main>
  );
}
