"use client";

import {
  Card,
  CardBody,
  Checkbox,
  DatePicker,
  Switch,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MutationResult } from "../../../types/types";
import { Procedure, Service } from "../../../types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import ProductSelector from "../ProductSelector/ProductSelector";
import { FormEvent, useRef, useState } from "react";
import { procedureService } from "@/backend/services/procedures";
import CustomerAutocomplete from "../ui/CustomerAutocomplete/CustomerAutocomplete";
import ServiceAutocomplete from "../ui/ServiceAutocomplete/ServiceAutocomplete";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { SquareCheckBig, SquareX } from "lucide-react";

type ProcedureFormProps = {
  procedure?: Procedure;
};

export default function ProcedureForm({ procedure }: ProcedureFormProps) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const [products, setProducts] = useState(procedure?.products ?? []);
  const [formState, setFormState] = useState({
    success: true,
    errors: {},
  } as MutationResult<Procedure | null>);

  function onServiceChange(service?: Service) {
    if (service?.products) {
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
        label="Serviço"
        placeholder="Escolha um serviço"
        defaultSelectedKey={procedure?.service?.id}
        className="w-60 grow"
        isInvalid={!!formState.errors.service_id}
        errorMessage={formState.errors.service_id}
        onServiceChange={onServiceChange}
        isDisabled={procedure?.done}
      />

      <CustomerAutocomplete
        name="customer_id"
        label="Cliente"
        placeholder="Escolha um cliente"
        allowsCustomValue
        defaultSelectedKey={procedure?.customer?.id}
        className="w-60 grow"
        isInvalid={!!formState.errors.customer_id}
        errorMessage={formState.errors.customer_id}
        isDisabled={procedure?.done}
      />

      <DatePicker
        name="scheduled_for"
        label="Data do procedimento"
        defaultValue={
          procedure?.scheduled_for
            ? parseAbsoluteToLocal(procedure.scheduled_for.toISOString())
            : undefined
        }
        className="w-60 grow"
        isInvalid={!!formState.errors.scheduled_for}
        errorMessage={formState.errors.scheduled_for}
        isDisabled={procedure?.done}
        granularity="minute"
        hideTimeZone
      />

      {/* <div className="w-full"> */}
      <Checkbox
        name="confirmed_by_customer"
        value="confirmed"
        defaultSelected={procedure?.confirmed_by_customer}
        isDisabled={procedure?.done}
      >
        Confirmado
      </Checkbox>
      {/* </div> */}

      <div className="w-full">
        <h4 className="text-content4-foreground mb-2">Produtos utilizados:</h4>

        <ProductSelector
          value={products}
          onValueChange={setProducts}
          isViewOnly={procedure?.done}
        />
      </div>

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
