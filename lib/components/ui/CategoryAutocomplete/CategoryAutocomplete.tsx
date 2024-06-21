"use client";

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";
import { useState } from "react";
import { useCategoryList } from "./useCategoryList";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

export default function CategoryAutocomplete(
  props: Omit<
    AutocompleteProps,
    | "isLoading"
    | "defaultItems"
    | "children"
    | "scrollRef"
    | "onOpenChange"
    | "items"
  >
) {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, isLoading, hasMore, onLoadMore } = useCategoryList();

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  return (
    <Autocomplete
      {...props}
      isLoading={isLoading}
      defaultItems={categories}
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
