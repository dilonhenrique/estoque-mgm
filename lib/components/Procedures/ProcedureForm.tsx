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
import { Form } from "../ui/forms/atoms/Form/Form";
import { AnyObject } from "@/types/types";

type ProcedureFormProps = {
  procedure?: Procedure;
};

type SimpleService = {
  id: string;
  name: string;
};

export default function ProcedureForm({ procedure }: ProcedureFormProps) {
  const router = useRouter();
  // const form = useRef<HTMLFormElement>(null);

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

  async function handleDone(formData: AnyObject) {
    if (procedure) {
      if (!confirm("Tem certeza?")) {
        return null;
      }

      if (procedure.done) {
        return await procedureService.unsetDone(procedure.id);
      } else {
        return await procedureAction.setDone(procedure.id, formData);
      }
    }
  }

  return (
    <Form
      id="procedure-form"
      className="w-full max-w-2xl flex flex-wrap gap-4 items-end"
      action={saveAction}
      defaultValues={procedure}
      beforeSubmit={async ({ event, methods, data }): Promise<boolean> => {
        if (event?.nativeEvent && "submitter" in event.nativeEvent) {
          const submitter = event?.nativeEvent.submitter as
            | HTMLButtonElement
            | undefined;

          if (submitter?.value === "setDone") {
            const response = await handleDone(data);

            if (!response) return false;

            router.refresh();
            console.log(response);
            if (response.success) {
              toast.success(response.message);
            } else {
              toast.error(response.message);

              Object.entries(response.fieldErrors).forEach(([name, error]) => {
                methods.setError(name as keyof Procedure, error);
              });
            }

            return false;
          }
        }

        return true;
      }}
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
              // onClick={handleDone}
              value="setDone"
              formTarget="procedure-form"
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
