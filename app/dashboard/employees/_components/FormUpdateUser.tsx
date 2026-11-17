"use client";

import updateUser from "@/actions/users/update";
import { User } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import generate from "generate-password";
import { useState } from "react";
import { LuEye, LuRefreshCw } from "react-icons/lu";

export default function FormUpdateUser({
  user,
}: {
  user: User;
}) {
  const { userId } = user;

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const updateUserById = updateUser.bind(null, userId);

  return (
    <form
      action={updateUserById}
      className="py-10 flex flex-col gap-2"
    >
      <h1 className="text-white text-xl font-bold text-center">
        Actualizar Usuario
      </h1>

      <Input
        defaultValue={user.userEmail}
        name="userEmail"
        label="Correo de cuenta"
      />

      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={visible ? "text" : "password"}
        name="userPassword"
        label="Nueva contraseña"
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
        startContent={<LuRefreshCw />}
        onPress={() =>
          setPassword(
            generate.generate({
              length: 10,
            })
          )
        }
      >
        Generar contraseña
      </Button>

      <Button type="submit" color="primary">
        Actualizar Usuario
      </Button>
    </form>
  );
}