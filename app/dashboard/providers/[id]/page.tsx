import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import Link from "next/link";
import ProviderCard from "../_components/ProviderCard";
import ProductCard from "./_components/ProductCard";

export default async function ProviderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await fetch(`${API_URL}/providers/${params.id}`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: [`dashboard:providers:${params.id}`],
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener el proveedor: ${response.status}`);
  }

  const provider: Provider = await response.json();

  return (
    <div className="flex flex-grow-0 flex-col pl-10 gap-10 h-[90vh] pt-10">
      <ProviderCard provider={provider} />

      <div className="h-1 bg-orange-900 w-[80vw]" />

      <div className="flex flex-wrap gap-10">
        {provider.products.map((product) => (
          <Link
            href={{
              pathname: `/dashboard/products/${product.productId}`,
            }}
            key={product.productId}
            className="hover:scale-110 transition-all"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}