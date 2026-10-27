"use client";

import { Select, SelectItem } from "@nextui-org/react";

import { Location, Manager } from "@/entities";

interface SelectManagerProps {
  managers: Manager[];
  locations: Location[];
}

export default function SelectManager({
  managers,
  locations,
}: SelectManagerProps) {
  const disabledKeys = locations
    .map((location) => location.manager?.managerId?.toString())
    .filter((managerId): managerId is string => managerId !== undefined);

  return (
    <Select
      name="manager"
      label="Manager"
      placeholder="Selecciona un manager"
      disabledKeys={disabledKeys}
    >
      {managers.map((manager) => (
        <SelectItem
          key={manager.managerId.toString()}
          value={manager.managerId.toString()}
        >
          {manager.managerFullName}
        </SelectItem>
      ))}
    </Select>
  );
}
