"use client";

import ProductCard from "../../providers/[id]/_components/ProductCard";
import { Product } from "@/entities";
import { Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Provider } from "@/entities";

export default function FilteredCards({
  products, providers,
}: {
  products: Product[];
  providers: Provider[]
}) {
  const [filtered, setFiltered] = useState<string>("");
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [provider, setProvider] = useState<string>("");

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      console.log(product);
      return (
        product.productName
          .toLowerCase()
          .includes(filtered.toLowerCase()) &&
        (!provider || String(product?.provider?.providerId) === provider)
      );
    });

    setProductsList(filteredProducts);
  }, [filtered, provider, products]);

  return (
    <div className="max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col gap-8 border-r-orange-400 border-r-2 px-10 pt-10">
      <Input
        onChange={(e) => {
          setFiltered(e.target.value);
        }}
        label="Nombre del producto"
      />

      <Select
        label="Proveedor"
        onChange={(e) => setProvider(e.target.value)}
      >
        {providers.map((provider) => (
          <SelectItem
            key={provider.providerId}
            value={provider.providerId}
          >
            {provider.providerName}
          </SelectItem>
        ))}
      </Select>

      {productsList.map((product) => {
        return (
          <Link
            key={product.productId}
            href={{
              pathname: `/dashboard/products/${product.productId}`,
            }}
          >
            <ProductCard product={product} />
          </Link>
        );
      })}
    </div>
  );
}