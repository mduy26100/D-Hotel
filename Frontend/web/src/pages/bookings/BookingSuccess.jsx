import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(location.state || null);

  useEffect(() => {
    if (!booking) {
      const query = new URLSearchParams(location.search);

      const fallbackBooking = {
        invoiceNumber: query.get("invoiceNumber"),
        roomName: query.get("roomName"),
        rentalType: query.get("rentalType"),
        rentalPrice: query.get("rentalPrice"),
        guestName: query.get("guestName"),
        guestPhone: query.get("guestPhone"),
        guestEmail: query.get("guestEmail"),
        checkInDate: query.get("checkInDate"),
        startTime: query.get("startTime"),
        checkOutDate: query.get("checkOutDate"),
        endTime: query.get("endTime"),
        note: query.get("note"),
        paymentMethod: query.get("paymentMethod"),
        status: query.get("status"),
      };

      if (!fallbackBooking.guestName) {
        navigate("/"); // không có data → quay về home
      } else {
        setBooking(fallbackBooking);
      }
    }
  }, [booking, location.search, navigate]);

  const formatDate = (date) =>
    date ? dayjs(date).format("DD/MM/YYYY") : "--/--/----";

  if (!booking) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-500"
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
        <div>
          <h1 className="text-2xl font-bold text-green-700">
            Booking Confirmed!
          </h1>
          <p className="text-gray-700">
            Thank you, {booking.guestName}! Your room has been successfully
            booked.
          </p>
        </div>
      </div>

      {/* Room Info */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Booking Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-medium">Invoice Number:</span>{" "}
            {booking.invoiceNumber || "--"}
          </p>
          <p>
            <span className="font-medium">Room Name:</span>{" "}
            {booking.roomName || "--"}
          </p>
          <p>
            <span className="font-medium">Room Type:</span>{" "}
            {booking.rentalType || "--"}
          </p>
          <p>
            <span className="font-medium">Price:</span>{" "}
            {booking.rentalPrice != null
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(booking.rentalPrice)
              : "--"}
          </p>
          <p>
            <span className="font-medium">Check-in:</span>{" "}
            {formatDate(booking.checkInDate)} – {booking.startTime}
          </p>
          <p>
            <span className="font-medium">Check-out:</span>{" "}
            {formatDate(booking.checkOutDate)} – {booking.endTime}
          </p>
          <p>
            <span className="font-medium">Guest Name:</span> {booking.guestName}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {booking.guestPhone}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {booking.guestEmail || "--"}
          </p>

          <p>
            <span className="font-medium">Note:</span> {booking.note || "--"}
          </p>
          <p>
            <span className="font-medium">Payment Method:</span>{" "}
            {booking.paymentMethod}
          </p>
          <p>
            <span className="font-medium">Status:</span> {booking.status}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
        >
          My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
