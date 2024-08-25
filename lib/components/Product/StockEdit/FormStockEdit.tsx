import { Button, Chip, Select, SelectItem } from "@nextui-org/react";
import { Product } from "../../../../types/schemas";
import { LogCause } from "@prisma/client";
import { logCause } from "@/utils/locale/logCause";
import IncreaserInput from "../../ui/IncreaserInput/IncreaserInput";
import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, MinusCircle } from "lucide-react";
import { getNumberColor } from "@/utils/getNumberColor";
import { useFormState } from "react-dom";
import { MutationResult } from "../../../../types/types";
import { logService } from "@/backend/services/logs";
import { toast } from "sonner";
import { SubmitButton } from "@/components/ui/FormButton";

type Props = {
  product: Product;
  closeModal?: () => void;
};

export default function FormStockEdit({
  product,
  closeModal = () => {},
}: Props) {
  const [stock, setStock] = useState(product.stock);
  const qty = stock - product.stock;
  const QtyIcon = getNumberColor.icon(qty);

  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult);

  async function submitAction(status: MutationResult, formData: FormData) {
    const data = {
      ...Object.fromEntries(formData),
      qty: String(qty),
      product_id: product.id,
    };
    const response = await logService.createAndUpdateProduct(data);

    if (response.success) {
      toast.success("Estoque alterado com sucesso!");
      closeModal();
    } else {
      toast.error("Confira os campos e tente novamente");
    }

    return response;
  }

  return (
    <form className="flex flex-col gap-4" action={formAction} noValidate>
      <Select
        name="cause"
        label="Motivo"
        labelPlacement="outside"
        placeholder="Selecione o motivo"
        isInvalid={!!state.errors.cause}
        errorMessage={state.errors.cause}
        items={Object.values(LogCause).map((item) => ({
          value: item,
          label: logCause.get(item),
        }))}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>

      <div className="flex gap-4 items-baseline">
        <IncreaserInput
          name="new_stock"
          label="Novo estoque:"
          min={0}
          labelPlacement="outside"
          value={stock.toString()}
          onValueChange={(val) => setStock(Number(val))}
        />

        <Chip
          variant="flat"
          color={getNumberColor.color(qty)}
          startContent={<QtyIcon className="text-lg" />}
          isDisabled={qty === 0}
        >
          {qty > 0 && "+"}
          {qty} {product.unit}
        </Chip>

        <SubmitButton className="ms-auto" color="primary" isDisabled={qty === 0}>
          Enviar
        </SubmitButton>
      </div>
    </form>
  );
}
