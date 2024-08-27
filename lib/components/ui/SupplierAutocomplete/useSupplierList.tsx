"use client";

import { useEffect, useState } from "react";
import { Customer, Supplier } from "../../../../types/schemas";
import { toast } from "sonner";
import { customerService } from "@/backend/services/customers";
import { supplierService } from "@/backend/services/suppliers";

export function useSupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  async function loadSuppliers(currentOffset: number) {
    setIsLoading(true);

    const response = await supplierService.search({
      skip: currentOffset,
      take: limit,
    });

    if (!response.success) return toast.error("Erro ao buscar os fornecedores");

    const newTotal = suppliers.length + response.data.items.length;
    setHasMore(newTotal < response.data.total);

    setSuppliers((prevItems) => [...prevItems, ...response.data.items]);

    setIsLoading(false);
  }

  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      loadSuppliers(offset);
    }
  }, []);

  function onLoadMore() {
    const newOffset = offset + limit;

    setOffset(newOffset);
    loadSuppliers(newOffset);
  }

  return {
    suppliers,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
