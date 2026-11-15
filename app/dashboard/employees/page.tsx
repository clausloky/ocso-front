import { API_URL } from '@/constants';
import { Employee, Location } from '@/entities';
import { AuthHeaders } from '@/helpers/AuthHeaders';
import CreateEmployee from './_components/CreateEmployee';
import FormCreateEmployee from './_components/FormCreateEmployee';
import ListEmployees from './[id]/_components/ListEmployees';

const EmployeesPage = async () => {
  const headers = await AuthHeaders();
  const [response, responseLocations] = await Promise.all([
    fetch(`${API_URL}/employees`, {
      headers,
      method: "GET",
      next: {
        tags: ["dashboard:employees"],
      },
    }),
    fetch(`${API_URL}/locations`, {
      headers,
      method: "GET",
    }),
  ]);

  if (!response.ok) {
    throw new Error(`Error al obtener los empleados: ${response.status}`);
  }
  if (!responseLocations.ok) {
    throw new Error(`Error al obtener las tiendas: ${responseLocations.status}`);
  }

  const employees: Employee[] = await response.json();
  const locations: Location[] = await responseLocations.json();

  return (
    <div className="flex flex-wrap flex-grow-0 h-[90vh] gap-4 overflow-y-auto p-10">
      
      <ListEmployees employees={employees} locations={locations}></ListEmployees>
      
      <div className="absolute bottom-10 right-10">
        <CreateEmployee>
          <FormCreateEmployee />
        </CreateEmployee>
      </div>
    </div>
  );
};

export default EmployeesPage;