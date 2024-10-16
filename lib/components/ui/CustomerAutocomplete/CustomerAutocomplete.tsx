"use client";

import { AutocompleteItem, AutocompleteProps } from "@nextui-org/react";
import { useState } from "react";
import { useCustomerList } from "./useCustomerList";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import Autocomplete from "../Autocomplete/Autocomplete";

export default function CustomerAutocomplete(
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
  const { customers, isLoading, hasMore, onLoadMore } = useCustomerList();

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
      defaultItems={customers}
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
