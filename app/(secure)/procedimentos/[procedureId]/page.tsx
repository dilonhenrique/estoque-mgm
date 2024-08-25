import { procedureService } from "@/backend/services/procedures";
import ProcedureForm from "@/components/Procedures/ProcedureForm";
import { notFound } from "next/navigation";

export default async function SingleCustomerPage({
  params,
}: {
  params: { procedureId: string };
}) {
  const { procedureId } = params;
  const procedure = await procedureService.findById(procedureId);

  if (!procedure.data) notFound();

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Editar procedimento</h2>
        <ProcedureForm procedure={procedure.data} />
      </div>
    </main>
  );
}
