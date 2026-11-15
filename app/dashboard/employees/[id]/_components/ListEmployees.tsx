'use client';

import EmployeeCard from "../../_components/EmployeeCard";
import EmployeePhotoCard from "../../_components/EmployeePhotoCard";
import { Employee, Location } from "@/entities";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function ListEmployees({
  employees,
  locations,
}: {
  employees: Employee[];
  locations: Location[];
}) {
  const [filter, setFilter] = useState<string>("");
  const storeOptions = [
    { key: "all", name: "Todas las tiendas" },
    ...locations.map((location) => ({
      key: String(location.locationId),
      name: location.locationName,
    })),
  ];

  return (
    <>
      <Select
        label="Filtrar por tienda"
        className="w-[280px] min-w-[240px] shrink-0"
        selectedKeys={[filter || "all"]}
        onSelectionChange={(keys) => {
          setFilter(keys === "all" ? "" : (Array.from(keys)[0]?.toString() ?? ""));
        }}
      >
        {storeOptions.map((store) => (
          <SelectItem key={store.key}>{store.name}</SelectItem>
        ))}
      </Select>

      {employees
        .filter((employee: Employee) => {
          if (!filter) return true;

          return (
            String(employee.location?.locationId) === filter
          );
        })
        .map((employee: Employee) => {
          if (employee.employeePhotoUrl !== null) {
            return (
              <EmployeePhotoCard
                key={employee.employeeId}
                employee={employee}
              />
            );
          }

          return (
            <EmployeeCard
              key={employee.employeeId}
              employee={employee}
            />
          );
        })}
    </>
  );
}