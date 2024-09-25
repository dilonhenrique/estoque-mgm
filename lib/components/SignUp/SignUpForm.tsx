"use client";

import { Button, Tab, Tabs } from "@nextui-org/react";
import { SubmitButton } from "../ui/FormButton";
import { useRouter, useSearchParams } from "next/navigation";
import { AnyObject } from "@/types/types";
import { toast } from "sonner";
import _ from "lodash";
import AddressForm from "./AddressForm";
import AccountForm from "./AccountForm";
import UserForm from "./UserForm";
import { Key, useMemo, useState } from "react";
import { useFormCustom } from "../ui/forms/fields/Form/useFormCustom";
import { Form } from "../ui/forms/fields";
import { accountAction } from "@/backend/actions/accounts";
import { signupSchema } from "@/utils/validation/schema/signup";
import { parseErrorSchema } from "@/utils/formResolver/zodResolver";
import { FormProvider } from "react-hook-form";

const stepToName = new Map([
  [1, "account"],
  [2, "address"],
  [3, "user"],
]);

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const methods = useFormCustom({ schema: signupSchema });

  const [active, _setActive] = useState(1);
  function setActive(val: number) {
    if (val < active || validateStep(active)) _setActive(val);
  }

  function validateStep(step: number): boolean {
    methods.clearErrors();
    
    const activeKey = stepToName.get(step) as keyof typeof signupSchema.shape;
    const activeSchema = signupSchema.pick({ [activeKey]: true } as any);

    const data = methods.getValues();
    const validation = activeSchema.safeParse(data);

    if (validation.success) return true;

    Object.entries(parseErrorSchema(validation.error.errors, true)).forEach(
      ([name, error]) => {
        methods.control.setError(name, error);
      }
    );
    
    router.refresh();
    return false;
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

  const disabledKeys = useMemo(
    () =>
      [1, 2, 3].filter((step) => step > active).map((step) => step + "_tab"),
    [active]
  );

  return (
    <FormProvider {...methods}>
      <Form
        className="w-full gap-4 flex flex-col"
        action={submitAction}
        defaultValues={{
          user: {
            img_url: params.img_url,
            name: params.name,
            email: params.email,
          },
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
          // disabledKeys={disabledKeys}
        >
          <Tab key={1 + "_tab"} title="1. Dados profissionais">
            <AccountForm title="1. Dados profissionais" />
          </Tab>

          <Tab key={2 + "_tab"} title="2. Endereço comercial">
            <AddressForm title="2. Endereço comercial" />
          </Tab>

          <Tab key={3 + "_tab"} title="3. Usuário">
            <UserForm title="3. Usuário" />
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
