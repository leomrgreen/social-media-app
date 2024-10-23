"use client";

import NoroffAPI from "@/lib/api/authAPI";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const response = await api.auth.login(formData);
      console.log("Login successful:", response);
      alert(`Login successful for ${response.data.name}`);
      window.location.href = "/feed"; // redirect to feed after login
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[80%]">
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
      <Input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginForm;
