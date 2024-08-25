import ServiceForm from "@/components/Services/ServiceForm";

export default async function SingleServicePage() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Cadastrar serviço</h2>
        <ServiceForm />
      </div>
    </main>
  );
}
