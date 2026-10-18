
import axios from "axios";
import { cookies } from "next/headers";

const CountPage = async () => {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) {
    return "No se encontró el token de autenticación";
  }

  const countLocations = await axios.get(
    "http://localhost:4000/locations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(countLocations.data);

  return "Locations: " + countLocations.data.length;
};

export default CountPage;
