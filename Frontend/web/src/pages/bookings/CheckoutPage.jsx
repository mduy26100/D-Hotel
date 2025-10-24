import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { useCreateBooking } from "../../hooks/bookings/useCreateBooking";

const CheckoutPage = () => {
  const location = useLocation();
  const { roomName } = useParams();
  const query = new URLSearchParams(location.search);

  const { createBooking, loading, error, data } = useCreateBooking();

  const room = {
    name: roomName,
    hotelId: query.get("hotelSn"),
    id: query.get("roomTypeSn"),
    displayStartDate: query.get("startDate"),
    displayEndDate: query.get("endDate"),
    displayStartTime: query.get("startTime"),
    displayEndTime: query.get("endTime"),
    displayPrice: Number(query.get("rentalPrice")),
    displayType: query.get("rentalType"),
    imageUrl: query.get("imageUrl"),
  };

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState(
    query.get("mobileBooking") || ""
  );
  const [guestEmail, setGuestEmail] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("momo");

  const formatDate = (date) =>
    date ? dayjs(date).format("DD/MM/YYYY") : "--/--/----";

  const handleCheckout = async () => {
    const bookingData = {
      hotelId: room.hotelId,
      roomTypeId: room.id,
      checkInDate: room.displayStartDate,
      checkOutDate: room.displayEndDate,
      startTime: room.displayStartTime,
      endTime: room.displayEndTime,
      rentalPrice: room.displayPrice,
      rentalType: room.displayType,
      guestName,
      guestPhone,
      guestEmail,
      note,
      status: "Pending",
    };
    console.log(bookingData);

    try {
      const response = await createBooking(bookingData);
      alert("Booking successfully created!");
      console.log("Booking response:", response);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed, please try again!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* === Left: Room info + check-in/out === */}
      <div className="space-y-6">
        <div className="flex gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src={room.imageUrl || "/default-room.jpg"}
            alt={room.name}
            className="w-36 h-36 object-cover rounded-lg border border-gray-200"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {room.name}
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                <span className="font-medium">Thể loại:</span>{" "}
                {room.displayType}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Nhận phòng:</span>{" "}
              {formatDate(room.displayStartDate)} – {room.displayStartTime}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Trả phòng:</span>{" "}
              {formatDate(room.displayEndDate)} – {room.displayEndTime}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <h3 className="font-semibold">Chi tiết thanh toán</h3>
          <div className="flex justify-between">
            <span>Tiền phòng</span>
            <span className="font-medium">
              {room.displayPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Tổng thanh toán</span>
            <span>{room.displayPrice.toLocaleString("vi-VN")}₫</span>
          </div>
        </div>
      </div>

      {/* === Right: Payment info + form === */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <h3 className="font-semibold">Chọn phương thức thanh toán</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={() => setPaymentMethod("momo")}
              />
              Ví MoMo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="zalopay"
                checked={paymentMethod === "zalopay"}
                onChange={() => setPaymentMethod("zalopay")}
              />
              Ví ZaloPay
            </label>
            <label className="flex items-center gap-2 text-gray-400">
              <input type="radio" disabled /> Trả tại khách sạn
            </label>
          </div>
        </div>

        {/* === Guest form === */}
        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <h3 className="font-semibold">Thông tin khách</h3>
          <input
            type="text"
            placeholder="Họ và tên"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email (tùy chọn)"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Ghi chú (tùy chọn)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
          onClick={handleCheckout}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
