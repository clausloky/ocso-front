import { Location } from "@/entities";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";

import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

interface LocationCardProps {
  store?: string;
}

export default async function LocationCard({
  store,
}: LocationCardProps) {
  if (!store || store === "0") return null;

  const response = await fetch(`${API_URL}/locations/${store}`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: [
        "dashboard:locations",
        `dashboard:locations:${store}`,
      ],
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error al obtener la ubicación: ${response.status}`
    );
  }

  const data: Location = await response.json();

  return (
    <Card>
      <CardHeader>
        <b className="w-full">{data.locationName}</b>
      </CardHeader>

      <Divider />

      <CardBody>
        <p className="w-full">
          Manager:{" "}
          <b>{data.manager?.managerFullName ?? "Sin asignar"}</b>
        </p>

        <p className="w-full">
          Email:{" "}
          <b>{data.manager?.managerEmail ?? "N/A"}</b>
        </p>

        <p className="w-full">
          Teléfono:{" "}
          <b>{data.manager?.managerPhoneNumber ?? "N/A"}</b>
        </p>

        <p className="w-full">
          Salario:{" "}
          <b>${data.manager?.managerSalary ?? 0}</b>
        </p>
      </CardBody>
    </Card>
  );
}