"use client";

import { Card, CardBody, DatePicker, Input, Switch } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "../../../types/types";
import { Procedure, Service } from "../../../types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import ProductSelector from "../ProductSelector/ProductSelector";
import { useState } from "react";
import { procedureService } from "@/backend/services/procedures";
import CustomerAutocomplete from "../ui/CustomerAutocomplete/CustomerAutocomplete";
import ServiceAutocomplete from "../ui/ServiceAutocomplete/ServiceAutocomplete";
import { parseAbsoluteToLocal } from "@internationalized/date";

type ProcedureFormProps = {
  procedure?: Procedure;
};

export default function ProcedureForm({ procedure }: ProcedureFormProps) {
  const router = useRouter();
  const [products, setProducts] = useState(procedure?.products ?? []);
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult<Procedure>);

  function onServiceChange(service?: Service) {
    if (service?.products) {
      setProducts(service.products);
    }
  }

  async function submitAction(status: MutationResult, formData: FormData) {
    const payload = {
      ...Object.fromEntries(formData),
      products: products?.map((item) => ({ id: item.id, qty: item.qty })) ?? [],
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

    return response;
  }

  return (
    <form
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      action={formAction}
      noValidate
    >
      <ServiceAutocomplete
        name="service_id"
        label="Serviço"
        placeholder="Escolha um serviço"
        defaultSelectedKey={procedure?.service?.id}
        className="w-60 grow"
        isInvalid={!!state.errors.service_id}
        errorMessage={state.errors.service_id}
        onServiceChange={onServiceChange}
      />

      <CustomerAutocomplete
        name="customer_id"
        label="Cliente"
        placeholder="Escolha um cliente"
        allowsCustomValue
        defaultSelectedKey={procedure?.customer?.id}
        className="w-60 grow"
        isInvalid={!!state.errors.customer_id}
        errorMessage={state.errors.customer_id}
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
        isInvalid={!!state.errors.scheduled_for}
        errorMessage={state.errors.scheduled_for}
        granularity="minute"
        hideTimeZone
      />

      <div className="col-span-full flex gap-4 flex-wrap">
        <Switch
          name="confirmed_by_customer"
          value="confirmed"
          defaultSelected={procedure?.confirmed_by_customer}
          className="col-span-full"
        >
          Agendamento confirmado pelo cliente
        </Switch>

        <Switch
          name="done"
          value="done"
          defaultSelected={procedure?.done}
          className="col-span-full"
        >
          Procedimento realizado
        </Switch>
      </div>

      <Card
        classNames={{
          base: "bg-transparent border border-content1 w-full px-2",
        }}
      >
        <CardBody>
          <h4 className="text-content4-foreground mb-2">
            Produtos utilizados:
          </h4>
          <ProductSelector value={products} onValueChange={setProducts} />
        </CardBody>
      </Card>

      <div className="w-full flex justify-end gap-4">
        {procedure && (
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
            Deletar serviço
          </FormButton>
        )}

        <SubmitButton type="submit" color="primary">
          {procedure ? "Atualizar" : "Cadastrar"}
        </SubmitButton>
      </div>
    </form>
  );
}
