// src/pages/booking/CheckoutPage.jsx
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { useCreateBooking } from "../../hooks/bookings/useCreateBooking";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { notification } from "antd";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomName } = useParams();
  const query = new URLSearchParams(location.search);

  const { createBooking, loading } = useCreateBooking();

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
  const [paymentMethod, setPaymentMethod] = useState("OnSite");

  const formatDate = (date) =>
    date ? dayjs(date).format("DD/MM/YYYY") : "--/--/----";

  const handleCheckout = async () => {
    if (!guestName || !guestPhone) {
      notification.warning({
        message: "Missing information",
        description: "Please enter your full name and phone number.",
        placement: "topRight",
      });
      return;
    }

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
      paymentMethod,
      paymentProvider: paymentMethod === "Stripe" ? "Stripe" : "OnSite",
      status: "Pending",
    };

    try {
      const response = await createBooking(bookingData);

      if (response) {
        if (paymentMethod === "Stripe" && response.paymentUrl) {
          window.location.href = response.paymentUrl;
          return;
        }

        notification.success({
          message: "Booking successfully created!",
          description: `Room ${room.name} has been booked successfully.`,
          placement: "topRight",
        });

        navigate("/booking-success", {
          state: {
            ...bookingData,
            roomName: room.name,
            rentalType: room.displayType,
            rentalPrice: room.displayPrice,
            imageUrl: room.imageUrl,
            invoiceNumber: response.invoiceNumber,
          },
        });
      } else {
        notification.error({
          message: "Booking failed!",
          description: "Unable to create booking. Please try again.",
          placement: "topRight",
        });
      }
    } catch (err) {
      console.error("Booking error:", err);
      notification.error({
        message: "Booking failed!",
        description: err.message || "Please try again later.",
        placement: "topRight",
      });
    }
  };

  // -------------------- JSX --------------------
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Room info + policy */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <img
            src={room.imageUrl || "/default-room.jpg"}
            alt={room.name}
            className="w-full md:w-40 h-40 object-cover rounded-lg border border-gray-200"
          />
          <div className="flex flex-col justify-between mt-4 md:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800">
              {room.name}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              <span className="font-medium">Type:</span> {room.displayType}
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              <span className="font-medium">Price:</span>{" "}
              {room.displayPrice.toLocaleString("en-US")} VND
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg shadow-sm space-y-2">
          <p className="text-gray-700 text-sm">
            <span className="font-medium">Check-in:</span>{" "}
            {formatDate(room.displayStartDate)} – {room.displayStartTime}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-medium">Check-out:</span>{" "}
            {formatDate(room.displayEndDate)} – {room.displayEndTime}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-400 space-y-2">
          <h3 className="text-red-600 font-semibold text-lg">Room Policies</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>No cancellations allowed within 24 hours of check-in.</li>
            <li>Late check-out may incur extra charges.</li>
            <li>Guests must present valid ID at check-in.</li>
            <li>Pets are not allowed unless specified.</li>
          </ul>
        </div>
      </div>

      {/* Right: Guest info + payment */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="font-semibold text-lg">Guest Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <PhoneInput
            country="vn"
            value={guestPhone}
            onChange={(phone) => setGuestPhone(phone)}
            inputClass="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            dropdownClass="rounded-lg"
            placeholder="Phone Number"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <textarea
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          {/* Payment Method Select - Styled */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-3 text-lg">
              Payment Method
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* OnSite Option */}
              <div
                onClick={() => setPaymentMethod("OnSite")}
                className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                  paymentMethod === "OnSite"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded-full border-2 ${
                    paymentMethod === "OnSite"
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-400"
                  }`}
                ></div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    Pay On Site
                  </span>
                  <span className="text-gray-500 text-sm">
                    Pay directly at the hotel
                  </span>
                </div>
                <img
                  src="https://www.citypng.com/public/uploads/preview/hd-black-hand-to-hand-money-cash-payment-icon-transparent-png-701751694974663tfjsmuftvt.png"
                  alt="OnSite"
                  className="w-8 h-8 ml-auto opacity-80"
                />
              </div>

              {/* Stripe Option */}
              <div
                onClick={() => setPaymentMethod("Stripe")}
                className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                  paymentMethod === "Stripe"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded-full border-2 ${
                    paymentMethod === "Stripe"
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-400"
                  }`}
                ></div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">Stripe</span>
                  <span className="text-gray-500 text-sm">
                    Pay securely online with card
                  </span>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                  className="w-12 h-8 ml-auto object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
