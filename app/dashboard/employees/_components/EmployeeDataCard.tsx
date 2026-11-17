import { Employee } from "@/entities";
import Link from "next/link";
import CreateUser from "../[id]/_components/CreateUser";
import DeleteEmployee from "../[id]/_components/DeleteEmployee";
import FormCreateUserEmployee from "./FormCreateUser";
import FormUpdateUser from "./FormUpdateUser";
import { LuUser } from "react-icons/lu";

export default function EmployeeDataCard({
  employee,
}: {
  employee: Employee;
}) {
  return (
    <div className="flex flex-row items-center gap-2 bg-white rounded-md flex-grow-0 h-fit px-4 m-2">
      <div className="text-xl">
        <h1 className="font-bold">
          {employee.employeeName} {employee.employeeLastName}
        </h1>

        <h1>{employee.employeeEmail}</h1>

        <h1>{employee.employeePhoneNumber}</h1>

        <DeleteEmployee employeeId={employee.employeeId} />

        <Link
          className="underline"
          href={{
            pathname: "/dashboard",
            query: String(employee.location?.locationId),
          }}
        >
          <h1>{employee.location?.locationName}</h1>
        </Link>
      </div>

      <div className="h-full py-20 w-1 bg-zinc-300 mx-6" />

      <CreateUser
        icon={<LuUser size={20} />}
        photo={employee?.employeePhotoUrl}
      >
        {!employee.user ? (
          <FormCreateUserEmployee employee={employee} />
        ) : (
          <FormUpdateUser user={employee.user} />
        )}
      </CreateUser>
    </div>
  );
}