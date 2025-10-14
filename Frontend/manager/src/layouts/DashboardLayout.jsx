"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />
      <Navbar onMenuClick={() => setSidebarOpen(true)} user={user} />

      <main className="lg:ml-64 md:ml-20 pt-16 min-h-screen">
        <div className="p-4 lg:p-6">
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
