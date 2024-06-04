import { productActions } from "@/backend/actions/products";
import ProductForm from "@/components/Product/ProductForm";
import { notFound } from "next/navigation";

export default async function SingleProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = await productActions.findById(productId);

  if (!product.data) notFound();

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h1 className="text-xl font-bold">Edite seu produto</h1>
        <ProductForm product={product.data} />
      </div>
    </main>
  );
}
