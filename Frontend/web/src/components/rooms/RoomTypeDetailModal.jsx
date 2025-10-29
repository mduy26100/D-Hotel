import { Modal, Carousel, Spin, Divider, Image } from "antd";

const RoomTypeDetailModal = ({
  visible,
  onClose,
  roomDetail,
  loading,
  error,
}) => {
  const formatTime = (time) => (time ? time.slice(0, 5) : "--:--");
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("vi-VN") : "--/--/----";

  return (
    <Modal
      open={visible}
      title={roomDetail?.name || "Room Details"}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      bodyStyle={{ padding: "24px" }}
    >
      {loading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Error loading room details</p>
      ) : (
        <div className="space-y-6">
          {/* Carousel + Image Preview */}
          {roomDetail?.roomImages?.length > 0 && (
            <div className="rounded-lg overflow-hidden shadow-md">
              <Carousel dots autoplay>
                {roomDetail.roomImages.map((img) => (
                  <div
                    key={img.id}
                    className="h-80 flex justify-center items-center bg-gray-100"
                  >
                    <Image
                      src={img.imgUrl}
                      alt={roomDetail.name}
                      preview={{
                        mask: <div className="text-white">🔍 View</div>,
                      }}
                      className="object-cover h-80 w-full rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* Description */}
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-gray-700 text-base">
              {roomDetail?.description || "No description available."}
            </p>
          </div>

          {/* Pricing */}
          <div className="p-6 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <h4 className="text-xl font-bold text-purple-800 mb-4">Pricing</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>💰 Base Hourly Price</span>
                <span className="font-semibold">
                  {roomDetail?.baseHourlyPrice?.toLocaleString("vi-VN") || "-"}{" "}
                  VND
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>⏱ Base Hours</span>
                <span className="font-semibold">
                  {roomDetail?.baseHours || "-"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>💸 Extra Hour Price</span>
                <span className="font-semibold">
                  {roomDetail?.extraHourPrice?.toLocaleString("vi-VN") || "-"}{" "}
                  VND
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>🏨 Overnight Price</span>
                <span className="font-semibold">
                  {roomDetail?.overnightPrice?.toLocaleString("vi-VN") || "-"}{" "}
                  VND
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>🛌 Daily Price</span>
                <span className="font-semibold">
                  {roomDetail?.dailyPrice?.toLocaleString("vi-VN") || "-"} VND
                </span>
              </div>
            </div>
          </div>

          {/* Room Info */}
          <div className="p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <h4 className="text-xl font-bold text-blue-800 mb-4">Room Info</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>📏 Area</span>
                <span className="font-semibold">
                  {roomDetail?.area || "-"} m²
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>🛏 Bed Type</span>
                <span className="font-semibold">
                  {roomDetail?.bedType?.name || "-"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>👥 Max Guests</span>
                <span className="font-semibold">
                  {roomDetail?.quantityGuest?.maxGuests || "-"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>👶 Children Allowed</span>
                <span className="font-semibold">
                  {roomDetail?.quantityGuest?.childrenAllowed ? "Yes" : "No"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>🏷 Purpose</span>
                <span className="font-semibold">
                  {roomDetail?.roomPurpose?.name || "-"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
                <span>Status</span>
                <span
                  className={`font-semibold ${
                    roomDetail?.isActive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {roomDetail?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Utilities */}
          {roomDetail?.utilities?.length > 0 && (
            <div className="p-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              <h4 className="text-xl font-bold text-green-800 mb-4">
                Utilities
              </h4>
              <div className="space-y-3">
                {roomDetail.utilities.map((u) => (
                  <div
                    key={u.id}
                    className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <p className="font-semibold text-gray-800 mb-1">{u.name}</p>
                    <ul className="list-disc ml-5 text-gray-600">
                      {u.utilityItems?.map((item) => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default RoomTypeDetailModal;
