"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { API_URL } from "@/constants";
import axios from "axios";

export default function LoginPage() {
  const handleEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authData = {
      userEmail: formData.get("userEmail"),
      userPassword: formData.get("userPassword"),
    }

    try {
      const { data: responseData } = await axios.post(`${API_URL}/auth/login`, authData, {
        withCredentials: true
      });
      console.log(responseData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login request failed", error.response?.status, error.response?.data ?? error.message);
      } else {
        console.error("Login request failed", error);
      }
    }
  }
  return (
    <form className="bg-orange-500 px-10 py-2 rounded-md" onSubmit={handleEvent}>
      <p className="text-2xl my-4 text-white">
        Iniciar sesion
      </p>

      <div className="flex flex-col gap-2 my-4 items-center">
        <Input
          label="Email"
          name="userEmail"
          type="email"
          isRequired={true}
          size="sm"
        />

        <Input
          label="Contraseña"
          name="userPassword"
          type="password"
          isRequired={true}
          size="sm"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button color="primary" type="submit">Iniciar sesion</Button>

        <p>
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-orange-200 underline">Regístrate</Link>
        </p>
      </div>
    </form>
  );
}