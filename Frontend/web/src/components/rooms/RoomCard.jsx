import dayjs from "dayjs";
import { Carousel, Image } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
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
  } = room;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // === Format helpers ===
  const formatTime = (time) => {
    if (!time) return "--:--";
    return time.slice(0, 5);
  };

  const formatDate = (date) =>
    date ? dayjs(date).format("DD/MM/YYYY") : "--/--/----";

  // === Handle preview click ===
  const handlePreview = (imgUrl) => {
    setPreviewImage(imgUrl);
    setPreviewVisible(true);
  };

  const navigate = useNavigate();

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
      {/* === Room images carousel === */}
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

      {/* Preview modal (Ant Design) */}
      <Image
        src={previewImage}
        preview={{
          visible: previewVisible,
          onVisibleChange: (visible) => setPreviewVisible(visible),
        }}
        style={{ display: "none" }}
      />

      {/* === Room info === */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {name}
        </h3>

        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
            {description}
          </p>
        )}

        {/* === Price === */}
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

        {/* === Booking Info === */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm leading-relaxed space-y-1">
          <p className="text-gray-700 font-semibold mb-1">
            🏷 <span className="font-semibold text-gray-700">Room Type:</span>{" "}
            <span className="text-orange-600 font-medium">
              {displayType || "Not specified"}
            </span>
          </p>

          {/* === Số lượng phòng còn lại === */}
          <p className="text-gray-700 font-semibold mb-1">
            🛏 <span className="font-semibold text-gray-700">Available:</span>{" "}
            {quantity > 0 ? (
              <span className="text-green-600 font-medium">
                {quantity} room{quantity > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-red-500 font-medium">Sold Out</span>
            )}
          </p>

          {/* === Trạng thái phòng === */}
          <p className="text-gray-700 font-semibold mb-1">
            ⚡ <span className="font-semibold text-gray-700">Status:</span>{" "}
            {isActive ? (
              <span className="text-green-600 font-medium">Active</span>
            ) : (
              <span className="text-gray-500 font-medium">Inactive</span>
            )}
          </p>

          <p className="text-gray-600">
            🗓 <strong>From:</strong> {formatDate(displayStartDate)} –{" "}
            {formatTime(displayStartTime)}
          </p>

          <p className="text-gray-600">
            🕓 <strong>To:</strong> {formatDate(displayEndDate)} –{" "}
            {formatTime(displayEndTime)}
          </p>
        </div>

        {/* === Action button === */}
        <button
          className={`w-full font-semibold py-2 px-4 rounded-lg transition mb-3 ${
            quantity > 0 && isActive
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={quantity <= 0 || !isActive}
          onClick={handleBookNow}
        >
          Book Now
        </button>

        {/* === Extra info === */}
        <div className="text-gray-500 text-xs space-y-1">
          <p>💳 All payment methods supported</p>
          <p>ℹ Free cancellation policy</p>
          <p className="text-orange-500 cursor-pointer hover:underline">
            View room details &rarr;
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
