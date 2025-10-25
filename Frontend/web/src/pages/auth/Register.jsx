"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/auth/useRegister";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Register = ({ setToast }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { register, loading, error } = useRegister();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password confirmation does not match.");
      return;
    }

    try {
      await register(formData);
      setToast({ message: "Register successful!", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Register failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-8 animate-fadeIn">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-[#003B95] text-center tracking-wide">
          Create Account
        </h2>
        <p className="text-center text-gray-500">
          Sign up to continue your journey
        </p>

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
              className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
            />
          </div>

          <Input
            label="Username"
            name="userName"
            placeholder="Enter your username"
            value={formData.userName}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
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
              className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#003B95] to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transform transition flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin border-2 border-t-2 border-white rounded-full w-6 h-6"></span>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#003B95] font-semibold hover:underline"
          >
            Log in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
