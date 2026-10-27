import axios from "axios";
import { cookies } from "next/headers";
import { Button, Input } from "@nextui-org/react";

import { Manager, Location } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";
import { createLocation } from "@/actions/locations/create";

import SelectManager from "./SelectManager";

export default async function FormNewLocation() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    throw new Error("No se encontró el token.");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [managersResponse, locationsResponse] = await Promise.all([
    axios.get<Manager[]>(`${API_URL}/managers`, { headers }),
    axios.get<Location[]>(`${API_URL}/locations`, { headers }),
  ]);

  return (
    <form action={createLocation} className="flex flex-col gap-4">
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
        placeholder="Av. de la Luz S/N"
        name="locationAddress"
        isRequired
      />

      <Input
        label="Latitud"
        placeholder="20"
        name="locationLat"
        type="number"
        step="any"
        isRequired
      />

      <Input
        label="Longitud"
        placeholder="-100"
        name="locationLng"
        type="number"
        step="any"
        isRequired
      />

      <SelectManager
        managers={managersResponse.data}
        locations={locationsResponse.data}
      />

      <Button type="submit" color="primary">
        Subir
      </Button>
    </form>
  );

}
