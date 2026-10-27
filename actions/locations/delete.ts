"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export default async function deleteLocation(formData: FormData) {
  const locationId = formData.get("store");

  if (typeof locationId !== "string" || !locationId) {
    throw new Error("No se encontró el ID de la ubicación.");
  }

  const token = (await cookies()).get(TOKEN_NAME)?.value;

  if (!token) {
    throw new Error("No se encontró el token.");
  }

  try {
    const res = await axios.delete(`${API_URL}/locations/${locationId}`, {
      headers: {
      Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al eliminar la ubicación:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Error inesperado al eliminar la ubicación:", error);
    }

    throw error;
  }
}