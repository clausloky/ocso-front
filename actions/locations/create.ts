"use server";

import axios from "axios";
import { cookies } from "next/headers";

import { API_URL, TOKEN_NAME } from "@/constants";

export async function createLocation(formData: FormData) {
  const token = (await cookies()).get(TOKEN_NAME)?.value;

  if (!token) {
    throw new Error("No se encontró el token.");
  }

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
    const res = await axios.post(
      `${API_URL}/locations`,
      {
        ...location,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al crear la ubicación:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Error inesperado al crear la ubicación:", error);
    }

    throw error;
  }
}