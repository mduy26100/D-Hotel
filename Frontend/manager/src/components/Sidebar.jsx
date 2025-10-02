"use client"
import { NavLink } from "react-router-dom"
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
} from "@heroicons/react/24/outline"

const Sidebar = ({ isOpen, onClose, user }) => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { name: "Booking Management", path: "/bookings", icon: CalendarDaysIcon },
    { name: "Room Management", path: "/rooms", icon: BuildingOfficeIcon },
    { name: "Customers", path: "/customers", icon: UsersIcon },
    { name: "Reports", path: "/reports", icon: ChartBarIcon, comingSoon: true },
    { name: "Analytics", path: "/analytics", icon: ChartPieIcon, comingSoon: true },
    { name: "Chat", path: "/chat", icon: ChatBubbleLeftRightIcon, comingSoon: true },
    { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 md:w-20 w-64`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="font-bold text-xl text-primary md:hidden lg:block">Hotel Admin</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl || "/placeholder.svg?height=40&width=40&query=user+avatar"}
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
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                    } ${item.comingSoon ? "cursor-not-allowed opacity-60" : ""}`
                  }
                  onClick={(e) => {
                    if (item.comingSoon) {
                      e.preventDefault()
                    }
                  }}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="md:hidden lg:block font-medium">{item.name}</span>
                  {item.comingSoon && (
                    <span className="md:hidden lg:block ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Soon
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
