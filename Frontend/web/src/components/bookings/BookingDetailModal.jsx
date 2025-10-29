import React, { useState, useEffect } from "react";
import {
  Modal,
  Descriptions,
  Spin,
  Button,
  Rate,
  Input,
  notification,
} from "antd";
import { useBookingFull } from "../../hooks/bookings/useBookingFull";
import { useRatingsByUser } from "../../hooks/bookings/ratings/useRatingsByUser";
import { useCreateRating } from "../../hooks/bookings/ratings/useCreateRating";
import { useUpdateBooking } from "../../hooks/bookings/useUpdateBooking";

const BookingDetailModal = ({ id, isOpen, onClose, refetch }) => {
  const {
    data: bookingDetail,
    loading: bookingLoading,
    refetch: refetchBooking,
  } = useBookingFull(id);

  const {
    ratings: userRatings,
    loading: ratingsLoading,
    refetch: refetchRatings,
  } = useRatingsByUser();

  const { createRating, loading: creatingRating } = useCreateRating();
  const { updateBooking, loading: updatingBooking } = useUpdateBooking();

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState("");
  const [hasRated, setHasRated] = useState(false);

  const booking = bookingDetail?.booking;

  // Kiểm tra xem booking đã được đánh giá chưa
  useEffect(() => {
    if (booking && userRatings) {
      const rated = userRatings.some((r) => r.bookingId === booking.id);
      setHasRated(rated);
    }
  }, [booking, userRatings]);

  if (!id) return null;

  const handleSubmitRating = async () => {
    if (!booking) return;

    try {
      await createRating({
        bookingId: booking.id,
        hotelId: booking.hotelId,
        ratingValue,
        comment,
      });

      notification.success({
        message: "Rating submitted successfully!",
        description: `You rated ${booking.hotelName} with ${ratingValue} stars.`,
        placement: "topRight",
      });

      setIsRatingModalOpen(false);
      setHasRated(true);
      setComment("");
      setRatingValue(5);

      refetchRatings?.();
      refetchBooking?.();
      await refetch?.(); // cập nhật lại bảng ngoài
    } catch (err) {
      notification.error({
        message: "Failed to submit rating",
        description: err?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const handleCancelBooking = async () => {
    if (!booking) return;

    try {
      await updateBooking({
        id: booking.id,
        userId: booking.userId,
        hotelId: booking.hotelId,
        roomTypeId: booking.roomTypeId,
        hotelName: booking.hotelName || null,
        roomTypeName: booking.roomTypeName || null,
        checkInDate: booking.checkInDate || null,
        checkOutDate: booking.checkOutDate || null,
        startTime: booking.startTime || null,
        endTime: booking.endTime || null,
        rentalPrice: booking.rentalPrice,
        rentalType: booking.rentalType || null,
        guestName: booking.guestName,
        guestPhone: booking.guestPhone,
        guestEmail: booking.guestEmail || "",
        note: booking.note || "",
        status: "Cancelled",
        invoiceNumber: booking.invoiceNumber,
      });

      notification.success({
        message: "Booking Cancelled",
        description: `Booking at ${booking.hotelName} has been cancelled.`,
        placement: "topRight",
      });

      // Cập nhật lại booking & bảng
      await refetchBooking?.();
      await refetchRatings?.();
      await refetch?.();
    } catch (err) {
      notification.error({
        message: "Failed to cancel booking",
        description: err?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  // Nếu booking chưa load xong
  if (!booking && bookingLoading) {
    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width="90%"
        bodyStyle={{ padding: "1.5rem" }}
      >
        <div className="flex justify-center py-10">
          <Spin tip="Loading..." size="large" />
        </div>
      </Modal>
    );
  }

  // Nếu booking không tồn tại
  if (!booking) {
    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width="90%"
        bodyStyle={{ padding: "1.5rem" }}
      >
        <p className="text-center text-gray-500">No booking details found.</p>
      </Modal>
    );
  }

  return (
    <>
      {/* Modal chi tiết booking */}
      <Modal
        title="Booking Details"
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width="90%"
        bodyStyle={{ padding: "1.5rem" }}
      >
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

        <div className="mt-5 flex justify-end gap-2">
          {/* Chỉ Pending mới có thể hủy */}
          {booking.status === "Pending" && (
            <Button
              danger
              onClick={handleCancelBooking}
              loading={updatingBooking}
            >
              Cancel Booking
            </Button>
          )}

          {/* Chỉ CheckedOut mới được đánh giá */}
          {booking.status === "CheckedOut" && (
            <Button
              type="primary"
              onClick={() => setIsRatingModalOpen(true)}
              disabled={hasRated || ratingsLoading || updatingBooking}
            >
              {hasRated
                ? "Already Rated"
                : creatingRating
                ? "Submitting..."
                : "Rate Booking"}
            </Button>
          )}
        </div>
      </Modal>

      {/* Modal đánh giá */}
      <Modal
        title={`Rate Booking - ${booking.hotelName}`}
        open={isRatingModalOpen}
        onCancel={() => setIsRatingModalOpen(false)}
        onOk={handleSubmitRating}
        okText="Submit"
        confirmLoading={creatingRating}
      >
        <div className="flex flex-col gap-4">
          <Rate value={ratingValue} onChange={(val) => setRatingValue(val)} />
          <Input.TextArea
            rows={4}
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default BookingDetailModal;
