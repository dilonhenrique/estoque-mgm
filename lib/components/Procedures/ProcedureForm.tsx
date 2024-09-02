"use client";

import { useRouter } from "next/navigation";
import { MutationResult } from "@/types/types";
import { Procedure, Service } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { FormEvent, useRef, useState } from "react";
import { procedureService } from "@/backend/services/procedures";
import ServiceAutocomplete from "../ui/forms/custom/ServiceAutocomplete/ServiceAutocomplete";
import { SquareCheckBig, SquareX } from "lucide-react";
import ProcedureDetailsForm from "./ProcedureDetailsForm";

type ProcedureFormProps = {
  procedure?: Procedure;
};

export default function ProcedureForm({ procedure }: ProcedureFormProps) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const [hasDetails, setHasDetails] = useState(!!procedure);
  const [products, setProducts] = useState(procedure?.products ?? []);
  const [name, setName] = useState(procedure?.name ?? "");

  const [formState, setFormState] = useState({
    success: true,
    errors: {},
  } as MutationResult<Procedure | null>);

  function onServiceChange(service?: Service) {
    if (service === undefined) return setHasDetails(false);

    setHasDetails(true);

    if (
      !hasDetails ||
      (hasDetails &&
        confirm(
          `Substituir dados atuais pelos pré definidos no Serviço: ${service.name}?`
        ))
    ) {
      setName(service.name);
      setProducts(service.products);
    }
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(form.current ?? ev.currentTarget);
    const payload = {
      ...Object.fromEntries(formData),
      products,
    };

    const response = procedure
      ? await procedureService.update(procedure.id, payload)
      : await procedureService.create(payload);

    if (response.success) {
      toast.success("Salvo com sucesso!");

      if (!procedure) {
        router.push("/procedimentos");
      }
    } else {
      toast.error("Confira os campos e tente novamente");
    }

    setFormState(response);
  }

  async function handleDone() {
    if (form.current && procedure && confirm("Tem certeza?")) {
      if (procedure.done) {
        await procedureService.unsetDone(procedure.id);
      } else {
        const formData = new FormData(form.current);
        const payload = {
          ...Object.fromEntries(formData),
          products,
        };

        const response = await procedureService.setDone(procedure.id, payload);
        setFormState(response);
      }
      router.refresh();
    }
  }

  return (
    <form
      ref={form}
      className="w-full max-w-2xl flex flex-wrap gap-4 items-end"
      onSubmit={onSubmit}
      noValidate
    >
      <ServiceAutocomplete
        name="service_id"
        label="Tipo de Serviço"
        placeholder="Escolha um serviço"
        customService
        defaultSelectedKey={procedure?.service?.id}
        className="w-full grow"
        isInvalid={!!formState.errors.service_id}
        errorMessage={formState.errors.service_id}
        onServiceChange={onServiceChange}
        isDisabled={procedure?.done}
      />

      {hasDetails && (
        <ProcedureDetailsForm
          procedure={{ ...procedure, name, products }}
          formState={formState}
          productState={[products, setProducts]}
          nameState={[name, setName]}
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
              // variant="flat"
              startContent={procedure.done ? <SquareX /> : <SquareCheckBig />}
              onClick={handleDone}
            >
              {procedure.done
                ? "Desmarcar como Realizado"
                : "Marcar como Realizado"}
            </FormButton>
          </>
        )}

        {!procedure?.done && (
          <SubmitButton
            type="submit"
            color="primary"
            isDisabled={procedure?.done}
          >
            {procedure ? "Atualizar" : "Cadastrar"}
          </SubmitButton>
        )}
      </div>
    </form>
  );
}
