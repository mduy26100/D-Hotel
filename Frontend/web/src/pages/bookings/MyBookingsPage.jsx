import React from "react";
import { useUserBookings } from "../../hooks/bookings/useUserBookings";
import BookingList from "../../components/bookings/BookingList";

const MyBookingsPage = () => {
  const { bookings, loading, error } = useUserBookings();

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-purple-50 to-purple-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-purple-900 text-center">
        My Bookings
      </h1>

      {loading && (
        <p className="text-center text-gray-500">Loading bookings...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <BookingList bookings={bookings} />
      )}
    </div>
  );
};

export default MyBookingsPage;
