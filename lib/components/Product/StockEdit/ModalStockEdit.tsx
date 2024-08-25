"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Product } from "../../../../types/schemas";
import FormStockEdit from "./FormStockEdit";

type Props = {
  product: Product;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function ModalStockEdit({ product, isOpen, onClose }: Props) {
  return (
    <Modal
      defaultOpen
      size="md"
      scrollBehavior="inside"
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex-col">
              <h2>{product.name}</h2>
              <h3 className="font-light">Editar quantidade do produto</h3>
            </ModalHeader>
            <ModalBody className="mb-4">
              <FormStockEdit product={product} closeModal={onClose} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
