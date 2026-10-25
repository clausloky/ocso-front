'use client';

import EmployeesLocation from "./@location/_components/EmployeesLocation";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const store =
    typeof searchParams.store === "string"
      ? searchParams.store
      : "";

  return (
    <div className="w-screen">
      <div className="h-[90vh] overflow-hidden overflow-y-auto flex flex-col">
        {
          store ? <EmployeesLocation store={store} />
          : "Selecciona una tienda para ver a los empleados"
        }
      </div>
    </div>
  );
}