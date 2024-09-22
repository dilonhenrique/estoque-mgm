"use client";

import { useRouter } from "next/navigation";
import { Procedure, Service } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { useState } from "react";
import { procedureService } from "@/backend/services/procedures";
import ServiceAutocomplete from "../ui/forms/custom/ServiceAutocomplete/ServiceAutocomplete";
import { SquareCheckBig, SquareX } from "lucide-react";
import ProcedureDetailsForm from "./ProcedureDetailsForm";
import { procedureAction } from "@/backend/actions/procedures";
import { Form } from "../ui/forms/fields";

type ProcedureFormProps = {
  procedure?: Procedure;
};

type SimpleService = {
  id: string;
  name: string;
};

export default function ProcedureForm({ procedure }: ProcedureFormProps) {
  const router = useRouter();

  const [service, setService] = useState<Service | SimpleService | undefined>(
    procedure?.service
  );

  function onServiceChange(selectedService?: Service) {
    if (selectedService === undefined) return setService(undefined);

    if (
      !service ||
      (service &&
        confirm(
          `Substituir dados atuais pelos pré definidos no Serviço: ${selectedService.name}?`
        ))
    ) {
      setService(selectedService);
    }
  }

  async function saveAction(formData: FormData | Procedure) {
    return procedure
      ? await procedureAction.update(procedure.id, formData)
      : await procedureAction.create(formData);
  }

  async function doneAction(formData: FormData | Procedure) {
    return procedure?.done
      ? await procedureAction.unsetDone(procedure.id)
      : await procedureAction.setDone(procedure?.id ?? "", formData);
  }

  return (
    <Form
      id="procedure-form"
      className="w-full max-w-2xl flex flex-wrap gap-4 items-end"
      action={{
        upsert: saveAction,
        done: doneAction,
      }}
      defaultValues={procedure}
      onSuccess={(res) => {
        toast.success(res.message);

        if (!procedure) {
          router.push("/procedimentos");
        }
      }}
      onError={(res) => {
        if (res.response?.message) toast.error(res.response?.message);
      }}
    >
      <ServiceAutocomplete
        name="service.id"
        label="Tipo de Serviço"
        placeholder="Escolha um serviço"
        addCustomOption
        defaultSelectedKey={procedure?.service?.id}
        className="w-full grow"
        onServiceChange={onServiceChange}
        isDisabled={procedure?.done}
      />

      {service && (
        <ProcedureDetailsForm
          key={`procedure-details-${service.id}`}
          procedure={{
            ...procedure,
            name: service.name,
            products:
              "products" in service ? service.products : procedure?.products,
          }}
        />
      )}

      <div className="w-full flex justify-end gap-4">
        {procedure && (
          <>
            {!procedure.done && (
              <FormButton
                color="danger"
                variant="light"
                onClick={async () => {
                  if (
                    confirm("Tem certeza que deseja excluir este procedimento?")
                  ) {
                    const deleted = await procedureService.remove(procedure.id);
                    if (deleted) router.push("/");
                  }
                }}
              >
                Excluir
              </FormButton>
            )}

            <FormButton
              type="submit"
              startContent={procedure.done ? <SquareX /> : <SquareCheckBig />}
              formTarget="procedure-form"
              value="done"
            >
              {procedure.done
                ? "Desmarcar como Realizado"
                : "Marcar como Realizado"}
            </FormButton>
          </>
        )}

        {!procedure?.done && (
          <SubmitButton
            color="primary"
            isDisabled={procedure?.done}
            formTarget="procedure-form"
          >
            {procedure ? "Atualizar" : "Cadastrar"}
          </SubmitButton>
        )}
      </div>
    </Form>
  );
}
