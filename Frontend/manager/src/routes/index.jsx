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
      </Route>

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
