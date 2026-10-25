import axios from "axios";
import { cookies } from "next/headers";

import { Location } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";

import SelectLocation from "./_components/SelectLocation";

interface CountPageProps {
  searchParams: {
    store?: string;
  };
}

const CountPage = async ({searchParams} : CountPageProps) => {
  const userCookies = cookies();

  const token = userCookies.get(TOKEN_NAME)?.value;
  if (!token) {
    throw new Error(`No se encontró la cookie de autenticación "${TOKEN_NAME}".`);
  }

  let { data } = await axios.get<Location[]>(
    `${API_URL}/locations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);

  data = [
    {
      locationId: 0,
      locationName: "Ninguna",
      locationLatLng: [0, 0],
      locationAdress: ""
    }, ...data
  ];

  return (
    <div className="w-5/12">
      <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
        <div className="w-1/2 my-10">
          <SelectLocation locations={data} store={searchParams.store} />
        </div>
      </div>
    </div>
  );
};

export default CountPage;