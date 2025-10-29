import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Radio,
  Button,
  notification,
  Divider,
  Spin,
} from "antd";
import { useCreateBooking } from "../../hooks/bookings/useCreateBooking";
import { useUpdateBooking } from "../../hooks/bookings/useUpdateBooking";
import { useGetHotels } from "../../hooks/hotels/hotels/useGetHotels";
import { useRoomsByHotelId } from "../../hooks/rooms/roomTypes/useRoomsByHotelId";
import dayjs from "dayjs";

const { TextArea } = Input;

const STATUS_OPTIONS = [
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Checked In", value: "CheckedIn" },
  { label: "Checked Out", value: "CheckedOut" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "No Show", value: "NoShow" },
];

const UpsertBooking = ({ isOpen, onClose, refetch, bookingData }) => {
  const [form] = Form.useForm();
  const { hotels, loading: hotelLoading } = useGetHotels();
  const { createBooking } = useCreateBooking();
  const { updateBooking } = useUpdateBooking();
  const [submitting, setSubmitting] = useState(false);

  // State for hotel selection and filtering
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [rentalType, setRentalType] = useState("daily");
  const [filterParams, setFilterParams] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [shouldLoadRooms, setShouldLoadRooms] = useState(false);

  // Filter state
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [usageHours, setUsageHours] = useState(null);

  // Selected room data
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rentalPrice, setRentalPrice] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Hook để lấy rooms theo hotel
  const { rooms, loading: roomsLoading } = useRoomsByHotelId(
    shouldLoadRooms ? filterParams : null
  );

  // Initialize form với dữ liệu edit
  useEffect(() => {
    if (bookingData && isOpen) {
      setIsEditMode(true);

      form.setFieldsValue({
        guestName: bookingData.guestName,
        guestPhone: bookingData.guestPhone,
        guestEmail: bookingData.guestEmail,
        note: bookingData.note,
        status: bookingData.status || "Pending",
      });
    } else {
      resetForm();
      setIsEditMode(false);
    }
  }, [bookingData, isOpen, form]);

  const resetForm = () => {
    form.resetFields();
    setSelectedHotelId(null);
    setRentalType("daily");
    setFilterParams(null);
    setCheckInDate(null);
    setCheckOutDate(null);
    setCheckInTime(null);
    setUsageHours(null);
    setSelectedRoom(null);
    setRentalPrice(null);
    setStartTime(null);
    setEndTime(null);
    setIsFilterOpen(false);
    setShouldLoadRooms(false);
  };

  // Khi người dùng chọn hotel
  const handleHotelChange = (hotelId) => {
    setSelectedHotelId(hotelId);
    setRentalType("daily");
    setCheckInDate(null);
    setCheckOutDate(null);
    setCheckInTime(null);
    setUsageHours(null);
    setSelectedRoom(null);
    setRentalPrice(null);
    setStartTime(null);
    setEndTime(null);
    form.setFieldValue("roomTypeId", null);
    setShouldLoadRooms(false);
    setIsFilterOpen(true);
  };

  // Khi thay đổi rental type
  const handleRentalTypeChange = (e) => {
    const type = e.target.value;
    setRentalType(type);
    setCheckInDate(null);
    setCheckOutDate(null);
    setCheckInTime(null);
    setUsageHours(null);
    setSelectedRoom(null);
    setRentalPrice(null);
    setStartTime(null);
    setEndTime(null);
    form.setFieldValue("roomTypeId", null);
    setShouldLoadRooms(false);
  };

  // Xác nhận bộ lọc - gọi API lấy phòng với giá
  const handleConfirmFilter = () => {
    if (!selectedHotelId) {
      notification.error({
        message: "Error",
        description: "Please select a hotel first",
        placement: "topRight",
      });
      return;
    }

    if (!checkInDate) {
      notification.error({
        message: "Error",
        description: "Please select check-in date",
        placement: "topRight",
      });
      return;
    }

    if (rentalType === "hourly") {
      if (!checkInTime || !usageHours) {
        notification.error({
          message: "Error",
          description: "Please select check-in time and usage hours",
          placement: "topRight",
        });
        return;
      }
    }

    if (rentalType === "daily") {
      if (!checkOutDate) {
        notification.error({
          message: "Error",
          description: "Please select check-out date",
          placement: "topRight",
        });
        return;
      }
    }

    const params = { hotelId: selectedHotelId };

    if (rentalType === "hourly") {
      params.priceType = "hourly";
      params.startDate = checkInDate;
      params.checkInTime = checkInTime;
      params.usageHours = usageHours;
    } else if (rentalType === "overnight") {
      params.priceType = "overnight";
      params.startDate = checkInDate;
    } else if (rentalType === "daily") {
      params.priceType = "daily";
      params.startDate = checkInDate;
      params.endDate = checkOutDate;
    }

    setFilterParams(params);
    setShouldLoadRooms(true);
  };

  // Khi chọn room từ list
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    form.setFieldValue("roomTypeId", room.id);
    setRentalPrice(room.basePrice || room.displayPrice || 0);
    setStartTime(
      room.displayStartTime
        ? dayjs(room.displayStartTime, "HH:mm")
        : dayjs("12:00:00", "HH:mm:ss")
    );
    setEndTime(
      room.displayEndTime
        ? dayjs(room.displayEndTime, "HH:mm")
        : dayjs("14:00:00", "HH:mm:ss")
    );
    setIsFilterOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditMode) {
        // Update existing booking - chỉ update Status và Guest Info
        const response = await updateBooking({
          id: bookingData.id,
          userId: bookingData.userId,
          hotelId: bookingData.hotelId,
          roomTypeId: bookingData.roomTypeId,
          hotelName: bookingData.hotelName || null,
          roomTypeName: bookingData.roomTypeName || null,
          checkInDate: bookingData.checkInDate || null,
          checkOutDate: bookingData.checkOutDate || null,
          startTime: bookingData.startTime || null,
          endTime: bookingData.endTime || null,
          rentalPrice: bookingData.rentalPrice,
          rentalType: bookingData.rentalType || null,
          bookingDate: bookingData.bookingDate,
          guestName: values.guestName,
          guestPhone: values.guestPhone,
          guestEmail: values.guestEmail || "",
          note: values.note || "",
          status: values.status,
        });

        await refetch?.();
        handleCancel();

        notification.success({
          message: "Booking updated successfully",
          description: `Booking for ${values.guestName} has been updated.`,
          placement: "topRight",
        });

        // if (response) {

        // } else {
        //   notification.error({
        //     message: "Update failed",
        //     description: "Unable to update booking. Please try again.",
        //     placement: "topRight",
        //   });
        // }
      } else {
        // Create new booking
        if (!selectedRoom) {
          notification.error({
            message: "Error",
            description: "Please select a room",
            placement: "topRight",
          });
          return;
        }

        const bookingPayload = {
          hotelId: selectedHotelId,
          roomTypeId: selectedRoom.id,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate || checkInDate,
          startTime: startTime.format("HH:mm:ss"),
          endTime: endTime.format("HH:mm:ss"),
          rentalPrice: rentalPrice,
          rentalType:
            rentalType === "hourly"
              ? "Hourly"
              : rentalType === "overnight"
              ? "Overnight"
              : "Daily",
          guestName: values.guestName,
          guestPhone: values.guestPhone,
          guestEmail: values.guestEmail,
          note: values.note || "",
          status: "Pending",
        };

        const response = await createBooking(bookingPayload);

        if (response) {
          notification.success({
            message: "Booking created successfully",
            description: `Room booked successfully for ${bookingPayload.guestName}.`,
            placement: "topRight",
          });

          await refetch?.();
          handleCancel();
        } else {
          notification.error({
            message: "Booking failed",
            description: "Unable to create booking. Please try again.",
            placement: "topRight",
          });
        }
      }
    } catch (err) {
      if (err.errorFields) return;
      console.error("Booking error:", err);
      notification.error({
        message: isEditMode ? "Update failed" : "Booking failed",
        description: err.message || "Please try again later.",
        placement: "topRight",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsEditMode(false);
    onClose();
  };

  return (
    <Modal
      title={isEditMode ? "Edit Booking" : "Create Booking"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      width={900}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: "Pending",
        }}
      >
        {!isEditMode ? (
          <>
            {/* CREATE MODE */}
            {/* Hotel Selection */}
            <Form.Item
              name="hotelId"
              label="Hotel"
              rules={[{ required: true, message: "Please select a hotel" }]}
            >
              <Select
                loading={hotelLoading}
                placeholder="Select a hotel"
                onChange={handleHotelChange}
                options={hotels.map((h) => ({
                  label: h.name,
                  value: h.id,
                }))}
              />
            </Form.Item>

            {selectedHotelId && (
              <>
                <Divider />

                {/* Filter & Room Selection */}
                <div>
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all px-5 py-3 text-gray-700 font-medium text-sm mb-4"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate">
                        {rentalType === "hourly"
                          ? "Hourly"
                          : rentalType === "overnight"
                          ? "Overnight"
                          : "Daily"}{" "}
                        • {checkInDate || "Select dates"}
                        {checkOutDate && ` - ${checkOutDate}`}
                        {checkInTime && ` • ${checkInTime}`}
                        {usageHours && ` • ${usageHours}h`}
                      </span>
                    </div>
                    <div className="text-lg">{isFilterOpen ? "▼" : "▶"}</div>
                  </button>

                  {/* Filter Form */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isFilterOpen
                        ? "max-h-[1000px] opacity-100 mb-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                      {/* Rental Type Tabs */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Rental Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { key: "hourly", icon: "⏰", label: "Hourly" },
                            {
                              key: "overnight",
                              icon: "🌙",
                              label: "Overnight",
                            },
                            { key: "daily", icon: "🏢", label: "Daily" },
                          ].map((item) => (
                            <button
                              key={item.key}
                              onClick={() => {
                                setRentalType(item.key);
                                setCheckInDate(null);
                                setCheckOutDate(null);
                                setCheckInTime(null);
                                setUsageHours(null);
                                setSelectedRoom(null);
                                setShouldLoadRooms(false);
                              }}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                rentalType === item.key
                                  ? "bg-[#003B95] text-white shadow-md"
                                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                              }`}
                            >
                              <span>{item.icon}</span>
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filter Inputs */}
                      <div className="space-y-4">
                        {/* Check-in Date */}
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Check-in Date *
                          </label>
                          <input
                            type="date"
                            value={checkInDate || ""}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#003B95] focus:border-[#003B95] focus:outline-none transition text-sm w-full"
                          />
                        </div>

                        {/* HOURLY: Check-in Time + Usage Hours */}
                        {rentalType === "hourly" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Check-in Time *
                              </label>
                              <TimePicker
                                format="HH:mm"
                                value={
                                  checkInTime
                                    ? dayjs(checkInTime, "HH:mm")
                                    : null
                                }
                                onChange={(time, timeString) =>
                                  setCheckInTime(timeString)
                                }
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Usage Hours *
                              </label>
                              <select
                                value={usageHours || ""}
                                onChange={(e) =>
                                  setUsageHours(Number(e.target.value))
                                }
                                className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#003B95] focus:border-[#003B95] focus:outline-none transition text-sm w-full"
                              >
                                <option value="">Select hours</option>
                                {[2, 3, 4, 5, 6, 8, 12].map((h) => (
                                  <option key={h} value={h}>
                                    {h} hour{h > 1 ? "s" : ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {/* DAILY: Check-out Date */}
                        {rentalType === "daily" && (
                          <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                              Check-out Date *
                            </label>
                            <input
                              type="date"
                              value={checkOutDate || ""}
                              min={
                                checkInDate
                                  ? new Date(
                                      new Date(checkInDate).getTime() +
                                        24 * 60 * 60 * 1000
                                    )
                                      .toISOString()
                                      .split("T")[0]
                                  : new Date().toISOString().split("T")[0]
                              }
                              onChange={(e) => setCheckOutDate(e.target.value)}
                              className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#003B95] focus:border-[#003B95] focus:outline-none transition text-sm w-full"
                            />
                          </div>
                        )}

                        {/* Confirm Button */}
                        <button
                          type="button"
                          onClick={handleConfirmFilter}
                          className="w-full px-6 py-3 bg-[#003B95] hover:bg-[#002A70] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4"
                        >
                          Search Rooms
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Room List */}
                  {shouldLoadRooms && (
                    <div className="mt-4">
                      {roomsLoading ? (
                        <div className="flex justify-center py-8">
                          <Spin tip="Loading rooms..." />
                        </div>
                      ) : rooms && rooms.length > 0 ? (
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Available Rooms ({rooms.length})
                          </h3>
                          {rooms.map((room) => (
                            <div
                              key={room.id}
                              onClick={() => handleRoomSelect(room)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedRoom?.id === room.id
                                  ? "border-[#003B95] bg-blue-50"
                                  : "border-gray-200 bg-white hover:border-[#003B95]"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {room.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {room.description || "No description"}
                                  </p>
                                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                      📏{" "}
                                      <span>
                                        {room.area ? `${room.area} m²` : "N/A"}
                                      </span>
                                    </span>

                                    <span className="flex items-center gap-1">
                                      🛏️ <span>{room.quantity || 0} rooms</span>
                                    </span>

                                    <span className="flex items-center gap-1">
                                      {room.isActive
                                        ? "🟢 Active"
                                        : "🔴 Inactive"}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-[#003B95]">
                                    {(
                                      room.displayPrice ||
                                      room.basePrice ||
                                      0
                                    ).toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {rentalType === "hourly"
                                      ? "/hour"
                                      : rentalType === "overnight"
                                      ? "/night"
                                      : "/night"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                          <p className="text-gray-500">
                            No rooms available for selected dates
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Divider />

                {/* Selected Room Info */}
                {selectedRoom && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Selected Room
                    </h3>
                    <p className="text-sm text-gray-700">
                      <strong>{selectedRoom.name}</strong> •{" "}
                      {rentalPrice?.toLocaleString()} VND
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Check-in</p>
                        <p className="font-semibold text-gray-900">
                          {startTime?.format("HH:mm") || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Check-out</p>
                        <p className="font-semibold text-gray-900">
                          {endTime?.format("HH:mm") || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Type</p>
                        <p className="font-semibold text-gray-900">
                          {rentalType === "hourly"
                            ? "Hourly"
                            : rentalType === "overnight"
                            ? "Overnight"
                            : "Daily"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Divider />
              </>
            )}

            {/* Guest Info - CREATE */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Guest Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="guestName"
                  rules={[
                    { required: true, message: "Please enter guest name" },
                  ]}
                  className="mb-0"
                >
                  <Input placeholder="Guest Name *" />
                </Form.Item>

                <Form.Item
                  name="guestPhone"
                  rules={[
                    { required: true, message: "Please enter guest phone" },
                  ]}
                  className="mb-0"
                >
                  <Input placeholder="Guest Phone *" />
                </Form.Item>
              </div>

              <Form.Item name="guestEmail" className="mt-4">
                <Input placeholder="Guest Email (optional)" />
              </Form.Item>

              <Form.Item name="note" className="mb-0">
                <TextArea rows={2} placeholder="Note (optional)" />
              </Form.Item>
            </div>
          </>
        ) : (
          <>
            {/* EDIT MODE */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Booking Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-600">Hotel:</span>{" "}
                  <span className="font-semibold">
                    {bookingData?.hotelName}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Room:</span>{" "}
                  <span className="font-semibold">
                    {bookingData?.roomTypeName}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Check-in:</span>{" "}
                  <span className="font-semibold">
                    {bookingData?.checkInDate} {bookingData?.startTime}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Check-out:</span>{" "}
                  <span className="font-semibold">
                    {bookingData?.checkOutDate} {bookingData?.endTime}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Rental Price:</span>{" "}
                  <span className="font-semibold">
                    {bookingData?.rentalPrice?.toLocaleString()} VND
                  </span>
                </p>
              </div>
            </div>

            <Divider />

            {/* Guest Info - EDIT */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Guest Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="guestName"
                  rules={[
                    { required: true, message: "Please enter guest name" },
                  ]}
                  className="mb-0"
                >
                  <Input placeholder="Guest Name *" />
                </Form.Item>

                <Form.Item
                  name="guestPhone"
                  rules={[
                    { required: true, message: "Please enter guest phone" },
                  ]}
                  className="mb-0"
                >
                  <Input placeholder="Guest Phone *" />
                </Form.Item>
              </div>

              <Form.Item name="guestEmail" className="mt-4">
                <Input placeholder="Guest Email (optional)" />
              </Form.Item>

              <Form.Item name="note" className="mb-0">
                <TextArea rows={2} placeholder="Note (optional)" />
              </Form.Item>
            </div>

            <Divider />

            {/* Status - EDIT */}
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status" options={STATUS_OPTIONS} />
            </Form.Item>
          </>
        )}

        {/* Submit */}
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={submitting}
            disabled={!isEditMode && !selectedRoom}
          >
            {isEditMode ? "Update Booking" : "Create Booking"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpsertBooking;
