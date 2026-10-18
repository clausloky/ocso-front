import axios from "axios";

const CountPage = async () => {
    const countLocations = await axios.get("http://localhost:4000/locations");
    console.log(countLocations?.data);
    return "Locations: " + countLocations?.data?.length;
}

export default CountPage;