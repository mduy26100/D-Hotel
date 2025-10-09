import { useEffect, useState } from "react";
import { hotelByCategoriesIdAPI } from "../../api/hotels/hotels";
import HotelCard from "../../components/hotels/HotelCard";

function HotelsByCategory({ categoryId }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelByCategoriesIdAPI(categoryId);
        setHotels(data);
      } catch (err) {
        setError(err.message || "Failed to load hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [categoryId]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (hotels.length === 0) return <div>Không có khách sạn nào</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
    </div>
  );
}

export default HotelsByCategory;
