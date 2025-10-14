"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { clearAuth } from "../../utils/localStorage";

const Navbar = ({ onMenuClick, user }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Search:", searchQuery);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 md:left-20 z-30">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BellIcon className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <img
                src={
                  user?.avatarUrl ||
                  "/placeholder.svg?height=32&width=32&query=user+avatar"
                }
                alt={user?.firstName || "User"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block font-medium text-gray-700">
                {user?.firstName || "User"}
              </span>
              <ChevronDownIcon className="hidden md:block w-4 h-4 text-gray-500" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 focus:outline-none">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
              </div>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/settings")}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    <Cog6ToothIcon className="w-5 h-5 text-gray-500" />
                    Settings
                  </button>
                )}
              </Menu.Item>

              <div className="border-t border-gray-200 my-2"></div>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
