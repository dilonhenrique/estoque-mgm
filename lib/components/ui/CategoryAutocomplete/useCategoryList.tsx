"use client";

import { categoryService } from "@/backend/services/categories";
import { useEffect, useState } from "react";
import { ProductCategory } from "@/types/schemas";
import { toast } from "sonner";

export function useCategoryList() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  async function loadCategories(currentOffset: number) {
    setIsLoading(true);

    const response = await categoryService.search({
      skip: currentOffset,
      take: limit,
    });

    if (!response.success) return toast.error("Erro ao buscar as categorias");

    const newTotal = categories.length + response.data.items.length;
    setHasMore(newTotal < response.data.total);

    setCategories((prevItems) => [...prevItems, ...response.data.items]);

    setIsLoading(false);
  }

  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      loadCategories(offset);
    }
  }, []);

  function onLoadMore() {
    const newOffset = offset + limit;

    setOffset(newOffset);
    loadCategories(newOffset);
  }

  return {
    categories,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
