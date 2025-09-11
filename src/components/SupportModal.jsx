"use client";

import { X, Headphones } from "lucide-react";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function SupportModal({ isOpen, onClose }) {
  // Sample support contacts data
  const supportContacts = [
    { id: "CS-03", phone: "+447861669167" },
    { id: "CS-03", phone: "+447462930862" },
    { id: "CS-02", phone: "+447460259782" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-lg bg-gray-800">
        {/* Header */}
        <div className="absolute -top-6 left-1/2 flex w-[60%] -translate-x-1/2 items-center justify-center gap-2 rounded-lg bg-yellow-400 py-1">
          <RiCustomerService2Fill className="h-6 w-6" />
          <span className="text-xl font-semibold">Support</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Support Contacts List */}
        <div className="mt-10 space-y-1 px-6 py-2 bg-[#22242c] lg:m-4 my-2 rounded-md">
          {supportContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-14 border-b border-white pb-1"
            >
              <div className="flex items-center gap-4 lg:gap-10">
                <div className="flex lg:h-10 lg:w-10 h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                  <span className="font-medium text-black">
                    <RiCustomerService2Fill />
                  </span>
                </div>
                <div className="flex flex-row">
                  <span className="text-white lg:text-[16px] text-[10px]">{contact.id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400">{contact.phone}</span>
                </div>
              </div>
              <button
                className="rounded-lg bg-green-500 px-2 py-1 font-medium text-white hover:bg-green-600 lg:text-[16px] text-xs"
                onClick={() =>
                  window.open(
                    `https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`
                  )
                }
              >
                Message
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
