// src/hubs/bookingHub.js
import * as signalR from "@microsoft/signalr";

let hubConnection = null;

export const getBookingHub = () => {
  if (!hubConnection) {
    hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7146/hubs/bookings")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Log trạng thái hub
    hubConnection.onreconnecting((error) => {
      console.log("🔄 Hub reconnecting...", error);
    });

    hubConnection.onreconnected((connectionId) => {
      console.log("✅ Hub reconnected, connectionId:", connectionId);
    });

    hubConnection.onclose((error) => {
      console.log("❌ Hub closed", error);
    });
  }
  return hubConnection;
};

export const startBookingHub = async () => {
  const hub = getBookingHub();

  console.log("Hub state before start:", hub.state); // log trạng thái trước start

  if (hub.state === signalR.HubConnectionState.Disconnected) {
    try {
      await hub.start();
      console.log("✅ BookingHub connected (realtime)");
      console.log("Hub state after start:", hub.state);
    } catch (err) {
      console.error("❌ BookingHub connection failed:", err);
    }
  } else {
    console.log("⚠️ Hub already connecting/connected, state:", hub.state);
  }
};

export const stopBookingHub = async () => {
  const hub = getBookingHub();

  console.log("Hub state before stop:", hub.state);

  if (hub.state === signalR.HubConnectionState.Connected) {
    await hub.stop();
    console.log("🛑 BookingHub stopped");
    console.log("Hub state after stop:", hub.state);
  } else {
    console.log("⚠️ Hub not connected, cannot stop. Current state:", hub.state);
  }
};
