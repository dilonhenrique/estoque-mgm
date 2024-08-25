import ProcedureForm from "@/components/Procedures/ProcedureForm";

export default async function SingleServicePage() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Cadastrar procedimento</h2>
        <ProcedureForm />
      </div>
    </main>
  );
}
