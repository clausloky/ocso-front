
"use client";

import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SelectLocation({ locations, store }: {locations: Location[], store: string | string[] | undefined}) {
  const router = useRouter();
  return (
    <Select label="Selecciona una tienda" classNames={{
      mainWrapper: "hover:ring-2 ring-red-300 rounded-xl transition-all",
      label: "Tienda"
    }}
    onChange={((e) => {
      console.log(e.target.value);
      router.push(`/dashboard${e.target.value ? `?store=${e.target.value}` : ""}`)
    })}
    selectedKeys={store}
    >
      {locations.map((location) => (
        <SelectItem
          key={String(location.locationId)}
          value={location.locationId}
          textValue={location.locationName}
        >
          {location.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}
