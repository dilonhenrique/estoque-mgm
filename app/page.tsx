import { productActions } from "@/backend/actions/products";
import ProductList from "@/components/Product/ProductList";
import { getSessionUser } from "@/utils/authUtils";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
  const products = await productActions.search();
  const user = await getSessionUser();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 justify-between">
        <h1 className="text-2xl font-bold text-primary mb-4">
          Olá, {user?.name}
        </h1>

        <Button color="primary" as={Link} href="/products/new">
          Novo
        </Button>
      </div>

      <ProductList products={products.data ?? []} />
    </main>
  );
}
