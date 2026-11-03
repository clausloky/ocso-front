
"use server";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createManager(
  managerId: string,
  formData: FormData
) {
  const response = await fetch(`${API_URL}/managers/${managerId}`, {
    method: "DELETE",
    headers: {
      ...AuthHeaders(),
    },
  });

  if (response.status === 200) {
    revalidateTag("dashboard:managers");
    redirect("/dashboard/managers");
  }
}
