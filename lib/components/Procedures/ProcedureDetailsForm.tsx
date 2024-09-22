"use client";

import { Procedure } from "@/types/schemas";
import ProductSelector from "../ProductSelector/ProductSelector";
import CustomerAutocomplete from "../ui/forms/custom/CustomerAutocomplete/CustomerAutocomplete";
import { Checkbox, DatePicker, Input } from "../ui/forms/fields";

type ProcedureFormProps = {
  procedure?: Partial<Procedure>;
};

export default function ProcedureDetailsForm({
  procedure,
}: ProcedureFormProps) {
  return (
    <>
      <Input
        name="name"
        label="Nome"
        placeholder="Nome do Procedimento"
        className="w-60 grow"
        defaultValue={procedure?.name}
        isDisabled={procedure?.done}
      />

      <CustomerAutocomplete
        name="customer.id"
        label="Cliente"
        placeholder="Escolha um cliente"
        allowsCustomValue
        className="w-60 grow"
        isDisabled={procedure?.done}
      />

      <DatePicker
        name="scheduled_for"
        label="Data do procedimento"
        className="w-60 grow"
        isDisabled={procedure?.done}
        granularity="minute"
        hideTimeZone
      />

      <Checkbox name="confirmed_by_customer" isDisabled={procedure?.done}>
        Confirmado
      </Checkbox>

      <div className="w-full">
        <h4 className="text-content4-foreground my-2">Produtos utilizados:</h4>

        <ProductSelector
          defaultValue={procedure?.products}
          isViewOnly={procedure?.done}
        />
      </div>
    </>
  );
}
