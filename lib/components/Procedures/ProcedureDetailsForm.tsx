"use client";

import { MutationResult } from "@/types/types";
import { Procedure, ProductWithQty } from "@/types/schemas";
import ProductSelector from "../ProductSelector/ProductSelector";
import { Dispatch, SetStateAction } from "react";
import CustomerAutocomplete from "../ui/forms/custom/CustomerAutocomplete/CustomerAutocomplete";
import Input from "../ui/forms/atoms/Input/Input";
import Checkbox from "../ui/forms/atoms/Checkbox/Checkbox";
import DatePicker from "../ui/forms/atoms/DatePicker/DatePicker";

type ProcedureFormProps = {
  procedure?: Partial<Procedure>;
  formState: MutationResult<Procedure | null>;
  productState: [ProductWithQty[], Dispatch<SetStateAction<ProductWithQty[]>>];
  nameState: [string, Dispatch<SetStateAction<string>>];
};

export default function ProcedureDetailsForm({
  procedure,
  formState,
  productState,
  nameState,
}: ProcedureFormProps) {
  const [products, setProducts] = productState;
  const [name, setName] = nameState;

  return (
    <>
      <Input
        name="name"
        label="Nome"
        placeholder="Nome do Procedimento"
        className="w-60 grow"
        value={name}
        onValueChange={setName}
        isInvalid={!!formState.errors.customer_id}
        errorMessage={formState.errors.customer_id}
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
        defaultValue={procedure?.scheduled_for}
        className="w-60 grow"
        isInvalid={!!formState.errors.scheduled_for}
        errorMessage={formState.errors.scheduled_for}
        isDisabled={procedure?.done}
        granularity="minute"
        hideTimeZone
      />

      <Checkbox
        name="confirmed_by_customer"
        value="confirmed"
        defaultSelected={procedure?.confirmed_by_customer}
        isDisabled={procedure?.done}
      >
        Confirmado
      </Checkbox>

      <div className="w-full">
        <h4 className="text-content4-foreground my-2">Produtos utilizados:</h4>

        <ProductSelector
          value={products}
          onValueChange={setProducts}
          isViewOnly={procedure?.done}
        />
      </div>
    </>
  );
}
