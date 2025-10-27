import React from "react";
import BookingTable from "./BookingTable";

const BookingList = ({ bookings, loading, error, onEdit }) => {
  if (loading) return <p className="text-gray-500">Loading bookings...</p>;
  if (error) return <p className="text-red-500">Error fetching bookings</p>;

  return (
    <BookingTable
      bookings={bookings}
      onEdit={onEdit} // Forward tới BookingTable
    />
  );
};

export default BookingList;
