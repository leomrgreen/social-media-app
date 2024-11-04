"use client";

import NoroffAPI from "@/lib/api/authAPI";
import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import LoadingButton from "./ui/load-btn";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isLoading, setIsLoading] = useState(false);
  const api = new NoroffAPI();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await api.auth.login(formData);
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed, please try again.");
    } finally {
      setIsLoading(false);
      window.location.href = "/feed"; // redirect to feed after login
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid gap-3">
      <Label htmlFor="email">Your email address</Label>
      <Input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <Label htmlFor="password">Your password</Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {isLoading ? (
        <LoadingButton message="Login" />
      ) : (
        <Button type="submit">Login</Button>
      )}
    </form>
  );
};

export default LoginForm;
