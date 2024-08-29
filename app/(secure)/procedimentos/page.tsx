import { procedureService } from "@/backend/services/procedures";
import ProcedureList from "@/components/Procedures/ProcedureList";
import Icon from "@/components/ui/Icon/Icon";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function CustomersPage() {
  const procedures = await procedureService.search();

  return (
    <main className="p-8">
      <div className="w-full flex gap-4 items-center mb-4">
        <h1 className="flex gap-2">
          <Icon value="procedure" className="text-3xl" strokeWidth={1.2} />{" "}
          Procedimentos:
        </h1>

        <div className="flex gap-4 ms-auto">
          <Button color="primary" as={Link} href="/procedimentos/novo">
            Novo procedimento
          </Button>
        </div>
      </div>

      <ProcedureList procedures={procedures.data?.items ?? []} />
    </main>
  );
}
