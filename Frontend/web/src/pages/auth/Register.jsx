"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useRegister } from "../../hooks/auth/useRegister"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"

const Register = ({setToast}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const { register, loading, error } = useRegister()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Password confirmation does not match.")
      return
    }

    try {
      await register(formData)
      setToast({ message: "Register successful!", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Register failed", type: "error" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
      <div className="relative w-full max-w-md">
        {/* Decorations */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>

        <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Register</h2>
            <p className="text-gray-500 mt-2">
              Create an account to experience premium services
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <Input
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Username"
              name="userName"
              placeholder="Enter your username"
              value={formData.userName}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <div className="flex gap-4">
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-red-500 font-medium">{error}</p>}

            <Button type="submit" variant="primary" disabled={loading} className="w-full flex justify-center items-center">
              {loading ? (
                <span className="animate-spin border-2 border-t-2 border-white rounded-full w-5 h-5"></span>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Already have an account?
              <Link to="/login" className="text-blue-600 font-medium ml-2 hover:underline">
                Log in now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
