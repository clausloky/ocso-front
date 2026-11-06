"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function deleteProvider(
  providerId: string,
  formData: FormData
) {
  const response = await fetch(
    `${API_URL}/providers/${providerId}`,
    {
      method: "DELETE",
      headers: {
        ...AuthHeaders(),
      },
    }
  );

  if (response.status === 200) {
    revalidateTag("dashboard:providers");
  }
}