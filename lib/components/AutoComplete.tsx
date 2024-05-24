'use client'

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function Autocom() {
  const users = ["Dilon", "Marcelo", "João"];

  return (
    <Autocomplete label="autocomplete">
      {users.map(user => (<AutocompleteItem key={user}>{user}</AutocompleteItem>))}
    </Autocomplete>
  )
}