import axiosClient from "../config";

const URL_BASE = "/Bookings";

export const createBookingAPI = async (data) => {
  try {
    const payload = {
      bookingAggregateDto: {
        booking: {
          userId: data.userId || null,
          hotelId: data.hotelId,
          roomTypeId: data.roomTypeId,
          checkInDate: data.checkInDate || null,
          checkOutDate: data.checkOutDate || null,
          startTime: data.startTime || null,
          endTime: data.endTime || null,
          rentalPrice: data.rentalPrice,
          rentalType: data.rentalType || null,
          guestName: data.guestName,
          guestPhone: data.guestPhone,
          guestEmail: data.guestEmail || null,
          note: data.note || null,
          status: data.status,
          paymentProvider: data.paymentProvider,
        },
        details: data.details?.length
          ? data.details.map((d) => ({
              bookingId: d.bookingId || null,
              itemType: d.itemType || null,
              itemId: d.itemId || null,
              itemName: d.itemName || null,
              unitPrice: d.unitPrice || null,
              quantity: d.quantity || null,
              totalPrice: d.totalPrice || null,
            }))
          : [],
      },
    };

    const response = await axiosClient.post(URL_BASE, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // ✅ Nếu backend trả lỗi trong payload
    if (response.data?.success === false) {
      throw new Error(response.data?.message || "Booking failed");
    }

    return response.data;
  } catch (error) {
    console.error("Create booking error:", error);
    throw error; // ném ra FE bắt được
  }
};

export const getBookingsByUserIdAPI = async () => {
  try {
    // Gọi API backend, backend sẽ lấy user từ token trong header
    const response = await axiosClient.get(`${URL_BASE}/by-user`);

    if (response.data?.success === false) {
      throw new Error(response.data?.message || "Failed to fetch bookings");
    }

    return response.data;
  } catch (error) {
    console.error("Get bookings error:", error);
    throw error;
  }
};

export const updateBookingAPI = async (data) => {
  if (!data?.id) throw new Error("Booking ID is required for update");

  const payload = {
    booking: {
      id: data.id,
      userId: data.userId || null,
      hotelId: data.hotelId,
      roomTypeId: data.roomTypeId,
      hotelName: data.hotelName || null,
      roomTypeName: data.roomTypeName || null,
      checkInDate: data.checkInDate || null,
      checkOutDate: data.checkOutDate || null,
      startTime: data.startTime || null,
      endTime: data.endTime || null,
      rentalPrice: data.rentalPrice,
      rentalType: data.rentalType || null,
      guestName: data.guestName,
      guestPhone: data.guestPhone,
      guestEmail: data.guestEmail || "",
      note: data.note || "",
      status: data.status,
    },
    details: Array.isArray(data.details)
      ? data.details.map((d) => ({
          id: d.id || 0,
          bookingId: d.bookingId || data.id,
          itemType: d.itemType || "",
          itemId: d.itemId || 0,
          itemName: d.itemName || "",
          unitPrice: d.unitPrice || 0,
          quantity: d.quantity || 1,
          totalPrice: d.totalPrice || 0,
        }))
      : [],
  };

  try {
    const response = await axiosClient.put(`${URL_BASE}/${data.id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.success === false) {
      throw new Error(response.data?.message || "Update booking failed");
    }

    return response.data;
  } catch (error) {
    console.error("Update booking error:", error);
    throw error;
  }
};

export const getBookingFullAPI = async (bookingId) => {
  try {
    const response = await axiosClient.get(`${URL_BASE}/${bookingId}/full`);

    if (response.data?.success === false) {
      throw new Error(response.data?.message || "Failed to fetch bookings");
    }

    return response.data;
  } catch (error) {
    console.error("Get bookings error:", error);
    throw error;
  }
};
