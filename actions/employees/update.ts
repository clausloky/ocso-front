"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function updateEmployee(
  employeeId: string,
  formData: FormData
) {
  const filteredFormData = new FormData();

  formData.forEach((value, key) => {
    if (!key.startsWith("$ACTION")) {
      filteredFormData.append(key, value);
    }
  });

  console.log(employeeId);

  const response = await fetch(
    `${API_URL}/employees/${employeeId}`,
    {
      method: "PATCH",
      headers: {
        ...AuthHeaders(),
      },
      body: filteredFormData,
    }
  );

  if (response.status === 200) revalidateTag("dashboard:employees");

  console.log(await response.json());
}