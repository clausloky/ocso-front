import { cookies } from "next/headers";
import { Button, Input } from "@nextui-org/react";

import { Manager, Location } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";
import { createLocation } from "@/actions/locations/create";

import SelectManager from "./SelectManager";

export default async function FormNewLocation({
  searchParams,
}: {
  searchParams?: string;
}) {
  if (searchParams) return null;

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

  return (
    <form
      action={createLocation}
      className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg"
    >
      <h1 className="text-3xl text-white text-center">
        Crear Tienda
      </h1>

      <Input
        label="Nombre"
        placeholder="Osco Juriquilla"
        name="locationName"
        isRequired
      />

      <Input
        label="Dirección"
        placeholder="Av De La Luz S/N"
        name="locationAdress"
        isRequired
      />

      <Input
        label="Latitud"
        placeholder="-120"
        name="locationLat"
        type="number"
        step="any"
        isRequired
      />

      <Input
        label="Longitud"
        placeholder="20"
        name="locationLng"
        type="number"
        step="any"
        isRequired
      />

      <SelectManager
        managers={managers}
        locations={locations}
      />

      <Button type="submit" color="primary">
        Subir
      </Button>
    </form>
  );
}