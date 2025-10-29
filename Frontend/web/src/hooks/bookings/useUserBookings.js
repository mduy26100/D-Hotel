// src/hooks/bookings/useUserBookings.js
import { useState, useEffect, useCallback } from "react";
import { getBookingsByUserIdAPI } from "../../api/bookings/bookings";
import * as signalR from "@microsoft/signalr";

let bookingHub = null;

const URL_BASE = import.meta.env.VITE_API_URL;

const initializeHub = () => {
  if (bookingHub) return bookingHub;

  bookingHub = new signalR.HubConnectionBuilder()
    .withUrl(`${URL_BASE}/hubs/bookings`) // bỏ /api
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return bookingHub;
};

export const useUserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookingsByUserIdAPI();
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

        // handle event
        hub.on("BookingCreated", (newBooking) => {
          if (!isMounted || !newBooking?.id) return;
          setBookings((prev) => [...prev, newBooking]);
        });

        hub.on("BookingUpdated", (updatedBooking) => {
          if (!isMounted || !updatedBooking?.id) return;
          setBookings((prev) =>
            prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
          );
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
