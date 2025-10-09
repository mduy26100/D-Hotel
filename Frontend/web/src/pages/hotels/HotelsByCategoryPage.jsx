// pages/hotels/HotelsByCategoryPage.jsx
import { useParams } from "react-router-dom";
import HotelCard from "../../components/hotels/HotelCard";
import { useHotelsByCategory } from "../../hooks/hotels/hotels/useHotelsByCategory";

function HotelsByCategoryPage() {
  const { categoryId } = useParams();
  const { hotels, loading, error } = useHotelsByCategory(categoryId);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (hotels.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Không có khách sạn nào trong danh mục này.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          🏨 Khách sạn theo danh mục
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelsByCategoryPage;
