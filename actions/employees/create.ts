"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function createEmployee(formData: FormData) {
  const filteredFormData = new FormData();

  formData.forEach((value, key) => {
    if (!key.startsWith("$ACTION")) {
      filteredFormData.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      ...AuthHeaders(),
    },
    body: filteredFormData,
  });

  console.log(await response.json());

  revalidateTag("dashboard:employees");
}