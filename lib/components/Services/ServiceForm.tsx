"use client";

import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "../../../types/types";
import { Service } from "../../../types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { serviceService } from "@/backend/services/services";

type ServiceFormProps = {
  service?: Service;
};

export default function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult<Service>);

  async function submitAction(status: MutationResult, formData: FormData) {
    const response = service
      ? await serviceService.update(service.id, formData)
      : await serviceService.create(formData);

    if (response.success) {
      toast.success("Salvo com sucesso!");

      if (!service) {
        router.push("/servicos");
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
      <Input
        name="name"
        label="Nome do serviço"
        defaultValue={service?.name}
        isRequired
        className="w-full"
        isInvalid={!!state.errors.name}
        errorMessage={state.errors.name}
      />

      <div className="w-full flex justify-end gap-4">
        {service && (
          <FormButton
            color="danger"
            variant="light"
            onClick={async () => {
              if (confirm("Tem certeza que deseja excluir este cliente?")) {
                const deleted = await serviceService.remove(service.id);
                if (deleted) router.push("/");
              }
            }}
          >
            Deletar serviço
          </FormButton>
        )}

        <SubmitButton type="submit" color="primary">
          {service ? "Atualizar" : "Cadastrar"}
        </SubmitButton>
      </div>
    </form>
  );
}
