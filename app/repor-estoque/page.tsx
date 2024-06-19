import { productActions } from "@/backend/actions/products";
import RenewStockList from "@/components/RenewStock/RenewStockList";

export default async function RenewStock() {
  const products = await productActions.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">Repor estoque:</h1>
      </div>
      {!products.data?.items.length ? (
        <>Você não possui produtos cadastrados</>
      ) : (
        <RenewStockList products={products.data.items} />
      )}
    </main>
  );
}
