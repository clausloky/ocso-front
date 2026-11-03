import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import ProviderCard from "../_components/ProviderCard";

const ProviderPage = async () => {
  const response = await fetch(`${API_URL}/providers`, {
    headers: {
      ...AuthHeaders(),
    },
  });

  const providers: Provider[] = await response.json();

  return (
    <div className="w-full flex-row flex-wrap px-10">
      {providers.map((provider: Provider) => (
        <ProviderCard
          provider={provider}
          key={provider.providerId}
        />
      ))}
    </div>
  );
};

export default ProviderPage;