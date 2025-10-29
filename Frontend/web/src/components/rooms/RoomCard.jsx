import dayjs from "dayjs";
import { Carousel, Image } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomTypeDetailModal from "./RoomTypeDetailModal";
import { useRoomsTypeDetail } from "../../hooks/rooms/roomTypes/useRoomsTypeDetail";

const RoomCard = ({ room, hotelIsActive }) => {
  const {
    name,
    description,
    quantity,
    isActive,
    displayPrice,
    originalPrice,
    displayType,
    displayStartTime,
    displayEndTime,
    displayStartDate,
    displayEndDate,
    images,
    id: roomTypeId,
  } = room;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // === Fetch room detail here and pass down to modal ===
  const { data: roomDetail, loading, error } = useRoomsTypeDetail(roomTypeId);

  const navigate = useNavigate();

  const formatTime = (time) => (time ? time.slice(0, 5) : "--:--");
  const formatDate = (date) =>
    date ? dayjs(date).format("DD/MM/YYYY") : "--/--/----";

  const handlePreview = (imgUrl) => {
    setPreviewImage(imgUrl);
    setPreviewVisible(true);
  };

  const handleBookNow = () => {
    const mainImageUrl =
      images && images.length > 0 ? images[0].imgUrl : "/default-room.jpg";
    const params = new URLSearchParams({
      hotelSn: room.hotelId,
      roomTypeSn: room.id,
      checkInDatePlan: dayjs(room.displayStartDate).format("YYYY-MM-DD"),
      startDate: dayjs(room.displayStartDate).format("YYYY-MM-DD"),
      startTime: room.displayStartTime,
      endDate: dayjs(room.displayEndDate).format("YYYY-MM-DD"),
      endTime: room.displayEndTime,
      rentalPrice: room.displayPrice,
      rentalType: room.displayType,
      roomName: room.name,
      imageUrl: mainImageUrl,
    });

    navigate(`/checkout/${encodeURIComponent(room.name)}?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow hover:shadow-lg transition flex flex-col">
      {/* Images Carousel */}
      <div className="relative w-full h-56 overflow-hidden">
        {images && images.length > 0 ? (
          <Carousel dots autoplay className="h-full" arrows adaptiveHeight>
            {images.map((img) => (
              <div key={img.id} className="h-56">
                <img
                  src={img.imgUrl}
                  alt={name}
                  onClick={() => handlePreview(img.imgUrl)}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <img
            src="/default-room.jpg"
            alt="Default room"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <Image
        src={previewImage}
        preview={{
          visible: previewVisible,
          onVisibleChange: (visible) => setPreviewVisible(visible),
        }}
        style={{ display: "none" }}
      />

      {/* Room Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {name}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          {originalPrice && displayPrice < originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {originalPrice.toLocaleString("vi-VN")} VND
            </span>
          )}
          <span className="text-orange-500 font-bold text-lg">
            {displayPrice.toLocaleString("vi-VN")} VND
          </span>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
            -10%
          </span>
        </div>

        {/* Booking Info */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm leading-relaxed space-y-1">
          <p className="text-gray-700 font-semibold mb-1">
            🏷 Room Type:{" "}
            <span className="text-orange-600 font-medium">
              {displayType || "Not specified"}
            </span>
          </p>
          <p className="text-gray-700 font-semibold mb-1">
            🛏 Available:{" "}
            {quantity > 0 ? (
              <span className="text-green-600 font-medium">
                {quantity} room{quantity > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-red-500 font-medium">Sold Out</span>
            )}
          </p>
          <p className="text-gray-700 font-semibold mb-1">
            ⚡ Status:{" "}
            {isActive ? (
              <span className="text-green-600 font-medium">Active</span>
            ) : (
              <span className="text-gray-500 font-medium">Inactive</span>
            )}
          </p>
          <p className="text-gray-600">
            🗓 From: {formatDate(displayStartDate)} –{" "}
            {formatTime(displayStartTime)}
          </p>
          <p className="text-gray-600">
            🕓 To: {formatDate(displayEndDate)} – {formatTime(displayEndTime)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            className={`w-full font-semibold py-2 px-4 rounded-lg transition ${
              quantity > 0 && isActive && hotelIsActive
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={quantity <= 0 || !isActive || !hotelIsActive}
            onClick={handleBookNow}
          >
            Book Now
          </button>

          <button
            className="w-full font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            onClick={() => setDetailModalVisible(true)}
          >
            View Room Details
          </button>
        </div>
      </div>

      {/* Room Detail Modal */}
      <RoomTypeDetailModal
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        roomDetail={roomDetail}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default RoomCard;
