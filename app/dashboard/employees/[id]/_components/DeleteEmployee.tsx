import { LuTrash } from "react-icons/lu";
import { Button } from "@nextui-org/react";
import deleteEmployee from "@/actions/employees/delete";

export default function DeleteEmployee({
  employeeId,
}: {
  employeeId: string;
}) {
  const deleteEmployeeById = deleteEmployee.bind(null, employeeId);

  return (
    <form action={deleteEmployeeById}>
      <Button type="submit" color="danger" variant="light">
        <LuTrash size={20} />
      </Button>
    </form>
  );
}