// RoomCard.jsx
const RoomCard = ({ room }) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow hover:shadow-lg transition flex flex-col">
    <div className="relative w-full h-48 overflow-hidden">
      <img
        src={room.imageUrl || "/default-room.jpg"}
        alt={room.name}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
        {room.name}
      </h3>

      {room.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
          {room.description}
        </p>
      )}

      <div className="flex items-baseline gap-2 mb-3">
        {room.originalPrice && room.displayPrice < room.originalPrice && (
          <span className="text-gray-400 line-through text-sm">
            {room.originalPrice.toLocaleString("vi-VN")} VNĐ
          </span>
        )}
        <span className="text-orange-500 font-bold text-lg">
          {room.displayPrice.toLocaleString("vi-VN")} VNĐ
        </span>
        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
          -10%
        </span>
      </div>

      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition mb-3">
        Đặt phòng
      </button>

      <div className="text-gray-500 text-xs space-y-1">
        <p>👜 Tất cả phương thức thanh toán</p>
        <p>ℹ Chính sách hủy phòng</p>
        <p className="text-orange-500 cursor-pointer">Chi tiết phòng &rarr;</p>
      </div>
    </div>
  </div>
);

export default RoomCard;
