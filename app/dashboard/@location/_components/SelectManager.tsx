"use client";

import { Select, SelectItem } from "@nextui-org/react";

import { Location, Manager } from "@/entities";

interface SelectManagerProps {
  managers: Manager[];
  locations: Location[];
  defaultManager?: string;
}

export default function SelectManager({
  managers,
  locations,
  defaultManager,
}: SelectManagerProps) {
  const disabledKeys = locations
    .map((location) => {
      const managerId = location.manager?.managerId?.toString();

      if (managerId === defaultManager) return undefined;

      return managerId;
    })
    .filter(
      (managerId): managerId is string => managerId !== undefined
    );

  return (
    <Select
      name="manager"
      label="Manager"
      placeholder="Selecciona un manager"
      disabledKeys={disabledKeys}
      defaultSelectedKeys={
        defaultManager ? [defaultManager] : []
      }
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