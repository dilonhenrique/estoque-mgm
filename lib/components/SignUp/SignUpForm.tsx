"use client";

import _ from "lodash";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { SubmitButton } from "../ui/FormButton";
import { useRouter } from "next/navigation";
import { AnyObject } from "@/types/types";
import { toast } from "sonner";
import { Key, useState } from "react";
import { Form } from "../ui/forms/fields";
import { accountAction } from "@/backend/actions/accounts";
import { FormProvider } from "react-hook-form";
import { CheckCircle, Circle } from "lucide-react";
import { useSignUpValidate } from "./useSignUpValidate";

type Props = {
  defaultUserValues?: {
    img_url?: string;
    name?: string;
    email?: string;
  };
};

type TabTitleProps = {
  step: number;
  title: string;
};

export default function SignUpForm({ defaultUserValues = {} }: Props) {
  const router = useRouter();
  const { validateStep, validSteps, disabledKeys, methods } =
    useSignUpValidate();

  const [active, _setActive] = useState(1);
  function setActive(val: number) {
    if (val < active || validateStep(active)) _setActive(val);
  }

  async function submitAction(formData: FormData | AnyObject) {
    return await accountAction.create(formData);
  }

  function nextTab() {
    if (active >= 3) return;
    setActive(active + 1);
  }

  function prevTab() {
    if (active <= 1) return;
    setActive(active - 1);
  }

  function handleSelectionChange(val: Key) {
    if (typeof val === "string") {
      const num = Number(val.split("_")[0]);
      setActive(num);
    }
  }

  function TabTitle({ step, title }: TabTitleProps) {
    return (
      <p className="flex gap-2 items-center">
        {validSteps.includes(step) ? <CheckCircle /> : <Circle />} {title}
      </p>
    );
  }

  return (
    <FormProvider {...methods}>
      <Form
        className="w-full gap-4 flex flex-col"
        action={submitAction}
        defaultValues={{
          user: defaultUserValues,
        }}
        onSuccess={(res) => {
          toast.success(res.message);
          router.push("/auth/login");
        }}
        onError={(res) => {
          if (res.response?.message) toast.error(res.response?.message);
        }}
      >
        <Tabs
          destroyInactiveTabPanel={false}
          color="primary"
          radius="full"
          selectedKey={active + "_tab"}
          onSelectionChange={handleSelectionChange}
          disabledKeys={disabledKeys}
        >
          <Tab
            key={1 + "_tab"}
            title={<TabTitle title="Dados profissionais" step={1} />}
          >
            <AccountForm title="Dados profissionais" />
          </Tab>

          <Tab
            key={2 + "_tab"}
            title={<TabTitle title="Endereço comercial" step={2} />}
          >
            <AddressForm title="Endereço comercial" />
          </Tab>

          <Tab key={3 + "_tab"} title={<TabTitle title="Usuário" step={3} />}>
            <UserForm title="Usuário" />
          </Tab>
        </Tabs>

        <div className="flex gap-4 justify-end col-span-full">
          {active > 1 && <Button onPress={prevTab}>Voltar</Button>}

          {active >= 3 ? (
            <SubmitButton color="primary" variant="shadow">
              Cadastrar
            </SubmitButton>
          ) : (
            <Button onPress={nextTab}>Próxima</Button>
          )}
        </div>
      </Form>
    </FormProvider>
  );
}
