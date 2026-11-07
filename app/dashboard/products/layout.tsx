import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import FilteredCards from "./_components/FilterCards";

const LayoutProducts = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const responseProducts = await fetch(`${API_URL}/products`, {
    headers: {
      ...AuthHeaders(),
    },
    next: {
      tags: ["dashboard:products"],
    },
  });

  const products: Product[] = await responseProducts.json();

  const responseProviders = await fetch(`${API_URL}/providers`, {
    headers: {
      ...AuthHeaders(),
    },
    next: {
      tags: ["dashboard:providers"],
    },
  });

  const providers: Provider[] = await responseProviders.json();

  return (
        <div className="h-[90vh] w-full flex flex-row">
            <div className="w-3/12">
            <FilteredCards
                products={products}
                providers={providers}
            />
            </div>

            <div className="w-9/12">
            {children}
            </div>
        </div>
    );
};

export default LayoutProducts;