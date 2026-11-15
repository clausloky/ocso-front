"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function updateEmployee(
  employeeId: string,
  formData: FormData
) {
  const filteredFormData = new FormData();

  formData.forEach((value, key) => {
    if (key.startsWith("$ACTION")) {
      return;
    }

    if (typeof value !== "string" && value.size === 0) {
      return;
    }

    filteredFormData.append(key, value);
  });

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

  
  console.log(response.json());

  revalidateTag("dashboard:employees");
  revalidatePath(`/dashboard/employees/${employeeId}`);
}