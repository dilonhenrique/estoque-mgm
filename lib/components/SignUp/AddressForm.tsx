"use client";

import _ from "lodash";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import { MutationResult } from "@/types/types";
import { cepService } from "@/backend/services/cep";
import { toast } from "sonner";
import Input from "../ui/forms/atoms/Input/Input";

type IProps = {
  title: string;
  formState: MutationResult;
};

export default function AddressForm({ title, formState }: IProps) {
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
          name="zip_code"
          label="CEP"
          className="max-w-md col-span-12"
          onValueChange={zipChange}
          isInvalid={!!formState.errors.zip_code}
          errorMessage={formState.errors.zip_code}
        />
        <Input
          name="country"
          label="País"
          className="col-span-4"
          value={country}
          onValueChange={setCountry}
          isInvalid={!!formState.errors.country}
          errorMessage={formState.errors.country}
        />
        <Input
          name="state"
          label="Estado"
          className="col-span-2"
          value={state}
          onValueChange={setState}
          isInvalid={!!formState.errors.state}
          errorMessage={formState.errors.state}
        />
        <Input
          name="city"
          label="Cidade"
          className="col-span-6"
          value={city}
          onValueChange={setCity}
          isInvalid={!!formState.errors.city}
          errorMessage={formState.errors.city}
        />
        <Input
          name="neighborhood"
          label="Bairro"
          className="col-span-6"
          value={neighborhood}
          onValueChange={setNeighborhood}
          isInvalid={!!formState.errors.neighborhood}
          errorMessage={formState.errors.neighborhood}
        />
        <Input
          name="street"
          label="Endereço"
          className="col-span-6"
          value={street}
          onValueChange={setStreet}
          isInvalid={!!formState.errors.street}
          errorMessage={formState.errors.street}
        />
        <Input
          name="number"
          label="Número"
          className="col-span-6"
          isInvalid={!!formState.errors.number}
          errorMessage={formState.errors.number}
        />
        <Input
          name="complement"
          label="Complemento"
          className="col-span-6"
          isInvalid={!!formState.errors.complement}
          errorMessage={formState.errors.complement}
        />
      </CardBody>
    </Card>
  );
}
