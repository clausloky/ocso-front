import { Manager } from "@/entities";
import { API_URL } from "@/constants";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import Link from "next/link";

export default async function ManagerCard() {
  const response = await fetch(`${API_URL}/managers`, {
    method: "GET",
    headers: {
      ...AuthHeaders(),
    },
    next: {
      tags: ["dashboard:managers"],
    },
  });

  const data: Manager[] = await response.json();

  return data?.map((manager: Manager) => {
    return (
        <Link href={{ pathname: `/dashboard/managers/${manager.managerId}`}}>
            <Card className="mx-10 my-10">
                <CardHeader>
                <p className="w-full">
                    Nombre: <b>{manager.managerFullName}</b>
                </p>
                </CardHeader>
                <Divider />
                <CardBody>
                <p className="w-full">
                    Email: <b>{manager.managerEmail}</b>
                </p>
                <p className="w-full">
                    Teléfono: <b>{manager.managerPhoneNumber}</b>
                </p>
                </CardBody>
            </Card>
        </Link>
    );
  });
}
