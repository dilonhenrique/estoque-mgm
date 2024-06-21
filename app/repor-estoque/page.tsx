import { productService } from "@/backend/services/products";
import RenewStockList from "@/components/RenewStock/RenewStockList";

export default async function RenewStock() {
  const products = await productService.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 justify-between items-center mb-4">
        <h1>Repor estoque:</h1>
      </div>
      {!products.data?.items.length ? (
        <>Você não possui produtos cadastrados</>
      ) : (
        <RenewStockList products={products.data.items} />
      )}
    </main>
  );
}
