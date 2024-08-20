"use client";

import { AutocompleteItem, AutocompleteProps } from "@nextui-org/react";
import { useState } from "react";
import { useServiceList } from "./useServiceList";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import Autocomplete from "../Autocomplete/Autocomplete";
import { Service } from "../../../../types/schemas";

export default function ServiceAutocomplete(
  props: Omit<
    AutocompleteProps,
    | "isLoading"
    | "defaultItems"
    | "children"
    | "scrollRef"
    | "onOpenChange"
    | "items"
  > & { onServiceChange?: (service?: Service) => void }
) {
  const [isOpen, setIsOpen] = useState(false);
  const { services, isLoading, hasMore, onLoadMore } = useServiceList();

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
      defaultItems={services}
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      onSelectionChange={(key) => {
        if (props.onSelectionChange) props.onSelectionChange(key);
        const service = services.find((item) => item.id === key);
        if (props.onServiceChange) props.onServiceChange(service);
      }}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
