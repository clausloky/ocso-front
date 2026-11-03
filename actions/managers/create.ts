"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function createManager(formData: FormData) {
  const manager: Record<string, unknown> = Object.fromEntries(
    formData.entries()
  );
  const salary = formData.get("managerSalary");

  if (
    typeof salary !== "string" ||
    salary.trim() === "" ||
    !Number.isFinite(Number(salary))
  ) {
    throw new Error("El salario del manager no es válido.");
  }

  manager.managerSalary = Number(salary);

  const locationId = formData.get("location");
  if (typeof locationId === "string" && locationId.trim() !== "") {
    const parsedLocationId = Number(locationId);
    if (!Number.isInteger(parsedLocationId) || parsedLocationId < 1) {
      throw new Error("La tienda seleccionada no es válida.");
    }

    manager.location = { locationId: parsedLocationId };
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

  return response;
}