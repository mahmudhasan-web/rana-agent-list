"use client";

import api from "@/app/utils/api";
import { X, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReportModal({ userId, isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fethUser = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/list/${userId}`);
        setUser(response.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fethUser();
  }, [userId]);

  if (!isOpen) return null;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-lg bg-[#1C1C24] top-2 p-3 mx-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* User Icon */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500">
            <User className="h-8 w-8 text-[#1C1C24]" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid lg:grid-cols-2 gap-1 lg:gap-4">
          {/* Name */}
          <div>
            <label className="block text-yellow-500">Name</label>
            <div className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white">
              {user?.fullname}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-yellow-500">Type</label>
            <div className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white">
              {user?.role}
            </div>
          </div>

          {/* Number */}
          <div>
            <label className="block text-yellow-500">Number</label>
            <div className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white">
              {user?.phoneNumber}
            </div>
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-yellow-500">Id Number</label>
            <div className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white">
              {user?.userId}
            </div>
          </div>
        </div>

        {/* Report Button */}
        <div className="mt-2 flex justify-center">
          <button className="rounded-lg px-6 py-1 font-medium text-white hover:bg-red-600">
            {user?.referRole} ID : {user?.referUserId}
          </button>
        </div>
        <div className="mt-1 flex justify-center">
          <Link
            href={`https://wa.me/${user?.referWhatsApp}`}
            className="rounded-lg bg-red-500 px-6 py-1 font-medium text-white hover:bg-red-600"
          >
            Report to Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
