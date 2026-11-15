import createEmployee from "@/actions/employees/create";
import SelectLocations from "./SelectLocation";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { Button, Input } from "@nextui-org/react";

export default async function FormCreateEmployee() {
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
      action={createEmployee}
      className="flex flex-col gap-2 p-8 rounded-md m-2 bg-orange-600"
    >
      <Input
        label="Nombre"
        name="employeeName"
        placeholder="Marco"
        isRequired
      />

      <Input
        label="Apellidos"
        name="employeeLastName"
        placeholder="Aurelio"
        isRequired
      />

      <Input
        label="Correo electrónico"
        name="employeeEmail"
        placeholder="marco@marco.com"
        isRequired
      />

      <Input
        label="Num. de Teléfono"
        name="employeePhoneNumber"
        placeholder="444XXXXX"
        isRequired
      />

      <Input
        type="file"
        name="employeePhoto"
        isRequired
      />

      <SelectLocations
        stores={locations}
        defaultStore={undefined}
      />

      <Button type="submit" color="primary">
        Crear empleado
      </Button>
    </form>
  );
}