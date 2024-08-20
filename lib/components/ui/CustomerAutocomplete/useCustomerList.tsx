"use client";

import { useEffect, useState } from "react";
import { Customer } from "../../../../types/schemas";
import { toast } from "sonner";
import { customerService } from "@/backend/services/customers";

export function useCustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  async function loadCustomers(currentOffset: number) {
    setIsLoading(true);

    const response = await customerService.search({
      skip: currentOffset,
      take: limit,
    });

    if (!response.success) return toast.error("Erro ao buscar os clientes");

    const newTotal = customers.length + response.data.items.length;
    setHasMore(newTotal < response.data.total);

    setCustomers((prevItems) => [...prevItems, ...response.data.items]);

    setIsLoading(false);
  }

  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      loadCustomers(offset);
    }
  }, []);

  function onLoadMore() {
    const newOffset = offset + limit;

    setOffset(newOffset);
    loadCustomers(newOffset);
  }

  return {
    customers,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
