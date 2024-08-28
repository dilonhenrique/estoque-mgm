import { productService } from "@/backend/services/products";
import ProductList from "@/components/Product/ProductList";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await productService.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 items-center mb-4">
        <h1>Produtos:</h1>

        <div className="flex gap-4 ms-auto">
          <Button
            color="primary"
            variant="light"
            as={Link}
            href="/repor-estoque"
          >
            Repor estoque
          </Button>
          <Button color="primary" as={Link} href="/produtos/novo">
            Novo produto
          </Button>
        </div>
      </div>

      <ProductList products={products.data?.items ?? []} />
    </main>
  );
}
