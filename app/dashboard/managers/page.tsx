import { LuPlus } from "react-icons/lu";
import ModalGeneric from "../_components/ModalGeneric";
import FormCreateManager from "./[id]/_components/FormCreateManager";
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/AuthHeaders";
import { Location } from "@/entities";

const ManagersPage = async () => {
  const responseStores = await fetch(`${API_URL}/locations`, {
    headers: {
      ...AuthHeaders(),
    },
    cache: "no-store",
  });

  const stores: Location[] = await responseStores.json();

  return (
    <ModalGeneric icon={<LuPlus size={20} />}>
      <FormCreateManager stores={stores} />
    </ModalGeneric>
  );
};

export default ManagersPage;