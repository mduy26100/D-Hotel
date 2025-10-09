// pages/hotels/HotelDetailsWrapper.jsx
import { useParams } from "react-router-dom";
import HotelDetails from "../../components/hotels/HotelDetails";

export default function HotelDetailsWrapper() {
  const { id } = useParams();
  return <HotelDetails hotelId={parseInt(id, 10)} />;
}
