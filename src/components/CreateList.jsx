"use client";
import React, { useState } from "react";
import api from "@/app/utils/api";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

const CreateListPage = () => {
  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "SUB_ADMIN", label: "Sub Admin" },
    { value: "SUPER_ADMIN", label: "Super Admin" },
    { value: "MASTER", label: "Master" },
  ];

  const referRoleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "SUB_ADMIN", label: "Sub Admin" },
    { value: "SUPER_ADMIN", label: "Super Admin" },
    { value: "MASTER", label: "Master" },
  ];

  const [formData, setFormData] = useState({
    fullname: "",
    userId: "",
    rating: "",
    whatsappNo: "",
    phoneNumber: "",
    referUserId: "",
    referWhatsApp: "",
    role: "",
    referRole: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const accessToken = Cookies.get("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["userId", "rating", "referUserId"].includes(name)) {
      // If the value is empty, set it to an empty string; otherwise, parse it as a number
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/users/list/create", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("List created successfully!");
        setSuccess("List created successfully!");
        setFormData({
          fullname: "",
          userId: "",
          rating: "",
          whatsappNo: "",
          phoneNumber: "",
          referUserId: "",
          referWhatsApp: "",
          role: "",
          referRole: "",
        });
      } else if (response.error) {
        setError("Phone Number already exists.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:max-w-[50%] mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer position="top-left" />
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Create Master Admin
      </h2>
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-black">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 text-black mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-black">
            User ID
          </label>
          <input
            type="number"
            id="userId"
            name="userId"
            placeholder="Enter User ID"
            value={formData.userId}
            onChange={handleChange}
            className="w-full p-2 text-black mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-black">
            Rating
          </label>
          <input
            type="number"
            min={1}
            max={5}
            id="rating"
            name="rating"
            placeholder="Enter User Rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 text-black mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="whatsappNo" className="block text-black">
            WhatsApp Number
          </label>
          <input
            type="text"
            id="whatsappNo"
            name="whatsappNo"
            placeholder="Enter WhatsApp Number"
            value={formData.whatsappNo}
            onChange={handleChange}
            className="w-full text-black p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-black">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full text-black p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-black">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full text-black p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Role</option>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="referRole" className="block text-black">
            Refer Role
          </label>
          <select
            id="referRole"
            name="referRole"
            value={formData.referRole}
            onChange={handleChange}
            className="w-full text-black p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Refer Role</option>
            {referRoleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="referUserId" className="block text-black">
            Refer User ID
          </label>
          <input
            type="number"
            id="referUserId"
            name="referUserId"
            placeholder="Enter Refer User ID"
            value={formData.referUserId}
            onChange={handleChange}
            className="w-full text-black p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="referWhatsApp" className="block text-black">
            Refer WhatsApp Number
          </label>
          <input
            type="text"
            id="referWhatsApp"
            name="referWhatsApp"
            placeholder="Enter Refer WhatsApp Number"
            value={formData.referWhatsApp}
            onChange={handleChange}
            className="w-full text-black p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateListPage;
