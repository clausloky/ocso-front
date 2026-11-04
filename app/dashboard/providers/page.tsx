import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import Link from "next/link";
import ProviderCard from "./_components/ProviderCard";
import CreateProviderModal from "./_components/CreateProviderModal";

const ProviderPage = async () => {
  const response = await fetch(`${API_URL}/providers`, {
    headers: {
      ...(await AuthHeaders()),
    },
    next: {
      tags: ["dashboard:providers"],
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener los proveedores: ${response.status}`);
  }

  const providers: Provider[] = await response.json();

  return (
    <div className="flex flex-grow-0 flex-col items-end w-full px-10 pt-10 h-[90vh]">
      <CreateProviderModal />

      <div className="flex flex-wrap w-full py-20 flex-grow-0 gap-14">
        {providers.map((provider: Provider) => (
          <Link
            className="hover:scale-110 transition-transform"
            href={{ pathname: `/dashboard/providers/${provider.providerId}` }}
            key={provider.providerId}
          >
            <ProviderCard provider={provider} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProviderPage;