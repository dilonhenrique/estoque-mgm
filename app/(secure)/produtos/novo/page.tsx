import { productService } from "@/backend/services/products";
import ProductForm from "@/components/Product/ProductForm";

export default async function SingleProductPage() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Cadastrar produto</h2>
        <ProductForm />
      </div>
    </main>
  );
}
