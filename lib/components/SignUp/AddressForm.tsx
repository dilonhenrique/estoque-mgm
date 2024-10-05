"use client";

import _ from "lodash";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { cepService } from "@/backend/services/cep";
import { toast } from "sonner";
import { Input } from "../ui/forms/fields";
import { useFormContext } from "react-hook-form";

type IProps = {
  title: string;
};

export default function AddressForm({ title }: IProps) {
  const methods = useFormContext();

  const zipChange = _.debounce(async (val: string) => {
    if (val.length > 7) {
      const response = await cepService.search(val);

      if (!response.success) {
        return toast.error(response.error);
      }

      methods.setValue("address.country", "Brasil");
      methods.setValue("address.state", response.data.uf);
      methods.setValue("address.city", response.data.localidade);
      methods.setValue("address.neighborhood", response.data.bairro);
      methods.setValue("address.street", response.data.logradouro);
    }
  }, 500);

  return (
    <Card>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-2">
        <Input
          name="address.zip_code"
          label="CEP"
          className="max-w-md col-span-12"
          onValueChange={zipChange}
        />
        <Input name="address.country" label="País" className="col-span-4" />
        <Input name="address.state" label="Estado" className="col-span-2" />
        <Input name="address.city" label="Cidade" className="col-span-6" />
        <Input
          name="address.neighborhood"
          label="Bairro"
          className="col-span-6"
        />
        <Input name="address.street" label="Endereço" className="col-span-6" />
        <Input name="address.number" label="Número" className="col-span-6" />
        <Input
          name="address.complement"
          label="Complemento"
          className="col-span-6"
        />
      </CardBody>
    </Card>
  );
}
