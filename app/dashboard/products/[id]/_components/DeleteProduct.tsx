import deleteProduct from "@/actions/products/delete";
import { Button } from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";

type DeleteProductProps = {
  productId: string;
};

export default function DeleteProduct({
  productId,
}: DeleteProductProps) {
  const deleteProductById = deleteProduct.bind(null, productId);

  return (
    <form action={deleteProductById}>
      <Button color="danger" type="submit">
        <LuTrash size={20} />
      </Button>
    </form>
  );
}