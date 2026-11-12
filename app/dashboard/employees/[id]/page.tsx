import EmployeeCard from "../_components/EmployeeCard";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { Employee } from "@/entities";
import { Image } from "@nextui-org/react";
import FormUpdateEmployee from "./_components/FormUpdateEmployee";
import { API_URL } from "@/constants";
import EmployeeDataCard from "./_components/EmployeeDataCard";

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const responseEmployee = await fetch(
    `${API_URL}/employees/${params.id}`,
    {
      headers: {
        ...AuthHeaders(),
      },
    }
  );

  const employee: Employee = await responseEmployee.json();

  return (
    <div className="w-full h-[90vh] flex flex-row items-center justify-center">
      <EmployeeDataCard employee={employee}></EmployeeDataCard>
      <FormUpdateEmployee employee={employee}></FormUpdateEmployee>
    </div>
  );
}