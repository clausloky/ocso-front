import axios from "axios";
import { cookies } from "next/headers";

import { Location } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";

import SelectLocation from "./_components/SelectLocation";

const CountPage = async () => {
  const userCookies = cookies();

  const token = userCookies.get(TOKEN_NAME)?.value;

  const { data } = await axios.get<Location[]>(
    API_URL + ":4000/locations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    <div className="w-2/12">
      <SelectLocation locations={data} />
    </div>
  );
};

export default CountPage;