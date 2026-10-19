
"use client";

import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

interface SelectLocationProps {
  locations: Location[];
}

export default function SelectLocation({ locations }: SelectLocationProps) {
  return (
    <Select label="Selecciona una tienda">
      {locations.map((location) => (
        <SelectItem
          key={String(location.locationId)}
          textValue={location.locationName}
        >
          {location.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}
