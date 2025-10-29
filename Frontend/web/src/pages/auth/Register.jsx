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

  const [errors, setErrors] = useState({});
  const { register, loading, error } = useRegister();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error on typing
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    // First name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    // Last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    // Username
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
      valid = false;
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
      valid = false;
    }

    // Email
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
      valid = false;
    }

    // Phone number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!/^\+?\d{9,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid";
      valid = false;
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    // Confirm password
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop if form is invalid

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
        <h2 className="text-4xl font-extrabold text-[#003B95] text-center tracking-wide">
          Create Account
        </h2>
        <p className="text-center text-gray-500">
          Sign up to continue your journey
        </p>

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
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
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
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName}</p>
          )}

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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <Input
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}

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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

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
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
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
