"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function updateManager(
  managerId: string,
  formData: FormData
) {
  const manager: Record<string, any> = {};

  for (const key of formData.keys()) {
    manager[key] = formData.get(key);
  }

  const response = await fetch(
    `${API_URL}/managers/${managerId}`,
    {
      method: "PATCH",
      body: JSON.stringify(manager),
      headers: {
        "Content-Type": "application/json",
        ...(await AuthHeaders()),
      },
    }
  );

  if (response.status === 200) {
    revalidateTag("dashboard:managers");
    revalidateTag(`dashboard:managers:${managerId}`);
  }

  return response;
}