import React from "react";
import { Modal, Descriptions, Spin } from "antd";
import { useBookingFull } from "../../hooks/bookings/useBookingFull";

const BookingDetailModal = ({ id, isOpen, onClose }) => {
  const { data: bookingDetail, loading } = useBookingFull(id);

  if (!id) return null;

  const booking = bookingDetail?.booking;

  return (
    <Modal
      title="Booking Details"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width="90%"
      bodyStyle={{ padding: "1.5rem" }}
    >
      {loading ? (
        <div className="flex justify-center py-10">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : booking ? (
        <Descriptions
          bordered
          column={1}
          size="small"
          className="text-sm sm:text-base"
        >
          <Descriptions.Item label="Hotel">
            {booking.hotelName}
          </Descriptions.Item>
          <Descriptions.Item label="Room Type">
            {booking.roomTypeName}
          </Descriptions.Item>
          <Descriptions.Item label="Check-In">
            {new Date(booking.checkInDate).toLocaleDateString("en-GB")}
          </Descriptions.Item>
          <Descriptions.Item label="Check-Out">
            {new Date(booking.checkOutDate).toLocaleDateString("en-GB")}
          </Descriptions.Item>
          <Descriptions.Item label="Start Time">
            {booking.startTime}
          </Descriptions.Item>
          <Descriptions.Item label="End Time">
            {booking.endTime}
          </Descriptions.Item>
          <Descriptions.Item label="Rental Price">
            {booking.rentalPrice?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Rental Type">
            {booking.rentalType}
          </Descriptions.Item>
          <Descriptions.Item label="Guest Name">
            {booking.guestName}
          </Descriptions.Item>
          <Descriptions.Item label="Guest Phone">
            {booking.guestPhone}
          </Descriptions.Item>
          <Descriptions.Item label="Guest Email">
            {booking.guestEmail || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Note">
            {booking.note || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{booking.status}</Descriptions.Item>
          <Descriptions.Item label="Booking Date">
            {new Date(booking.bookingDate).toLocaleString("en-GB")}
          </Descriptions.Item>
          <Descriptions.Item label="Invoice Number">
            {booking.invoiceNumber || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Method">
            {booking.paymentMethod}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p className="text-center text-gray-500">No booking details found.</p>
      )}
    </Modal>
  );
};

export default BookingDetailModal;
