
"use client";

import axios from "axios";
import { Employee } from "@/entities";
import { API_URL } from "@/constants";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
} from "@nextui-org/react";

export default function EmployeesLocation({
    store,
}: {
    store: string;
}) {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const { data } = await axios.get<Employee[]>(
                    `${API_URL}/employees/location/${store ? store : 0}`,
                    { withCredentials: true }
                );

                setEmployees(data);
            } catch (error) {
                console.error("Error al obtener empleados:", error);
            }
        };

        getEmployees();
    }, [store]);

    return (
        <>
            {employees.map((employee) => {
                const fullName =
                    employee.employeeName +
                    " " +
                    employee.employeeLastName;

                return (
                    <Card
                        key={employee.employeeId}
                        className="mx-10 my-10"
                    >
                        <CardHeader>
                            <p className="w-full">
                                Nombre: <b>{fullName}</b>
                            </p>
                        </CardHeader>

                        <Divider />

                        <CardBody>
                            <p className="w-full">
                                Email: <b>{employee.employeeEmail}</b>
                            </p>

                            <p className="w-full">
                                Teléfono:{" "}
                                <b>{employee.employeePhoneNumber}</b>
                            </p>
                        </CardBody>
                    </Card>
                );
            })}
        </>
    );
}
