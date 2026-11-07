import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import UpdateProduct from "./_components/UpdateProduct";
import DeleteProduct from "./_components/DeleteProduct";

export default async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const responseProduct = await fetch(
    `${API_URL}/products/${params.id}`,
    {
      headers: {
        ...AuthHeaders(),
      },
      next: {
        tags: [`dashboard:products:${params.id}`],
      },
    }
  );

  const product: Product = await responseProduct.json();

  const responseProviders = await fetch(
    `${API_URL}/providers`,
    {
      headers: {
        ...AuthHeaders(),
      },
    }
  );

  const providers: Provider[] = await responseProviders.json();

  return (
    <div className="w-full">
      <div className="bg-orange-600">
        <h1 className="w-full font-bold text-white text-center text-2xl py-2">
          Nombre del producto: {product.productName}
        </h1>

        <h2 className="text-xl font-bold text-white text-center">
          Precio: {product.price}
        </h2>

        <h2 className="text-md font-bold text-white text-center">
          Cant. de Sellos: {product.countSeal}
        </h2>
      </div>

      <UpdateProduct
        product={product}
        providers={providers}
      />

      <DeleteProduct productId={product.productId} />
    </div>
  );
}