import updateManager from "@/actions/managers/update";
import { Manager } from "@/entities";
import { Input, Button } from "@nextui-org/react";

import SelectStore from "./SelectStore";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";

export default async function FormUpdateManager({
  manager,
}: {
  manager: Manager;
}) {
  const updateManagerWithId = updateManager.bind(
    null,
    manager.managerId
  );

  const responseStores = await fetch(
    `${API_URL}/locations`,
    {
      headers: {
        ...(await AuthHeaders()),
      },
    }
  );

  const stores = await responseStores.json();

  return (
    <form
      action={updateManagerWithId}
      className="bg-orange-400 rounded-md p-4 flex flex-col gap-4"
    >
      <h1>Actualizar Manager</h1>

      <Input
        isRequired
        required={true}
        defaultValue={manager.managerFullName}
        placeholder="Marco Aurelio"
        name="managerFullName"
      />

      <Input
        isRequired
        required={true}
        defaultValue={manager.managerEmail}
        placeholder="manager@ocso.com"
        name="managerEmail"
      />

      <Input
        isRequired
        required={true}
        defaultValue={String(manager.managerSalary)}
        placeholder="12000"
        name="managerSalary"
        type="number"
      />

      <Input
        isRequired
        required={true}
        defaultValue={manager.managerPhoneNumber}
        placeholder="4421333617"
        name="managerPhoneNumber"
      />

      <SelectStore
        stores={stores}
        defaultStore={manager?.location?.locationId}
      />

      <Button color="primary" type="submit">
        Actualizar
      </Button>
    </form>
  );
}