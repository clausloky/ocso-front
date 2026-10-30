"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";

import { redirect } from "next/navigation";

export default async function deleteLocation(formData: FormData) {
  const locationId = formData.get("store");

  if (typeof locationId !== "string" || !locationId) {
    throw new Error("No se encontró el ID de la ubicación.");
  }

  try {
    const res = await fetch(
      `${API_URL}/locations/${encodeURIComponent(locationId)}`,
      {
        method: "DELETE",
        headers: {
          ...(await AuthHeaders()),
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(
        `Error al eliminar la ubicación (${res.status}): ${errorData}`
      );
    } else {
      redirect(`/dashboard`);
    }

    return;

  } catch (error) {
    console.error("Error al eliminar la ubicación:", error);
    throw error;
  }
}