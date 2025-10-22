"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  DollarSign,
  Info,
  Grid3x3,
  Users,
  ImageIcon,
  Pencil,
  Plus,
} from "lucide-react";
import { Modal, Spin, Divider, Tag, Button } from "antd";
import { useGetRoomTypeDetails } from "../../../hooks/rooms/roomTypes/useGetRoomTypeDetails";
import RoomImageUpsertModal from "./RoomImageUpsertModal";
import UpsertRoomUtilitiesModal from "./UpsertRoomUtilitiesModal";
import UpsertRoomTypePurposeModal from "./UpsertRoomTypePurposeModal";

const RoomDetail = ({ roomTypeId, open, onClose }) => {
  // 🔹 Hooks & State
  const { details, loading, refetch } = useGetRoomTypeDetails(roomTypeId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRoomUtilityModalOpen, setIsRoomUtilityModalOpen] = useState(false);
  const [isTravelPurposeModalOpen, setIsTravelPurposeModalOpen] =
    useState(false);

  // 🔹 Handlers
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (details?.roomImages?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (details?.roomImages?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = () => {
    if (!details?.roomImages?.length) return;
    setModalMode("update");
    setSelectedImage(details.roomImages[currentImageIndex]);
    setIsModalOpen(true);
  };

  // 🔹 Render
  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Room Type Details
            </h2>
          </div>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={900}
        className="max-h-[90vh] overflow-y-auto rounded-xl"
        styles={{
          padding: "24px",
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spin size="large" />
          </div>
        ) : !details ? (
          <p className="text-center text-gray-500 py-8">
            No details available.
          </p>
        ) : (
          <>
            {/* 🖼️ Image Carousel & Buttons */}
            {details.roomImages?.length > 0 && (
              <div className="flex justify-center mb-6">
                <div className="w-full max-w-2xl relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                  <img
                    src={
                      details.roomImages[currentImageIndex]?.imgUrl ||
                      "/placeholder.svg"
                    }
                    alt={details.name}
                    className="w-full h-full object-cover"
                  />
                  {details.roomImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-900" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-900" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {details.roomImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition ${
                              idx === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4 mb-6">
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus className="w-4 h-4" /> Add Image
              </button>
              <button
                onClick={openUpdateModal}
                disabled={!details.roomImages?.length}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                <Pencil className="w-4 h-4" /> Update Current Image
              </button>
            </div>

            <Divider />

            {/* 🧾 Basic Info */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Basic Info
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <InfoRow label="Name" value={details.name} />
                <InfoRow label="Area" value={details.area} />
                <InfoRow label="Quantity" value={details.quantity} />
                <InfoRow
                  label="Room Purpose"
                  value={details.roomPurpose?.name || "N/A"}
                />
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Status:</span>
                  <Tag
                    color={details.isActive ? "green" : "red"}
                    className="font-medium"
                  >
                    {details.isActive ? "Active" : "Inactive"}
                  </Tag>
                </div>
              </div>
            </section>

            <Divider />

            {/* 📝 Description */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Grid3x3 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-200">
                {details.description || "No description provided."}
              </p>
            </section>

            <Divider />

            {/* 💰 Detailed Pricing */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Detailed Pricing
                </h3>
              </div>

              <div className="space-y-6">
                {/* --- Thuê theo giờ --- */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    🕒 Hourly Rental
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                      label="Base Hourly Price"
                      value={
                        details.baseHourlyPrice
                          ? `${details.baseHourlyPrice.toLocaleString(
                              "vi-VN"
                            )}₫`
                          : "N/A"
                      }
                      strong
                    />
                    <InfoRow
                      label="Extra Hour Price"
                      value={
                        details.extraHourPrice
                          ? `${details.extraHourPrice.toLocaleString("vi-VN")}₫`
                          : "N/A"
                      }
                    />
                    <InfoRow
                      label="Base Hours"
                      value={details.baseHours ?? "N/A"}
                    />
                    <InfoRow
                      label="Max Hours"
                      value={details.maxHours ?? "N/A"}
                    />
                  </div>
                </div>

                {/* --- Thuê qua đêm --- */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    🌙 Overnight Rental
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                      label="Overnight Price"
                      value={
                        details.overnightPrice
                          ? `${details.overnightPrice.toLocaleString("vi-VN")}₫`
                          : "N/A"
                      }
                      strong
                    />
                    <InfoRow
                      label="Overnight Time"
                      value={
                        details.overnightStartTime && details.overnightEndTime
                          ? `${details.overnightStartTime} → ${details.overnightEndTime}`
                          : "N/A"
                      }
                    />
                  </div>
                </div>

                {/* --- Thuê theo ngày --- */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    ☀️ Daily Rental
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                      label="Daily Price"
                      value={
                        details.dailyPrice
                          ? `${details.dailyPrice.toLocaleString("vi-VN")}₫`
                          : "N/A"
                      }
                      strong
                    />
                    <InfoRow
                      label="Daily Time"
                      value={
                        details.dailyStartTime && details.dailyEndTime
                          ? `${details.dailyStartTime} → ${details.dailyEndTime}`
                          : "N/A"
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* 🛏️ Bed & Guest Info */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Bed & Guest Info
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                {details.bedType ? (
                  <>
                    <InfoRow
                      label="Bed Type"
                      value={details.bedType.name}
                      strong
                    />
                    <InfoRow
                      label="Description"
                      value={details.bedType.description}
                    />
                    <InfoRow
                      label="Dimensions"
                      value={details.bedType.dimensions}
                    />
                    <InfoRow
                      label="Capacity"
                      value={details.bedType.capacity}
                    />
                    <InfoRow
                      label="Shared"
                      value={details.bedType.isShared ? "Yes" : "No"}
                    />
                  </>
                ) : (
                  <p className="text-gray-500">No bed type information.</p>
                )}

                {details.quantityGuest ? (
                  <>
                    <InfoRow
                      label="Guest Type"
                      value={details.quantityGuest.name}
                      strong
                    />
                    <InfoRow
                      label="Standard Guests"
                      value={details.quantityGuest.standardGuests}
                    />
                    <InfoRow
                      label="Max Guests"
                      value={details.quantityGuest.maxGuests}
                    />
                    <InfoRow
                      label="Extra Guest Charge"
                      value={`${details.quantityGuest.extraGuestCharge.toLocaleString(
                        "vi-VN"
                      )}₫`}
                    />
                    <InfoRow
                      label="Children Allowed"
                      value={
                        details.quantityGuest.childrenAllowed ? "Yes" : "No"
                      }
                    />
                    <InfoRow
                      label="Max Children"
                      value={details.quantityGuest.maxChildren}
                    />
                  </>
                ) : (
                  <p className="text-gray-500">No guest limit information.</p>
                )}
              </div>
            </section>

            <Divider />

            {/* ⚙️ Utilities */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Grid3x3 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Utilities
                </h3>
              </div>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setIsRoomUtilityModalOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-white ${
                    details.utilities?.length
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {details.utilities?.length ? (
                    <>
                      <Pencil className="w-4 h-4" /> Update Utilities
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add Utilities
                    </>
                  )}
                </button>
              </div>
              {details.utilities?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {details.utilities.map((util) => (
                    <div
                      key={util.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={util.iconUrl || "/placeholder.svg"}
                          alt={util.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <span className="font-semibold text-gray-900">
                          {util.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {util.utilityItems?.length
                          ? util.utilityItems.map((u) => u.name).join(", ")
                          : "No utility items"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No utilities found.</p>
              )}
            </section>

            <Divider />

            {/* 🎯 Room Purpose */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Room Purpose
                </h3>
              </div>
              <div className="flex justify-start mb-4">
                <Button
                  type={details.roomPurpose ? "default" : "primary"}
                  icon={details.roomPurpose ? <Pencil /> : <Plus />}
                  onClick={() => setIsTravelPurposeModalOpen(true)}
                >
                  {details.roomPurpose ? "Update Purpose" : "Add Purpose"}
                </Button>
              </div>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {details.roomPurpose
                  ? `Current purpose: ${details.roomPurpose.name}`
                  : "No room purpose set yet."}
              </p>
            </section>

            <Divider />

            {/* 💵 Price Info */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Price Info
                </h3>
              </div>

              {details.roomTypePrice ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {/* Price Type */}
                  <InfoRow
                    label="Price Type"
                    value={details.roomTypePrice.priceType}
                  />

                  {/* Base Hourly Price */}
                  <InfoRow
                    label="Base Hourly Price"
                    value={
                      details.roomTypePrice.baseHourlyPrice
                        ? `${details.roomTypePrice.baseHourlyPrice.toLocaleString(
                            "vi-VN"
                          )}₫`
                        : "N/A"
                    }
                    strong
                  />

                  {/* Extra Hour Price */}
                  <InfoRow
                    label="Extra Hour Price"
                    value={
                      details.roomTypePrice.extraHourPrice
                        ? `${details.roomTypePrice.extraHourPrice.toLocaleString(
                            "vi-VN"
                          )}₫`
                        : "N/A"
                    }
                  />

                  {/* Overnight Price */}
                  <InfoRow
                    label="Overnight Price"
                    value={
                      details.roomTypePrice.overnightPrice
                        ? `${details.roomTypePrice.overnightPrice.toLocaleString(
                            "vi-VN"
                          )}₫`
                        : "N/A"
                    }
                  />

                  {/* Daily Price */}
                  <InfoRow
                    label="Daily Price"
                    value={
                      details.roomTypePrice.dailyPrice
                        ? `${details.roomTypePrice.dailyPrice.toLocaleString(
                            "vi-VN"
                          )}₫`
                        : "N/A"
                    }
                  />

                  {/* Start & End Dates */}
                  <InfoRow
                    label="Start Date"
                    value={new Date(
                      details.roomTypePrice.startDate
                    ).toLocaleDateString("vi-VN")}
                  />
                  <InfoRow
                    label="End Date"
                    value={new Date(
                      details.roomTypePrice.endDate
                    ).toLocaleDateString("vi-VN")}
                  />

                  {/* Active status */}
                  <InfoRow
                    label="Active"
                    value={
                      details.roomTypePrice.isActive ? (
                        <Tag color="green">Yes</Tag>
                      ) : (
                        <Tag color="red">No</Tag>
                      )
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-500">No price info available.</p>
              )}
            </section>
          </>
        )}
      </Modal>

      {/* 🪟 Modals */}
      {isModalOpen && (
        <RoomImageUpsertModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          roomTypeId={roomTypeId}
          imageToUpdate={selectedImage}
          onSuccess={() => refetch()}
        />
      )}

      {isRoomUtilityModalOpen && (
        <UpsertRoomUtilitiesModal
          isOpen={isRoomUtilityModalOpen}
          onClose={() => setIsRoomUtilityModalOpen(false)}
          room={details}
          refetch={refetch}
        />
      )}

      {isTravelPurposeModalOpen && (
        <UpsertRoomTypePurposeModal
          room={details}
          isOpen={isTravelPurposeModalOpen}
          onClose={() => setIsTravelPurposeModalOpen(false)}
          refetch={refetch}
        />
      )}
    </>
  );
};

// 🔹 InfoRow Subcomponent
const InfoRow = ({ label, value, strong = false }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-700">{label}:</span>
    <span
      className={`text-gray-900 ${strong ? "font-semibold" : "font-normal"}`}
    >
      {value}
    </span>
  </div>
);

export default RoomDetail;
