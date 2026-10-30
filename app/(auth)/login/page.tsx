"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { API_URL } from "@/constants";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const authData = {
      userEmail: formData.get("userEmail"),
      userPassword: formData.get("userPassword"),
    };

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      if (!res.ok) {
        const errorData = await res.text();

        throw new Error(
          `Error al iniciar sesión (${res.status}): ${errorData}`
        );
      }

      const responseData = await res.json();

      console.log(responseData);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login request failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="bg-orange-500 px-10 py-2 rounded-md"
      onSubmit={handleEvent}
    >
      <p className="text-2xl my-4 text-white">
        Iniciar sesión
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
        <Button
          color="primary"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Enviando..." : "Iniciar sesión"}
        </Button>

        <p>
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-orange-200 underline">
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
}