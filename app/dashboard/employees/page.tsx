import { API_URL } from '@/constants';
import { Employee } from '@/entities';
import { AuthHeaders } from '@/helpers/AuthHeaders';
import EmployeeCard from './_components/EmployeeCard';
import EmployeePhotoCard from './_components/EmployeePhotoCard';

const EmployeesPage = async () => {
  const response = await fetch(`${API_URL}/employees`, {
    headers: {
      ...AuthHeaders(),
    }, method: "GET"
  });

  const employees: Employee[] = await response.json();

  console.log(employees);

  return (
    <div className="flex flex-wrap flex-grow-0 h-[90vh] gap-4 overflow-y-auto p-10">
      {employees.map((employee: Employee) => {
        if (employee.employeePhotoUrl !== null) {
          return (
            <EmployeePhotoCard
              key={employee.employeeId}
              employee={employee}
            />
          );
        } else {
          return (
            <EmployeeCard
              key={employee.employeeId}
              employee={employee}
            />
          );
        }
      })}
    </div>
  );
};

export default EmployeesPage;