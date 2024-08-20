"use client";

import { useEffect, useState } from "react";
import { Service } from "../../../../types/schemas";
import { toast } from "sonner";
import { serviceService } from "@/backend/services/services";

export function useServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  async function loadServices(currentOffset: number) {
    setIsLoading(true);

    const response = await serviceService.search({
      skip: currentOffset,
      take: limit,
    });

    if (!response.success) return toast.error("Erro ao buscar os clientes");

    const newTotal = services.length + response.data.items.length;
    setHasMore(newTotal < response.data.total);

    setServices((prevItems) => [...prevItems, ...response.data.items]);

    setIsLoading(false);
  }

  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      loadServices(offset);
    }
  }, []);

  function onLoadMore() {
    const newOffset = offset + limit;

    setOffset(newOffset);
    loadServices(newOffset);
  }

  return {
    services,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
