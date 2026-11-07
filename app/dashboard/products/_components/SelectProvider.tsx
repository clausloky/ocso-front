"use client";

import { Provider } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectProvider({
  providers,
  defaultProvider,
}: {
  providers: Provider[];
  defaultProvider?: string;
}) {
  return (
    <Select
      name="provider"
      defaultSelectedKeys={
        defaultProvider ? [defaultProvider] : undefined
      }
    >
      {providers.map((provider) => (
        <SelectItem
          key={String(provider.providerId)}
          textValue={provider.providerName}
        >
          {provider.providerName}
        </SelectItem>
      ))}
    </Select>
  );
}