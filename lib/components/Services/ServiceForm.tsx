"use client";

import { useRouter } from "next/navigation";
import { Service } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { serviceService } from "@/backend/services/services";
import ProductSelector from "../ProductSelector/ProductSelector";
import Input from "../ui/forms/atoms/Input/Input";
import { Form } from "../ui/forms/atoms/Form/Form";
import { serviceSchema } from "@/utils/validation/schema/service";
import { serviceAction } from "@/backend/actions/services";

type ServiceFormProps = {
  service?: Service;
};

export default function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();

  async function submit(formData: FormData | Service) {
    return service
      ? await serviceAction.update(service.id, formData)
      : await serviceAction.create(formData);
  }

  return (
    <Form
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      schema={service ? serviceSchema.update : serviceSchema.create}
      defaultValues={service}
      action={submit}
      onSuccess={(res) => {
        toast.success(res.message);
        if (!service) router.push("/servicos");
      }}
      onError={(res) => {
        if (res.response?.message) toast.error(res.response?.message);
      }}
    >
      <Input
        name="name"
        label="Nome do serviço"
        isRequired
        className="w-full"
      />

      <div className="w-full">
        <h4 className="text-content4-foreground mb-2">Produtos utilizados:</h4>
        <ProductSelector defaultValue={service?.products} />
      </div>

      <div className="w-full flex justify-end gap-4">
        {service && (
          <FormButton
            color="danger"
            variant="light"
            onClick={async () => {
              if (confirm("Tem certeza que deseja excluir este serviço?")) {
                const deleted = await serviceService.remove(service.id);
                if (deleted) router.push("/");
              }
            }}
          >
            Excluir
          </FormButton>
        )}

        <SubmitButton type="submit" color="primary">
          {service ? "Atualizar" : "Cadastrar"}
        </SubmitButton>
      </div>
    </Form>
  );
}
