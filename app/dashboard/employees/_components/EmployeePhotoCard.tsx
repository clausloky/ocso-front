import { Employee } from "@/entities";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";

export default function EmployeePhotoCard({
  employee,
}: {
  employee: Employee;
}) {
  return (
    <Card className="size-72 max-h-72 relative" isFooterBlurred>
      <CardHeader className="absolute top-0 z-10 bg-black/25">
        <h1 className="font-bold text-xl text-white drop-shadow-sm">
          {employee.employeeName + " " + employee.employeeLastName}
        </h1>
      </CardHeader>

      <Divider />

      <CardBody className="p-0 object-cover">
        <Image
          src={employee.employeePhotoUrl}
          alt={`${employee.employeeName} ${employee.employeeLastName}`}
          className="z-0"
          classNames={{
            img: "size-72 max-h-72 object-cover",
          }}
        />
      </CardBody>

      <CardFooter className="absolute bottom-0 z-10 justify-center bg-black/25 border-t border-white/20">
        <Link
          href={`/dashboard/employees/${employee.employeeId}`}
          className="w-full"
        >
          <Button
            variant="ghost"
            color="default"
            className="w-full text-white border-white"
          >
            Actualizar datos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}