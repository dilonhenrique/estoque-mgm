"use client";

import { AutocompleteItem, AutocompleteProps } from "@nextui-org/react";
import { useState } from "react";
import { useServiceList } from "./useServiceList";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import Autocomplete from "../../atoms/Autocomplete/Autocomplete";
import { Service } from "@/types/schemas";

type Props = Omit<
  AutocompleteProps,
  | "isLoading"
  | "defaultItems"
  | "children"
  | "scrollRef"
  | "onOpenChange"
  | "items"
> & {
  onServiceChange?: (service?: Service) => void;
  addCustomOption?: boolean;
};

export default function ServiceAutocomplete({
  onServiceChange = () => {},
  onSelectionChange = () => {},
  addCustomOption,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { services, isLoading, hasMore, onLoadMore } = useServiceList();
  const custom: Service[] = addCustomOption
    ? [{ id: "CUSTOM", name: "Customizado", products: [] }]
    : [];
  const allServices = custom.concat(services);

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
      defaultItems={allServices}
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      onSelectionChange={(key) => {
        onSelectionChange(key);
        const service = allServices.find((item) => item.id === key);
        onServiceChange(service);
      }}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
