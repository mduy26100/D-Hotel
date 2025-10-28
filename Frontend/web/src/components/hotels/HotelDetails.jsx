"use client";

import { useHotelDetails } from "../../hooks/hotels/hotels/useHotelDetails";
import { useEffect, useState } from "react";
import { useRoomsByHotelId } from "../../hooks/rooms/roomTypes/useRoomsByHotelId";
import RoomCard from "../rooms/RoomCard";
import dayjs from "dayjs";
import { TimePicker, Modal } from "antd";
import { useRatingsByHotelId } from "../../hooks/bookings/ratings/useRatingsByHotelId";

const HotelDetails = ({ hotelId }) => {
  const { hotel, loading, error } = useHotelDetails(hotelId);
  const {
    ratings,
    loading: ratingsLoading,
    error: ratingsError,
  } = useRatingsByHotelId(hotelId);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Khởi tạo null, user sẽ set từ input
  const [filterType, setFilterType] = useState("day");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [hotelCheckInTime, setHotelCheckInTime] = useState(null);
  const [usageHours, setUsageHours] = useState(null);

  // State lưu param để hook gọi
  const [filterParams, setFilterParams] = useState({ hotelId });

  // Hook luôn gọi trực tiếp với filterParams
  const {
    rooms,
    loading: roomsLoading,
    error: roomsError,
    refetch,
  } = useRoomsByHotelId(filterParams);

  const handleUpdate = () => {
    let params = { hotelId };

    if (filterType === "hour") {
      params.priceType = "hourly";
      params.startDate = checkInDate;
      params.checkInTime = hotelCheckInTime;
      params.usageHours = usageHours;
      params.endDate = null;
    } else if (filterType === "night") {
      params.priceType = "overnight";
      params.startDate = checkInDate;
      params.checkInTime = null;
      params.usageHours = null;
      params.endDate = null;
    } else if (filterType === "day") {
      params.priceType = "daily";
      params.startDate = checkInDate;
      params.endDate = checkOutDate;
      params.checkInTime = null;
      params.usageHours = null;
    }

    setFilterParams(params);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!hotel)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Hotel not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafc] to-white mt-9">
      {/* === HOTEL TITLE + ADDRESS === */}
      <div className="max-w-6xl mx-auto px-6 mb-5">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
        <p className="text-gray-600 flex items-center gap-1">
          <span className="text-orange-500 text-lg">📍</span>
          {hotel.address}
        </p>
      </div>

      {/* === HERO IMAGE === */}
      <div className="relative w-full max-w-6xl mx-auto h-[520px] overflow-hidden rounded-lg shadow-2xl">
        <img
          src={
            hotel.imgUrl ||
            "/placeholder.svg?height=520&width=1200&query=luxury hotel"
          }
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/20 rounded-bl-3xl"></div>
      </div>

      {/* === FILTER BAR === */}
      <div
        className={`sticky top-[64px] border-t border-gray-100 transition-[z-index] duration-200 ${
          isFilterOpen ? "z-50" : "z-30"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Overview bar */}
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all px-5 py-3 text-gray-700 font-medium text-sm md:text-base"
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <span className="truncate max-w-[40%]">
                {hotel?.name || "Select a hotel"}
              </span>
              <span className="text-gray-400">•</span>
              <span className="truncate max-w-[25%]">
                {filterType === "hour"
                  ? "Hourly"
                  : filterType === "night"
                  ? "Overnight"
                  : filterType === "day"
                  ? "Daily"
                  : "Select type"}
              </span>
              <span className="text-gray-400">•</span>
              <span className="truncate max-w-[30%]">
                {filterType === "hour"
                  ? checkInDate
                    ? `${checkInDate} + ${hotelCheckInTime || "Time"} + ${
                        usageHours || "H"
                      }`
                    : "Select check-in"
                  : filterType === "night"
                  ? checkInDate || "Select check-in"
                  : checkInDate && checkOutDate
                  ? `${checkInDate} - ${checkOutDate}`
                  : "Select dates"}
              </span>
            </div>
            <div className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full transition text-lg">
              🔍
            </div>
          </button>

          {/* Filter Form */}
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
              isFilterOpen
                ? "max-h-[1000px] mt-5 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-2">
              <div className="flex flex-col md:flex-row md:items-start md:gap-10 gap-5">
                {/* Tabs */}
                <div className="flex justify-center md:justify-start">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    {[
                      { key: "hour", icon: "⏰", label: "Hourly" },
                      { key: "night", icon: "🌙", label: "Overnight" },
                      { key: "day", icon: "🏢", label: "Daily" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setFilterType(item.key)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm md:text-base transition-all ${
                          filterType === item.key
                            ? "bg-[#003B95] text-white shadow-md scale-105"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs */}
                <div className="flex-1">
                  <div
                    className={`grid gap-4 items-end ${
                      filterType === "hour"
                        ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr]"
                        : filterType === "night"
                        ? "grid-cols-1 sm:grid-cols-1 lg:grid-cols-[1fr]"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr]"
                    }`}
                  >
                    {/* Check-in Date */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={checkInDate || ""}
                        min={new Date().toISOString().split("T")[0]} // không chọn ngày trước hôm nay
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#003B95] focus:border-[#003B95] focus:outline-none transition text-sm w-full"
                      />
                    </div>

                    {filterType === "hour" && (
                      <>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-1 block">
                            Check-in Time
                          </label>
                          <TimePicker
                            format="HH:mm"
                            value={
                              hotelCheckInTime
                                ? dayjs(hotelCheckInTime, "HH:mm")
                                : null
                            }
                            onChange={(time, timeString) =>
                              setHotelCheckInTime(timeString)
                            }
                            className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#003B95] focus:border-[#003B95] focus:outline-none transition text-sm w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-1 block">
                            Usage Hours
                          </label>
                          <select
                            value={usageHours || ""}
                            onChange={(e) =>
                              setUsageHours(Number(e.target.value))
                            }
                            className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#003B95] focus:border-[#003B95] focus:outline-none transition text-sm w-full"
                          >
                            {[2, 3, 4, 5, 6].map((h) => (
                              <option key={h} value={h}>
                                {h} hour{h > 1 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    {filterType === "day" && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">
                          Check-out Date
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
                                  .split("T")[0] // phải > check-in ít nhất 1 ngày
                              : new Date().toISOString().split("T")[0] // nếu chưa chọn check-in, dùng ngày hôm nay
                          }
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#003B95] focus:border-[#003B95] focus:outline-none transition text-sm w-full"
                        />
                      </div>
                    )}

                    <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex justify-center lg:justify-start">
                      <button
                        onClick={handleUpdate}
                        className="px-8 py-3 w-full lg:w-auto bg-[#003B95] hover:bg-[#002A70] text-white text-sm md:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div id="overview" className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Description */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-5">
            About the Hotel
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {hotel.description}
          </p>
          <div className="mt-6">
            <span
              className={`inline-block px-6 py-2 rounded-full text-sm font-semibold ${
                hotel.isActive
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {hotel.isActive ? "✓ Active" : "✗ Inactive"}
            </span>
          </div>
        </div>

        {/* Rooms */}
        <div id="rooms" className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {!roomsLoading && !roomsError && rooms?.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-gray-900">Room list</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Ratings */}
        <div id="ratings" className="max-w-7xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Guest Reviews</h2>
          {ratingsLoading ? (
            <p className="text-gray-600">Loading ratings...</p>
          ) : ratingsError ? (
            <p className="text-red-500">{ratingsError.message}</p>
          ) : ratings?.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <>
              <div className="space-y-4">
                {ratings.slice(0, 3).map((r, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {r.nameUser}
                      </h3>
                      <span className="text-yellow-500 font-bold">
                        {r.ratingValue} ⭐
                      </span>
                    </div>
                    <p className="text-gray-700">{r.comment}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {dayjs(r.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </div>
                ))}
              </div>

              {ratings.length > 3 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2 bg-[#003B95] hover:bg-[#002A70] text-white rounded-lg font-semibold transition-all"
                  >
                    View All Reviews
                  </button>
                </div>
              )}

              <Modal
                title="All Guest Reviews"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
              >
                <div className="space-y-4">
                  {ratings.map((r, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {r.nameUser}
                        </h3>
                        <span className="text-yellow-500 font-bold">
                          {r.ratingValue} ⭐
                        </span>
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {dayjs(r.createdAt).format("DD/MM/YYYY HH:mm")}
                      </p>
                    </div>
                  ))}
                </div>
              </Modal>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Hotel Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏷️",
                title: "Category",
                value: hotel.category?.name || "No category assigned",
              },
              {
                icon: "📍",
                title: "Location",
                value: hotel.location?.name || "No location information",
              },
              {
                icon: "✈️",
                title: "Travel Purpose",
                value: hotel.travelPurpose?.name || "Not specified",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#003B95]/10 rounded-xl flex items-center justify-center text-xl">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xl font-semibold text-gray-800">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div id="amenities">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Featured Amenities
          </h2>

          {hotel.utilities?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotel.utilities.map((util) => (
                <div
                  key={util.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[#003B95]/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {util.iconUrl && (
                      <div className="w-12 h-12 bg-[#003B95]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img
                          src={util.iconUrl || "/placeholder.svg"}
                          alt={util.name}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {util.name}
                    </h3>
                  </div>

                  {util.utilityItems?.length > 0 && (
                    <ul className="space-y-1.5 ml-15">
                      {util.utilityItems.map(
                        (item) =>
                          item && (
                            <li
                              key={item.id}
                              className="text-gray-600 flex items-center gap-2 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-[#003B95] rounded-full"></span>
                              {item.name}
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center shadow-sm">
              <p className="text-gray-500 text-base">No amenities available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
