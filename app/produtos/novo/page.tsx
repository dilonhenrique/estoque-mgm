import { productActions } from "@/backend/actions/products";
import ProductForm from "@/components/Product/ProductForm";

export default async function SingleProductPage() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h1 className="text-xl font-bold">Cadastre seu produto</h1>
        <ProductForm actionFn={productActions.create} />
      </div>
    </main>
  );
}
