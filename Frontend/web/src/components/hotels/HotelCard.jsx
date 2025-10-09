import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={hotel.imgUrl} alt={hotel.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h2>
        <p className="text-sm text-gray-600 mb-2">📍 {hotel.address}</p>
        <p className="text-sm text-gray-500 line-clamp-2">{hotel.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              hotel.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {hotel.isActive ? "Đang hoạt động" : "Tạm ngưng"}
          </span>
          <button
            className="text-primary font-medium text-sm hover:underline"
            onClick={handleDetailsClick}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
