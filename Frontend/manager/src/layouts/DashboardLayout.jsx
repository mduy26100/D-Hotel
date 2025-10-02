"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { getCurrentUser } from "../api/user"
import { getUser, setUser } from "../utils/localStorage"

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUserState] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      // Try to get user from localStorage first
      const cachedUser = getUser()
      if (cachedUser) {
        setUserState(cachedUser)
      }

      // Fetch fresh user data from API
      try {
        const userData = await getCurrentUser()
        setUser(userData)
        setUserState(userData)
      } catch (error) {
        console.error("Failed to fetch user:", error)
        // If API fails, keep using cached user
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} user={user} />

      <main className="lg:ml-64 md:ml-20 pt-16 min-h-screen">
        <div className="p-4 lg:p-6">
          <Outlet context={{ user }}/>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
