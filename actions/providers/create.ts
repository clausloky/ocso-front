"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export type CreateProviderState = {
  success?: boolean;
  error?: string;
};

export async function createProvider(
  _previousState: CreateProviderState,
  formData: FormData
): Promise<CreateProviderState> {
  const providerName = formData.get("providerName");
  const providerEmail = formData.get("providerEmail");
  const providerPhoneNumber = formData.get("providerPhoneNumber");

  if (
    typeof providerName !== "string" ||
    !providerName.trim() ||
    providerName.trim().length > 100
  ) {
    return { error: "Ingresa un nombre de proveedor de hasta 100 caracteres." };
  }

  if (
    typeof providerEmail !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(providerEmail.trim())
  ) {
    return { error: "Ingresa un correo electrónico válido." };
  }

  if (
    typeof providerPhoneNumber !== "string" ||
    providerPhoneNumber.trim().length > 15
  ) {
    return { error: "El teléfono no puede exceder 15 caracteres." };
  }

  const provider = {
    providerName: providerName.trim(),
    providerEmail: providerEmail.trim(),
    ...(providerPhoneNumber.trim()
      ? { providerPhoneNumber: providerPhoneNumber.trim() }
      : {}),
  };

  const response = await fetch(`${API_URL}/providers`, {
    method: "POST",
    body: JSON.stringify(provider),
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeaders()),
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    return {
      error: `No se pudo crear el proveedor (${response.status}). ${errorDetails}`,
    };
  }

  revalidateTag("dashboard:providers");
  return { success: true };
}
