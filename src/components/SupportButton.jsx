"use client";
import React, { useState } from "react";
import { MdOutlineSupportAgent } from "react-icons/md";
import SupportModal from "./SupportModal";

const SupportButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex flex-row gap-2 items-center fixed bottom-2 lg:left-24 left-6 bg-yellow-500 rounded-md py-1 px-2"
      >
        <MdOutlineSupportAgent />
        <p className="font-bold">Support</p>
      </button>
      <SupportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SupportButton;
