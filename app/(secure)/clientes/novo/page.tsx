import CustomerForm from "@/components/Customer/CustomerForm";

export default async function SingleCustomerPage() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Cadastrar cliente</h2>
        <CustomerForm />
      </div>
    </main>
  );
}
