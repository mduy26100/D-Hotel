"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../../hooks/auth/useUser"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

const Profile = () => {
  const { user, fetchUser } = useUser()
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    avatarImage: null,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUser(token)
        .then((data) => {
          setProfileForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            avatarImage: null,
          })
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [fetchUser])

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target
    if (name === "avatarImage") {
      setProfileForm({ ...profileForm, avatarImage: files[0] })
    } else {
      setProfileForm({ ...profileForm, [name]: value })
    }
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    alert("Profile saved (static demo):\n" + JSON.stringify(profileForm, null, 2))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Password confirmation does not match")
      return
    }
    alert("Password changed (static demo)")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-500">No user found. Please login.</span>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
        <p className="text-gray-500">Manage your account information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
          <img
            src={user.avatarUrl || "/placeholder.svg"}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-2 border-gray-200 object-cover"
          />
          <div className="w-full space-y-2 mt-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">First Name:</span>
              <span className="text-gray-800">{user.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Last Name:</span>
              <span className="text-gray-800">{user.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Username:</span>
              <span className="text-gray-800">{user.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-800">{user.phoneNumber || "Not updated"}</span>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="space-y-6">
          {/* Update Profile */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Update Information</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={profileForm.firstName}
                  onChange={handleProfileChange}
                  placeholder="First Name"
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={profileForm.lastName}
                  onChange={handleProfileChange}
                  placeholder="Last Name"
                  required
                />
              </div>
              <Input
                label="Phone Number"
                name="phoneNumber"
                value={profileForm.phoneNumber}
                onChange={handleProfileChange}
                placeholder="Phone Number"
              />
              <Input
                label="Avatar"
                name="avatarImage"
                type="file"
                onChange={handleProfileChange}
              />
              <Button type="submit" variant="primary" className="w-full">
                Save Changes
              </Button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
              />
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
              />
              <Button type="submit" variant="primary" className="w-full">
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Profile
