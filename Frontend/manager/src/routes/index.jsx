import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";

import Hotels from "../pages/Hotels/Hotels";
import HotelCategories from "../pages/Hotels/HotelCategories";
import HotelStaffs from "../pages/Hotels/HotelStaffs";

import Locations from "../pages/Places/Locations";
import HotelLocations from "../pages/Places/HotelLocations";

import TravelPurposes from "../pages/Purpose/TravelPurposes";
import RoomTypePurposes from "../pages/Purpose/RoomTypePurposes";
import RoomPurposes from "../pages/Purpose/RoomPurposes";
import HotelTravelPurposes from "../pages/Purpose/HotelTravelPurposes";

import BedTypes from "../pages/Room/BedTypes";
import QuantityGuests from "../pages/Room/QuantityGuests";
import RoomTypeImages from "../pages/Room/RoomTypeImages";
import RoomTypes from "../pages/Room/RoomTypes";

import Utilities from "../pages/Utilities/Utilities";
import UtilityItems from "../pages/Utilities/UtilityItems";
import HotelUtilities from "../pages/Utilities/HotelUtilities";

import Discounts from "../pages/Revenue/Discounts";
import Invoices from "../pages/Revenue/Invoices";
import Payments from "../pages/Revenue/Payments";

import Departments from "../pages/Users/Departments";
import Employees from "../pages/Users/Employees";
import Shifts from "../pages/Users/Shifts";
import ErrorPage from "../pages/Error/ErrorPage";
import Users from "../pages/Users/Users";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
        errorElement={<ErrorPage />} // ✅ Khi có lỗi hoặc sai đường dẫn
      >
        {/* Redirect root → /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard & Settings */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />

        {/* Hotel management */}
        <Route path="hotels" element={<Hotels />} />
        <Route path="hotel-categories" element={<HotelCategories />} />
        <Route path="hotel-staffs" element={<HotelStaffs />} />

        {/* Location */}
        <Route path="locations" element={<Locations />} />
        <Route path="hotel-locations" element={<HotelLocations />} />

        {/* Purpose */}
        <Route path="travel-purposes" element={<TravelPurposes />} />
        <Route path="room-type-purposes" element={<RoomTypePurposes />} />
        <Route path="room-purposes" element={<RoomPurposes />} />
        <Route path="hotel-travel-purposes" element={<HotelTravelPurposes />} />

        {/* Room config */}
        <Route path="bed-types" element={<BedTypes />} />
        <Route path="quantity-guests" element={<QuantityGuests />} />
        <Route path="room-type-images" element={<RoomTypeImages />} />
        <Route path="room-types" element={<RoomTypes />} />

        {/* Utilities */}
        <Route path="utilities" element={<Utilities />} />
        <Route path="utility-items" element={<UtilityItems />} />
        <Route path="hotel-utilities" element={<HotelUtilities />} />

        {/* Discount & Payment */}
        <Route path="discounts" element={<Discounts />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="payments" element={<Payments />} />

        {/* User */}
        <Route path="departments" element={<Departments />} />
        <Route path="employees" element={<Employees />} />
        <Route path="shifts" element={<Shifts />} />
        <Route path="users" element={<Users />} />
      </Route>
    </>
  )
);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
