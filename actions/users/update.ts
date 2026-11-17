"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";

export default async function updateUser(
  userId: string,
  formData: FormData
) {
  const data: { userEmail?: string; userPassword?: string } = {};
  const userEmail = formData.get("userEmail");
  const userPassword = formData.get("userPassword");

  if (typeof userEmail === "string" && userEmail !== "") {
    data.userEmail = userEmail;
  }
  if (typeof userPassword === "string" && userPassword !== "") {
    data.userPassword = userPassword;
  }

  const response = await fetch(`${API_URL}/auth/${encodeURIComponent(userId)}`, {
    method: "PATCH",
    headers: {
      ...AuthHeaders(),
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error al actualizar el usuario");
  }
}