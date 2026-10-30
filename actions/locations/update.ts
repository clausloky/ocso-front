"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { Location } from "@/entities";

export async function updateLocation(
  store: string,
  formData: FormData
) {
  const location: Record<string, any> = {};
  const locationLatLng = [0, 0];

  for (const key of formData.keys()) {
    const value = formData.get(key);

    if (value) {
      if (key === "locationLat") {
        locationLatLng[0] = +value;
      } else if (key === "locationLng") {
        locationLatLng[1] = +value;
      } else {
        location[key] = value;
      }
    }
  }

  location.locationLatLng = locationLatLng;

  try {
    const response = await fetch(`${API_URL}/locations/${store}`, {
      method: "PATCH",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
        ...(await AuthHeaders()),
      },
    });

    if (!response.ok) {
      const errorData = await response.text();

      throw new Error(
        `Error al actualizar la ubicación (${response.status}): ${errorData}`
      );
    }

    const { locationId }: Location = await response.json();

    if (response.status === 200) {
      revalidateTag("dashboard:locations");
      revalidateTag(`dashboard:locations:${store}`);

      redirect(`/dashboard?store=${locationId}`);
    }
  } catch (error) {
    console.error("Error al actualizar la ubicación:", error);
    throw error;
  }
}