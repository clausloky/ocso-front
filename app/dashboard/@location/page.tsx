import axios from "axios";

import { Location } from "@/entities";
import { API_URL } from "@/constants";

import SelectLocation from "./_components/SelectLocation";

import LocationCard from "./_components/LocationCard";

import FormNewLocation from "./_components/FormNewLocation";

import DeleteLocationButton from "./_components/DeleteLocationButton";
import { AuthHeaders } from "@/helpers/authHeaders";

interface CountPageProps {
  searchParams: {
    store?: string;
  };
}

const CountPage = async ({searchParams} : CountPageProps) => {

  let { data } = await axios.get<Location[]>(
    `${API_URL}/locations`,
    {
      headers: {
        ...AuthHeaders()
      }
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
        <div className="w-8/12 my-10">
          <LocationCard store={searchParams.store}/>
        </div>
        <div className="w-6/12 my-10">
          <FormNewLocation/>
        </div>
        <div>
          <DeleteLocationButton store={searchParams.store} />
        </div>
      </div>
    </div>
  );
};

export default CountPage;