"use client"

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Login({setToast}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading, error } = useLogin();
  
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      setToast({ message: "Login successful!", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Login failed", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" variant="primary" disabled={loading} className="w-full flex justify-center items-center">
            {loading ? (
              <span className="animate-spin border-2 border-t-2 border-white rounded-full w-5 h-5"></span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
