import updateEmployee from "@/actions/employees/update";
import SelectLocations from "../../_components/SelectLocation";
import { Employee } from "@/entities";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { Button, Input } from "@nextui-org/react";

export default async function FormUpdateEmployee({
  employee,
}: {
  employee: Employee;
}) {
  const { employeeId } = employee;

  const updateEmployeeById = updateEmployee.bind(null, employeeId);

  const responseLocations = await fetch(
    `${API_URL}/locations`,
    {
      headers: {
        ...AuthHeaders(),
      },
    }
  );

  const locations = await responseLocations.json();

  return (
    <form
      action={updateEmployeeById}
      className="flex flex-col gap-2 p-8 rounded-md m-2 bg-orange-600 h-fit"
    >
      <Input
        label="Nombre"
        name="employeeName"
        defaultValue={employee.employeeName}
      />

      <Input
        label="Apellidos"
        name="employeeLastName"
        defaultValue={employee.employeeLastName}
      />

      <Input
        label="Correo electrónico"
        name="employeeEmail"
        defaultValue={employee.employeeEmail}
      />

      <Input
        label="Num. de Teléfono"
        name="employeePhoneNumber"
        defaultValue={employee.employeePhoneNumber}
      />

      <Input
        label="Foto"
        type="file"
        name="employeePhoto"
      />

      <SelectLocations
        stores={locations}
        defaultStore={employee.location?.locationId}
      />

      <Button type="submit" color="primary">
        Actualizar datos
      </Button>
    </form>
  );
}