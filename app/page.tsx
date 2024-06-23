import { getSessionUser } from "@/utils/authUtils";

export default async function Home() {
  // const products = await productService.search();
  const user = await getSessionUser();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 justify-between items-center mb-4">
        <h1>Olá, {user?.name}</h1>

        {/* <Button color="primary" as={Link} href="/produtos/novo">
          Adicionar produto
        </Button> */}
      </div>

      {/* <ProductList products={products.data?.items ?? []} /> */}
    </main>
  );
}
