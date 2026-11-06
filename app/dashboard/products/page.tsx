import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { AuthHeaders } from "@/helpers/AuthHeaders";

import FilteredCards from "./_components/FilterCards";

const ProductsPage = async () => {
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:products"],
    },
  });

  const products: Product[] = await response.json();

  return (
    <div className="flex flex-wrap gap-10">
        <FilteredCards products={products}></FilteredCards>
    </div>
   );
};

export default ProductsPage;