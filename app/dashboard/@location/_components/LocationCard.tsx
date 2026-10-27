import axios from "axios";
import { cookies } from "next/headers";

import { Location } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";

import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

interface LocationCardProps {
  store?: string;
}

export default async function LocationCard({
  store,
}: LocationCardProps) {
  if (!store || store === "0") return null;

  const token = cookies().get(TOKEN_NAME)?.value;

  if (!token) {
    throw new Error(
      `No se encontró la cookie de autenticación "${TOKEN_NAME}".`
    );
  }

  const { data } = await axios.get<Location>(
    `${API_URL}/locations/${store}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    <Card>
      <CardHeader>
        <b className="w-full">{data.locationName}</b>
      </CardHeader>

      <Divider />

      <CardBody>
        <p className="w-full">
          Manager: <b>{data.manager?.managerFullName ?? "Sin asignar"}</b>
        </p>

        <p className="w-full">
          Email: <b>{data.manager?.managerEmail ?? "N/A"}</b>
        </p>

        <p className="w-full">
          Teléfono: <b>{data.manager?.managerPhoneNumber ?? "N/A"}</b>
        </p>

        <p className="w-full">
          Salario: <b>${data.manager?.managerSalary ?? 0}</b>
        </p>
      </CardBody>
    </Card>
  );
}