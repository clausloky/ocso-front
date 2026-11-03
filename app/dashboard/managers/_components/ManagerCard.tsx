import { Manager } from "@/entities";
import { API_URL } from "@/constants";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import Link from "next/link";

export default async function ManagerCard() {
  const response = await fetch(`${API_URL}/managers`, {
    method: "GET",
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:managers"],
    },
  });

  const data: Manager[] = await response.json();

  return data?.map((manager: Manager) => {
    return (
      <Link
        key={manager.managerId}
        href={{
          pathname: `/dashboard/managers/${manager.managerId}`,
        }}
      >
        <Card className="mx-10 my-10">
          <CardHeader>
            <p className="w-full">
              Nombre: <b>{manager.managerFullName}</b>
            </p>
          </CardHeader>

          <Divider />

          <CardBody className="flex flex-row flex-grow-0 items-center gap-10 justify-center">
            <div className="flex flex-col text-lg">
              <p className="w-full">
                Email: <b>{manager.managerEmail}</b>
              </p>

              <p className="w-full">
                Teléfono: <b>{manager.managerPhoneNumber}</b>
              </p>

              <p className={manager.location ? "" : "hidden"}>
                Tienda:{" "}
                <Link
                  href={{
                    pathname: "/dashboard",
                    query: {
                      store: manager?.location?.locationId,
                    },
                  }}
                >
                  <b className="underline">
                    {manager?.location?.locationName}
                  </b>
                </Link>
              </p>
            </div>

            {manager.location ? (
              <></>
            ) : (
              <p>Sin tienda asignada</p>
            )}
          </CardBody>
        </Card>
      </Link>
    );
  });
}