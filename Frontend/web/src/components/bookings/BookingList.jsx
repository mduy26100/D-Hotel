import React, { useState } from "react";
import BookingTable from "./BookingTable";
import BookingDetailModal from "./BookingDetailModal";

const BookingList = ({ bookings }) => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleRowClick = (bookingId) => {
    setSelectedBookingId(bookingId);
  };

  const handleCloseModal = () => {
    setSelectedBookingId(null);
  };

  return (
    <div className="space-y-6">
      <BookingTable
        bookings={bookings}
        onRowClick={handleRowClick}
        setSelectedBookingId={setSelectedBookingId}
      />

      {selectedBookingId && (
        <BookingDetailModal
          id={selectedBookingId}
          isOpen={!!selectedBookingId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default BookingList;
