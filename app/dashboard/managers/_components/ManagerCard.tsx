import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import ModalGeneric from "@/app/dashboard/_components/ModalGeneric"
import { LuPlus } from "react-icons/lu";
import { Manager } from "@/entities";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import FormUpdateUser from "../../employees/_components/FormUpdateUser";
import FormCreateUserManager from "../[id]/_components/FormCreateUser";

export default async function ManagerCard() {
  const response = await fetch(`${API_URL}/managers`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:managers"],
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener managers: ${response.status}`);
  }

  const managers: Manager[] = await response.json();

  return managers.map((manager) => (
    <Card key={manager.managerId} className="mx-20 py-2 text-center">
      <CardHeader className="flex justify-between items-center">
        <p className="w-full">
          <b className="text-4xl">{manager.managerFullName}</b>
        </p>

        {manager.user ? (
          <ModalGeneric icon={<LuPlus size={20} />}>
            <FormUpdateUser user={manager.user} />
          </ModalGeneric>
        ) : (
          <ModalGeneric icon={<LuPlus size={20} />}>
            <FormCreateUserManager manager={manager} />
          </ModalGeneric>
        )}
      </CardHeader>

      <Divider />

      <CardBody className="flex flex-row flex-grow-0 items-center gap-10 justify-center">
        <div className="flex flex-col text-lg">
          <p>
            Email: <b>{manager.managerEmail}</b>
          </p>

          <p>
            Teléfono: <b>{manager.managerPhoneNumber}</b>
          </p>

          <p>
            Salario: <b>{manager.managerSalary}</b>
          </p>

          {manager.location && (
            <p>
              Tienda:{" "}
              <Link
                href={{
                  pathname: "/dashboard",
                  query: {
                    store: manager.location.locationId,
                  },
                }}
              >
                <b className="underline">{manager.location.locationName}</b>
              </Link>
            </p>
          )}
        </div>

        {!manager.location && <p>Sin tienda asignada</p>}
      </CardBody>
    </Card>
  ));
}