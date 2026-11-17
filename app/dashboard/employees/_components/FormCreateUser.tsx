"use client";

import { useState } from "react";
import registerEmployee from "@/actions/users/register-employee";
import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { LuEye, LuRefreshCw } from "react-icons/lu";
import generate from "generate-password";

export default function FormCreateUserEmployee({
  employee,
}: {
  employee: Employee;
}) {
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const { employeeId } = employee;

  const registerEmployeeById = registerEmployee.bind(null, employeeId);

  return (
    <form
      action={registerEmployeeById}
      className="py-10 flex flex-col gap-2"
    >
      <h1 className="text-white text-xl font-bold text-center">
        Crear Usuario
      </h1>

      <Input
        name="userEmail"
        label="Correo de cuenta"
      />

      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={visible ? "text" : "password"}
        name="userPassword"
        label="Contraseña"
        endContent={
          <button
            type="button"
            onMouseDown={() => setVisible(true)}
            onMouseUp={() => setVisible(false)}
            onMouseLeave={() => setVisible(false)}
          >
            <LuEye size={30} />
          </button>
        }
      />

      <Button
        color="danger"
        type="button"
        onPress={() => {
          setPassword(
            generate.generate({
              length: 10,
            })
          );
        }}
        startContent={<LuRefreshCw />}
      >
        Generar contraseña
      </Button>

      <Button type="submit" color="primary">
        Crear Usuario
      </Button>
    </form>
  );
}