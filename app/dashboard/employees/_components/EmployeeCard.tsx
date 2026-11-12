import { Employee } from "@/entities";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";

export default function EmployeeCard({
  employee,
}: {
  employee: Employee;
}) {
  return (
    <Card className="size-72 max-h-72 relative">
      <CardHeader>
        <h1 className="font-bold text-xl">
          {employee.employeeName} {employee.employeeLastName}
        </h1>
      </CardHeader>

      <Divider />

      <CardBody className="pb-16">
        <p>
          Correo: <b>{employee.employeeEmail}</b>
        </p>

        <p>
          Número de teléfono: <b>{employee.employeePhoneNumber}</b>
        </p>
      </CardBody>

      <CardFooter className="absolute bottom-0 left-0 w-full py-2 h-14 border-t border-default-200">
        <Link
          href={`/dashboard/employees/${employee.employeeId}`}
          className="w-full"
        >
          <Button
            variant="ghost"
            color="primary"
            className="w-full"
          >
            Actualizar datos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}