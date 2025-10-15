"use client";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  XMarkIcon,
  MapPinIcon,
  BriefcaseIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = ({ isOpen, onClose, user }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    {
      name: "Hotels",
      icon: BuildingOfficeIcon,
      submenu: [
        { name: "Hotels", path: "/hotels" },
        { name: "Hotel Categories", path: "/hotel-categories" },
        { name: "Hotel Staffs", path: "/hotel-staffs" },
      ],
    },
    {
      name: "Places",
      icon: MapPinIcon,
      submenu: [
        { name: "Locations", path: "/locations" },
        { name: "Hotel Locations", path: "/hotel-locations" },
      ],
    },
    {
      name: "Purpose",
      icon: BriefcaseIcon,
      submenu: [
        { name: "Travel Purposes", path: "/travel-purposes" },
        { name: "Room Type Purposes", path: "/room-type-purposes" },
        { name: "Room Purposes", path: "/room-purposes" },
        { name: "Hotel Travel Purposes", path: "/hotel-travel-purposes" },
      ],
    },
    {
      name: "Room",
      icon: CubeIcon,
      submenu: [
        { name: "Bed Types", path: "/bed-types" },
        { name: "Quantity Guests", path: "/quantity-guests" },
        { name: "Room Type Images", path: "/room-type-images" },
        { name: "Room Types", path: "/room-types" },
      ],
    },
    {
      name: "Utilities",
      icon: WrenchScrewdriverIcon,
      submenu: [
        { name: "Utilities", path: "/utilities" },
        { name: "Utility Items", path: "/utility-items" },
        { name: "Hotel Utilities", path: "/hotel-utilities" },
      ],
    },
    {
      name: "Revernue",
      icon: ChartBarIcon,
      submenu: [
        { name: "Discounts", path: "/discounts" },
        { name: "Invoices", path: "/invoices" },
        { name: "Payments", path: "/payments" },
      ],
    },
    {
      name: "User",
      icon: UsersIcon,
      submenu: [
        { name: "Users", path: "/users" },
        { name: "Departments", path: "/departments" },
        { name: "Employees", path: "/employees" },
        { name: "Shifts", path: "/shifts" },
      ],
    },
    { name: "Reports", path: "/reports", icon: ChartBarIcon, comingSoon: true },
    {
      name: "Analytics",
      path: "/analytics",
      icon: ChartPieIcon,
      comingSoon: true,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: ChatBubbleLeftRightIcon,
      comingSoon: true,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen max-h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 md:w-20 w-64`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="font-bold text-xl text-primary md:hidden lg:block">
              Hotel Admin
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={
                  user.avatarUrl ||
                  "/placeholder.svg?height=40&width=40&query=user+avatar"
                }
                alt={user.firstName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="md:hidden lg:block">
                <p className="font-semibold text-sm text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="min-h-0 flex-1 overflow-y-auto p-4 pb-4 touch-pan-y">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path || item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
                    >
                      <item.icon className="w-6 h-6 flex-shrink-0" />
                      <span className="md:hidden lg:block font-medium flex-1 text-left">
                        {item.name}
                      </span>
                      <svg
                        className={`w-4 h-4 md:hidden lg:block transition-transform ${
                          openSubmenus[item.name] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openSubmenus[item.name] && (
                      <ul className="mt-2 ml-4 space-y-1 md:hidden lg:block">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                                  isActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`
                              }
                            >
                              <span className="w-2 h-2 rounded-full bg-gray-400" />
                              {subItem.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      } ${
                        item.comingSoon ? "cursor-not-allowed opacity-60" : ""
                      }`
                    }
                    onClick={(e) => {
                      if (item.comingSoon) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                    <span className="md:hidden lg:block font-medium">
                      {item.name}
                    </span>
                    {item.comingSoon && (
                      <span className="md:hidden lg:block ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Soon
                      </span>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
