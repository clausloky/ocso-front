import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import createProduct from "@/actions/products/create";
import SelectProvider from "./_components/SelectProvider";
import { Input, Button } from "@nextui-org/react";
import { LuDollarSign } from "react-icons/lu";

const ProductsPage = async () => {
  const responseProviders = await fetch(`${API_URL}/providers`, {
    headers: {
      ...AuthHeaders(),
    },
    next: {
      tags: ["dashboard:providers"],
    },
  });

  const providers = await responseProviders.json();

  return (
    <form
      action={createProduct}
      className="w-full flex flex-col px-40 justify-center gap-4"
    >
      <h1 className="text-2xl font-bold">
        Crear Producto
      </h1>

      <Input
        label="Nombre"
        name="productName"
      />

      <Input
        label="Precio"
        name="price"
        endContent={<LuDollarSign size="20" />}
      />

      <Input
        label="Num. de Sellos"
        name="countSeal"
      />

      <SelectProvider providers={providers} />

      <Button
        color="primary"
        type="submit"
      >
        Crear Producto
      </Button>
    </form>
  );
};

export default ProductsPage;