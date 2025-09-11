"use client";
import api from "@/app/utils/api";
import { X, User, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import ReportModal from "./Report";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UserDetailsModal({ userId, isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const accessToken = Cookies.get("accessToken");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/list/${userId}`);
        setUser(response.data.result);
      } catch (error) {
        setError("Failed to fetch user.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleReportModal = () => {
    setReportModal(true);
  };

  const updatedUser = {
    fullname: user?.fullname,
    role: user?.role,
    phoneNumber: user?.phoneNumber,
    userId: Number(user?.userId),
    whatsappNumber: user?.whatsappNumber,
    rating: Number(user?.rating),
  };

  const handleUpdateUser = async () => {
    if (!accessToken) return;

    setIsUpdating(true);
    try {
      await api.patch(`/users/list/${userId}`, updatedUser, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });
      toast.success("Updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!accessToken) return;

    setIsUpdating(true);
    try {
      await api.delete(`/users/list/${userId}`, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });
      toast.success("Deleted successfully!");
      onClose();
      router.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;
  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <ToastContainer position="top-left" />
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
        <div className="mt-8 grid lg:grid-cols-2 gap-1">
          {/* Name */}
          <div>
            <label className="block text-yellow-500">Name</label>
            <input
              className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white w-full"
              value={user?.fullname || ""}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              disabled={!accessToken}
            />
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
            <input
              className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white w-full"
              value={user?.phoneNumber || ""}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              disabled={!accessToken}
            />
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-yellow-500">ID Number</label>
            <input
              type="number"
              className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white w-full"
              value={user?.userId || ""}
              onChange={(e) => setUser({ ...user, userId: e.target.value })}
              disabled={!accessToken}
              min={1}
              max={5}
            />
          </div>

          {accessToken && (
            <>
              <div>
                <label className="block text-yellow-500">WhatsApp</label>
                <input
                  className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white w-full"
                  value={user?.phoneNumber || ""}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                  disabled={!accessToken}
                />
              </div>
              <div>
                <label className="block text-yellow-500">Rating</label>
                <input
                  type="number"
                  className="rounded-lg bg-[#2C2C34] px-4 py-1 text-white w-full"
                  value={user?.rating || ""}
                  onChange={(e) => setUser({ ...user, rating: e.target.value })}
                  disabled={!accessToken}
                  min={1}
                  max={5}
                />
              </div>
            </>
          )}

          {!accessToken && (
            <div className="flex flex-row lg:gap-32 justify-between items-center">
              <div>
                <label className="block text-yellow-500">Message</label>
                <Link
                  href={`https://wa.me/${user?.whatsappNumber}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2C2C34] px-4 py-1 text-white hover:bg-[#3C3C44]"
                >
                  <FaWhatsapp />
                  Whatsapp
                </Link>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-yellow-500">Rating</label>
                <div className="flex gap-1">
                  {[...Array(user?.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="mt-6">
            {/* Report Button */}
            <button
              onClick={handleReportModal}
              className="rounded-lg bg-red-500 px-6 py-1 font-medium text-white hover:bg-red-600"
            >
              Report
            </button>
          </div>
          {/* Update Button */}
          {accessToken && (
            <div className="mt-6 flex gap-2">
              <button
                onClick={handleUpdateUser}
                className="rounded-lg bg-green-500 px-6 py-1 font-medium text-white hover:bg-green-600"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                onClick={handleDeleteUser}
                className="rounded-lg bg-red-500 px-6 py-1 font-medium text-white hover:bg-red-600"
                disabled={isUpdating}
              >
                {isUpdating ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      <ReportModal
        userId={user?.id}
        isOpen={reportModal}
        onClose={() => setReportModal(false)}
      />
    </div>
  );
}
