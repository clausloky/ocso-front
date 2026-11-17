"use server";

import { revalidateTag } from "next/cache";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";

export default async function registerManager(
  managerId: string,
  formData: FormData
) {
  const userEmail = formData.get("userEmail");
  const userPassword = formData.get("userPassword");

  if (typeof userEmail !== "string" || typeof userPassword !== "string") {
    throw new Error("El correo y la contraseña son obligatorios.");
  }

  const response = await fetch(
    `${API_URL}/auth/register/${encodeURIComponent(managerId)}?role=manager`,
    {
      method: "POST",
      headers: {
        ...AuthHeaders(),
        "content-type": "application/json",
      },
      body: JSON.stringify({ userEmail, userPassword }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error al registrar el usuario.");
  }

  revalidateTag("dashboard:managers");
}