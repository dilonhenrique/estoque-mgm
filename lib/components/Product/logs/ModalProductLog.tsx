"use client";

import { useBackDelay } from "@/utils/hooks/useBackDelay";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Product } from "../../../../types/schemas";
import ProductLogList from "./ProductLogList";

type Props = {
  product: Product;
};

export default function ModalProductLog({ product }: Props) {
  return (
    <Modal
      defaultOpen
      size="2xl"
      backdrop="blur"
      onClose={useBackDelay()}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2>Logs do Produto: {product.name}</h2>
            </ModalHeader>
            <ModalBody className="pb-4">
              <ProductLogList logs={product.logs ?? []} />
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="primary">Ok</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
