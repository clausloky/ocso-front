"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export default async function deleteLocation() {
  const token = (await cookies()).get(TOKEN_NAME)?.value;

  await axios.delete(`${API_URL}/locations/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}