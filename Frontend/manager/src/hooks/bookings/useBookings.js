// src/hooks/bookings/useBookings.js
import { useState, useEffect, useCallback } from "react";
import { getBookingsAPI } from "../../api/bookings/bookings";
import * as signalR from "@microsoft/signalr";

let bookingHub = null;

const initializeHub = () => {
  if (bookingHub) return bookingHub;

  bookingHub = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7146/hubs/bookings") // bỏ /api
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return bookingHub;
};

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookingsAPI();
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    let isMounted = true;
    const hub = initializeHub();

    const startHub = async () => {
      try {
        if (hub.state !== "Disconnected") {
          await hub.stop();
        }
        await hub.start();
        console.log("✅ BookingHub connected (realtime)");

        // bỏ đăng ký cũ
        hub.off("BookingCreated");
        hub.off("BookingUpdated");
        hub.off("BookingDeleted");

        // BookingUpdated
        hub.on("BookingUpdated", (updatedBooking) => {
          if (!isMounted || !updatedBooking?.id) return;
          setBookings((prev) =>
            prev.map((b) =>
              b.id === updatedBooking.id
                ? { ...b, ...updatedBooking } // merge dữ liệu cũ + mới
                : b
            )
          );
        });

        // BookingCreated thì vẫn thêm mới bình thường
        hub.on("BookingCreated", (newBooking) => {
          if (!isMounted || !newBooking?.id) return;
          setBookings((prev) => {
            const exists = prev.some((b) => b.id === newBooking.id);
            return exists ? prev : [...prev, newBooking];
          });
        });

        hub.on("BookingDeleted", (deletedId) => {
          if (!isMounted || !deletedId) return;
          setBookings((prev) => prev.filter((b) => b.id !== deletedId));
        });
      } catch (err) {
        console.error("BookingHub connection failed:", err);
      }
    };

    startHub();

    return () => {
      isMounted = false;
      hub.off("BookingCreated");
      hub.off("BookingUpdated");
      hub.off("BookingDeleted");
      if (hub.state === "Connected") {
        hub.stop();
      }
    };
  }, []);

  return { bookings, loading, error, refetch: fetchBookings };
};
