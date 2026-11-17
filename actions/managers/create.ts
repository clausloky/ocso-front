"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function createManager(formData: FormData) {
  let manager: any = {};

  for (const key of formData.keys()) {
    manager[key] = formData.get(key);
  }

  manager.managerSalary = +manager.managerSalary;

  if (manager.location) {
    manager.location = {
      locationId: +manager.location,
    };
  } else {
    delete manager.location;
  }

  const response = await fetch(`${API_URL}/managers`, {
    method: "POST",
    body: JSON.stringify(manager),
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeaders()),
    },
  });

  if (response.status === 201) {
    revalidateTag("dashboard:managers");
  }

}