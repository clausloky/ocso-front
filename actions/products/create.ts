"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { revalidateTag } from "next/cache";

export default async function createProduct(formData: FormData) {
  const product: any = {};

  for (const key of formData.keys()) {
    if (!key.includes("$ACTION_ID")) {
      product[key] = formData.get(key);
    }
  }

  product.price = Number(product.price);
  product.countSeal = Number(product.countSeal);

  console.log("PRODUCT ENVIADO:", product);

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      ...AuthHeaders(),
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("RESPUESTA BACKEND:", data);

  if (response.status === 201) {
    revalidateTag("dashboard:products");
  }
}