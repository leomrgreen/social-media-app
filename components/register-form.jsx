"use client";

import NoroffAPI from "@/lib/api/authAPI";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      const response = await api.auth.register(formData);
      console.log("Registration successful:", response);
      alert(`Welcome, ${response.data.name}! Your account has been created.`);
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Registration failed, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid gap-3">
      <Label htmlFor="name">Username</Label>
      <Input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Pick a username"
        pattern="^[\w]+$"
        maxLength={20}
        required
        title="Name should contain only letters and numbers, no spaces or special characters."
      />
      <Label htmlFor="email">Your email address</Label>
      <Input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
        required
        title="Email should be a valid Noroff mail"
      />
      <Label htmlFor="password">Your password</Label>
      <Input
        type="password"
        name="password"
        id="password"
        minLength={8}
        title="Password must be at least 8 characters long."
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
