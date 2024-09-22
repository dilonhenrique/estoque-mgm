import { Chip, SelectItem } from "@nextui-org/react";
import { Product } from "@/types/schemas";
import { LogCause } from "@prisma/client";
import { useState } from "react";
import { numberColor } from "@/utils/maps/numberColor";
import { AnyObject } from "@/types/types";
import { toast } from "sonner";
import { SubmitButton } from "@/components/ui/FormButton";
import { locale } from "@/utils/locale";
import { logAction } from "@/backend/actions/logs";
import { Form, IncreaserInput, Select } from "@/components/ui/forms/fields";

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
  const QtyIcon = numberColor.icon(qty);

  async function submit(payload: AnyObject) {
    const data = {
      ...payload,
      qty: String(qty),
      product_id: product.id,
    };
    return await logAction.createAndUpdateProduct(data);
  }

  return (
    <Form
      className="flex flex-col gap-4"
      action={submit}
      onSuccess={(res) => {
        // toast.success(res.message);
        toast.success("Estoque alterado com sucesso!");
        closeModal();
      }}
      onError={(res) => {
        if (res.response?.message) toast.error(res.response?.message);
      }}
    >
      <Select
        name="cause"
        label="Motivo"
        labelPlacement="outside"
        placeholder="Selecione o motivo"
        items={Object.values(LogCause).map((item) => ({
          value: item,
          label: locale.logCause(item),
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
          value={stock}
          onValueChange={(val) => setStock(val)}
          className="w-48"
        />

        <Chip
          variant="flat"
          color={numberColor.color(qty)}
          startContent={<QtyIcon className="text-lg" />}
          isDisabled={qty === 0}
        >
          {qty > 0 && "+"}
          {qty} {product.unit}
        </Chip>

        <SubmitButton
          className="ms-auto self-end"
          color="primary"
          isDisabled={qty === 0}
        >
          Enviar
        </SubmitButton>
      </div>
    </Form>
  );
}
