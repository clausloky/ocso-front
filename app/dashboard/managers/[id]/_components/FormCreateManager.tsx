import { Button, Input } from "@nextui-org/react";
import SelectStore from "../../_components/SelectStore";
import { Location } from "@/entities";
import createManager from "@/actions/managers/create";

export default function FormCreateManager({
  stores,
}: {
  stores: Location[];
}) {
  return (
    <form
      action={createManager}
      className="flex flex-col gap-4"
    >
      <h1 className="text-4xl font-bold text-white">
        Crear Manager
      </h1>

      <Input
        label="Nombre completo"
        name="managerFullName"
      />

      <Input
        label="Salario"
        name="managerSalary"
        type="number"
      />

      <Input
        label="Correo"
        name="managerEmail"
        type="email"
      />

      <Input
        label="Número de teléfono"
        name="managerPhoneNumber"
      />

      <SelectStore stores={stores} />

      <Button
        type="submit"
        color="primary"
      >
        Crear manager
      </Button>
    </form>
  );
}