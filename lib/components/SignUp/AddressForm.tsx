"use client";

import _ from "lodash";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import { ServiceResult } from "@/types/types";
import { cepService } from "@/backend/services/cep";
import { toast } from "sonner";
import { Input } from "../ui/forms/fields";

type IProps = {
  title: string;
};

export default function AddressForm({ title }: IProps) {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");

  const zipChange = _.debounce(async (val: string) => {
    if (val.length > 7) {
      const response = await cepService.search(val);

      if (!response.success) {
        return toast.error(response.error);
      }

      setCountry("Brasil");
      setState(response.data.uf);
      setCity(response.data.localidade);
      setNeighborhood(response.data.bairro);
      setStreet(response.data.logradouro);
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
          // isInvalid={!!formState.fieldErrors.zip_code}
          // errorMessage={formState.fieldErrors.zip_code}
        />
        <Input
          name="address.country"
          label="País"
          className="col-span-4"
          value={country}
          onValueChange={setCountry}
          // isInvalid={!!formState.fieldErrors.country}
          // errorMessage={formState.fieldErrors.country}
        />
        <Input
          name="address.state"
          label="Estado"
          className="col-span-2"
          value={state}
          onValueChange={setState}
          // isInvalid={!!formState.fieldErrors.state}
          // errorMessage={formState.fieldErrors.state}
        />
        <Input
          name="address.city"
          label="Cidade"
          className="col-span-6"
          value={city}
          onValueChange={setCity}
          // isInvalid={!!formState.fieldErrors.city}
          // errorMessage={formState.fieldErrors.city}
        />
        <Input
          name="address.neighborhood"
          label="Bairro"
          className="col-span-6"
          value={neighborhood}
          onValueChange={setNeighborhood}
          // isInvalid={!!formState.fieldErrors.neighborhood}
          // errorMessage={formState.fieldErrors.neighborhood}
        />
        <Input
          name="address.street"
          label="Endereço"
          className="col-span-6"
          value={street}
          onValueChange={setStreet}
          // isInvalid={!!formState.fieldErrors.street}
          // errorMessage={formState.fieldErrors.street}
        />
        <Input
          name="address.number"
          label="Número"
          className="col-span-6"
          // isInvalid={!!formState.fieldErrors.number}
          // errorMessage={formState.fieldErrors.number}
        />
        <Input
          name="address.complement"
          label="Complemento"
          className="col-span-6"
          // isInvalid={!!formState.fieldErrors.complement}
          // errorMessage={formState.fieldErrors.complement}
        />
      </CardBody>
    </Card>
  );
}
