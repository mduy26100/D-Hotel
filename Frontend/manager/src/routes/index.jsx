import { Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import DashboardLayout from "../layouts/DashboardLayout"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Bookings from "../pages/Bookings"
import Rooms from "../pages/Rooms"
import Customers from "../pages/Customers"
import Reports from "../pages/Reports"
import Settings from "../pages/Settings"

import Hotels from "../pages/Hotels/Hotels"
import HotelCategories from "../pages/Hotels/HotelCategories"
import HotelStaffs from "../pages/Hotels/HotelStaffs"

import Locations from "../pages/Places/Locations"
import HotelLocations from "../pages/Places/HotelLocations"

import TravelPurposes from "../pages/Purpose/TravelPurposes"
import RoomTypePurposes from "../pages/Purpose/RoomTypePurposes"
import RoomPurposes from "../pages/Purpose/RoomPurposes"
import HotelTravelPurposes from "../pages/Purpose/HotelTravelPurposes"

import BedTypes from "../pages/Room/BedTypes"
import QuantityGuests from "../pages/Room/QuantityGuests"
import RoomTypeImages from "../pages/Room/RoomTypeImages"
import RoomTypes from "../pages/Room/RoomTypes"

import Utilities from "../pages/Utilities/Utilities"
import UtilityItems from "../pages/Utilities/UtilityItems"
import HotelUtilities from "../pages/Utilities/HotelUtilities"

import Discounts from "../pages/Revenue/Discounts"
import Invoices from "../pages/Revenue/Invoices"
import Payments from "../pages/Revenue/Payments"

import Departments from "../pages/Staff/Departments"
import Employees from "../pages/Staff/Employees"
import Shifts from "../pages/Staff/Shifts"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="customers" element={<Customers />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />

        <Route path="hotels" element={<Hotels />} />
        <Route path="hotel-categories" element={<HotelCategories />} />
        <Route path="hotel-staffs" element={<HotelStaffs />} />

        <Route path="locations" element={<Locations />} />
        <Route path="hotel-locations" element={<HotelLocations />} />

        <Route path="travel-purposes" element={<TravelPurposes />} />
        <Route path="room-type-purposes" element={<RoomTypePurposes />} />
        <Route path="room-purposes" element={<RoomPurposes />} />
        <Route path="hotel-travel-purposes" element={<HotelTravelPurposes />} />

        <Route path="bed-types" element={<BedTypes />} />
        <Route path="quantity-guests" element={<QuantityGuests />} />
        <Route path="room-type-images" element={<RoomTypeImages />} />
        <Route path="room-types" element={<RoomTypes />} />

        <Route path="utilities" element={<Utilities />} />
        <Route path="utility-items" element={<UtilityItems />} />
        <Route path="hotel-utilities" element={<HotelUtilities />} />

        <Route path="discounts" element={<Discounts />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="payments" element={<Payments />} />

        <Route path="departments" element={<Departments />} />
        <Route path="employees" element={<Employees />} />
        <Route path="shifts" element={<Shifts />} />
      </Route>

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
