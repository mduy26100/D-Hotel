import { Navigate, Route, Routes } from "react-router-dom";
import Hotels from "../pages/hotels/HotelPage";
import ChatWidget from "../components/ui/ChatWidget";
import HotelDetailsWrapper from "../pages/hotels/HotelDetailsWrapper";
import HotelsByCategoryPage from "../pages/hotels/HotelsByCategoryPage";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import Profile from "../pages/auth/Profile";
import Toast from "../components/ui/Toast";
import { useState } from "react";
import CheckoutPage from "../pages/bookings/CheckoutPage";
import BookingSuccess from "../pages/bookings/BookingSuccess";

export function AppRoutes() {
  const [toast, setToast] = useState(null);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login setToast={setToast} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register setToast={setToast} />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetailsWrapper />} />
          <Route
            path="/hotels/category/:categoryId"
            element={<HotelsByCategoryPage />}
          />

          <Route path="/checkout/:roomName" element={<CheckoutPage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Route>
      </Routes>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      <ChatWidget />
    </>
  );
}
