import { Product, Provider } from "@/entities";
import updateProduct from "@/actions/products/update";
import { Input, Button } from "@nextui-org/react";
import SelectProvider from "../../_components/SelectProvider";
import { LuCheck } from "react-icons/lu";
import DeleteProduct from "./DeleteProduct";

export default function UpdateProduct({
  product,
  providers,
}: {
  product: Product;
  providers: Provider[];
}) {
  const { productId } = product;

  const updateProductById = updateProduct.bind(null, productId);

  return (
    <form
      action={updateProductById}
      className="w-full flex flex-col px-40 justify-center gap-4"
    >
      <h1 className="text-2xl font-bold">
        Actualizar Producto
      </h1>

      <Input
        name="productName"
        label="Nombre"
        defaultValue={product.productName}
      />

      <Input
        name="countSeal"
        label="Num. de Sellos"
        defaultValue={String(product.countSeal)}
      />

      <Input
        name="price"
        label="Precio"
        defaultValue={String(product.price)}
      />

      <SelectProvider
        providers={providers}
        defaultProvider={product.provider?.providerId}
      />

      <div className="flex flex-row gap-10 flex-grow-0">
        <Button type="submit" color="primary">
          <LuCheck />
        </Button>
      </div>
    </form>
  );
}