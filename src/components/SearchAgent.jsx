"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, X } from "lucide-react";

export default function AgentSearchModal({ isOpen, onClose }) {
  const [type, setType] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");

  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the query parameters object
    const queryParams = new URLSearchParams();

    if (type && type !== "All") queryParams.set("type", type);
    if (userId) queryParams.set("userId", userId);
    if (whatsappNo) queryParams.set("whatsappNo", whatsappNo);

    // Navigate to the SearchPage with the query parameters
    router.push(`/search?${queryParams.toString()}`);

    // Close the modal after navigation
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-[#1C1C24] p-6 shadow-lg mx-2">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-full bg-yellow-500 p-1">
            <User className="h-5 w-5 text-[#1C1C24]" />
          </div>
          <h2 className="text-xl font-medium text-white">এজেন্ট খুজুন</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Type Dropdown */}
          <div className="mb-2">
            <label className="mb-2 block text-yellow-500">Type</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg bg-[#2C2C34] px-4 py-2 text-left text-gray-200"
              >
                <span>{type}</span>
                <ChevronDown className="h-5 w-5" />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-1 w-full rounded-lg bg-[#2C2C34] py-1">
                  {["All", "ADMIN", "SUB_ADMIN", "SUPER_ADMIN", "MASTER"].map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setType(option);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-200 hover:bg-[#3C3C44]"
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Search by Agent ID */}
          <div className="mb-2">
            <label className="mb-2 block text-yellow-500">
              Search By Agent ID
            </label>
            <input
              type="text"
              placeholder="Agent ID Number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full rounded-lg bg-[#2C2C34] px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Search by Whatsapp */}
          <div className="mb-4">
            <label className="mb-2 block text-yellow-500">
              Search by Whatsapp
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={whatsappNo}
              onChange={(e) => setWhatsappNo(e.target.value)}
              className="w-full rounded-lg bg-[#2C2C34] px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black hover:bg-yellow-400"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
