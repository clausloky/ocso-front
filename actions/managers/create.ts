"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function createManager(formData: FormData) {
  const manager: Record<string, any> = {};

  for (const key of formData.keys()) {
    manager[key] = formData.get(key);
  }

  const response = await fetch(`${API_URL}/managers`, {
    method: "POST",
    body: JSON.stringify(manager),
    headers: {
      ...(await AuthHeaders()),
    },
  });

  if (response.status === 201) {
    revalidateTag("dashboard:managers");
  }

  return response;
}