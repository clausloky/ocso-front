import { cookies } from "next/headers";
import { Button, Input } from "@nextui-org/react";

import { Manager, Location } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";
import { updateLocation } from "@/actions/locations/update";

import SelectManager from "./SelectManager";

export default async function FormUpdateLocation({
  store,
}: {
  store: string | undefined;
}) {
  if (!store) return null;

  const storeId = Number(store);

  if (!Number.isInteger(storeId) || storeId <= 0) {
    throw new Error("El ID de la tienda no es válido.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    throw new Error("No se encontró el token.");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [managersResponse, locationsResponse] = await Promise.all([
    fetch(`${API_URL}/managers`, {
      headers,
      next: {
        tags: ["dashboard:managers"],
      },
    }),

    fetch(`${API_URL}/locations`, {
      headers,
      next: {
        tags: ["dashboard:locations"],
      },
    }),
  ]);

  if (!managersResponse.ok) {
    throw new Error(
      `Error al obtener los encargados: ${managersResponse.status}`
    );
  }

  if (!locationsResponse.ok) {
    throw new Error(
      `Error al obtener las tiendas: ${locationsResponse.status}`
    );
  }

  const managers: Manager[] = await managersResponse.json();
  const locations: Location[] = await locationsResponse.json();

  const foundLocation = locations.find(
    (location) => location.locationId === storeId
  );

  if (!foundLocation) {
    throw new Error("No se encontró la tienda solicitada.");
  }

  const foundManager = managers.find(
    (manager) =>
      manager.managerId === foundLocation.manager?.managerId
  );

  // Vinculamos el ID para que la acción reciba primero store
  // y después FormData.
  const updateLocationWithStore = updateLocation.bind(null, store);

  return (
    <form
      action={updateLocationWithStore}
      className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg"
    >
      <h1 className="text-3xl text-white text-center">
        Editar tienda
      </h1>

      <Input
        defaultValue={foundLocation.locationName}
        label="Nombre"
        placeholder="Osco Jurikilla"
        name="locationName"
        isRequired
      />

      <Input
        defaultValue={foundLocation.locationAdress}
        label="Dirección"
        placeholder="Av De La Luz S/N"
        name="locationAdress"
        isRequired
      />

      <Input
        defaultValue={foundLocation.locationLatLng?.[0]?.toString()}
        label="Latitud"
        placeholder="20.000000"
        name="locationLat"
        type="number"
        step="any"
        isRequired
      />

      <Input
        defaultValue={foundLocation.locationLatLng?.[1]?.toString()}
        label="Longitud"
        placeholder="-100.000000"
        name="locationLng"
        type="number"
        step="any"
        isRequired
      />

      <SelectManager
        defaultManager={foundManager?.managerId}
        managers={managers}
        locations={locations}
      />

      <Button
        type="submit"
        color="primary"
        className="text-white"
      >
        Guardar cambios
      </Button>
    </form>
  );
}
