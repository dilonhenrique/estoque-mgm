"use client";

import { Button, Tab, Tabs } from "@nextui-org/react";
import { SubmitButton } from "../ui/FormButton";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { ServiceResult } from "@/types/types";
import { accountService } from "@/backend/services/accounts";
import { toast } from "sonner";
import _ from "lodash";
import AddressForm from "./AddressForm";
import AccountForm from "./AccountForm";
import UserForm from "./UserForm";
import { useState } from "react";

export default function SignUpForm() {
  const [active, setActive] = useState("account");

  const router = useRouter();
  const [formState, formAction] = useFormState(submitAction, {
    success: true,
    fieldErrors: {},
  } as ServiceResult);

  async function submitAction(status: ServiceResult, formData: FormData) {
    const response = await accountService.create(formData);

    if (response.success) {
      toast.success("Conta criada com sucesso!");
      router.push("/auth/login");
    } else {
      toast.error("Confira os campos e tente novamente");
    }

    return response;
  }

  function nextTab() {
    if (active === "account") setActive("address");
    if (active === "address") setActive("user");
  }

  function prevTab() {
    if (active === "user") setActive("address");
    if (active === "address") setActive("account");
  }

  return (
    <form className="w-full gap-4 flex flex-col" action={formAction} noValidate>
      <Tabs
        destroyInactiveTabPanel={false}
        color="primary"
        radius="full"
        selectedKey={active}
        onSelectionChange={(val) => typeof val === "string" && setActive(val)}
      >
        <Tab key="account" title="1. Dados profissionais">
          <AccountForm title="1. Dados profissionais" formState={formState} />
        </Tab>

        <Tab key="address" title="2. Endereço comercial">
          <AddressForm title="2. Endereço comercial" formState={formState} />
        </Tab>

        <Tab key="user" title="3. Usuário">
          <UserForm title="3. Usuário" formState={formState} />
        </Tab>
      </Tabs>

      <div className="flex gap-4 justify-end col-span-full">
        {active !== "account" && <Button onPress={prevTab}>Voltar</Button>}

        {active === "user" ? (
          <SubmitButton color="primary" variant="shadow">
            Cadastrar
          </SubmitButton>
        ) : (
          <Button onPress={nextTab}>Próxima</Button>
        )}
      </div>
    </form>
  );
}
