// components/hotels/HotelDetails.jsx
import { useHotelDetails } from "../../hooks/hotels/hotels/useHotelDetails";

function HotelDetails({ hotelId }) {
  const { hotel, loading, error } = useHotelDetails(hotelId);

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

  if (!hotel)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Không tìm thấy khách sạn
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={hotel.imgUrl}
          alt={hotel.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <p className="text-gray-600 mb-2">📍 {hotel.address}</p>
          <p className="text-gray-500 mb-4">{hotel.description}</p>
          <p className="text-sm font-medium mb-4">
            Trạng thái:{" "}
            <span
              className={`px-2 py-1 rounded-full ${
                hotel.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {hotel.isActive ? "Đang hoạt động" : "Tạm ngưng"}
            </span>
          </p>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Danh mục:</h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              {hotel.category.name}
            </span>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Vị trí:</h2>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
              {hotel.location.name}
            </span>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Tiện ích:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hotel.utilities.map((util) => (
                <div key={util.id} className="flex items-start space-x-2">
                  <img
                    src={util.iconUrl}
                    alt={util.name}
                    className="w-8 h-8 object-cover"
                  />
                  <div>
                    <p className="font-medium">{util.name}</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {util.utilityItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
