"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

import { Location } from "@/entities";

import { redirect } from "next/navigation";

export async function createLocation(formData: FormData) {
  const location: any = {};
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
    const res = await fetch(`${API_URL}/locations`, {
      method: "POST",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
        ...(await AuthHeaders()),
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(
        `Error al crear la ubicación (${res.status}): ${errorData}`
      );
    }

    const data : Location = await res.json();

    if (res.status === 201) {
      revalidateTag("dashboard:location");
      redirect(`/dashboard?store=${data.locationId}`);
    }

    console.log(data);
    
  } catch (error) {
    console.error("Error al crear la ubicación:", error);
    throw error;
  }
}