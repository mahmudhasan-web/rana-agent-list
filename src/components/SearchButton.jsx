"use client";
import React from "react";
import AgentSearchModal from "./SearchAgent";
import { FaSearch } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import Logo from "@/assets/logo.jpg";
import Image from "next/image";

const SearchButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button className="flex justify-between w-full md:hidden lg:hidden mt-4 px-4">
        <FaSearch
          onClick={() => setIsModalOpen(true)}
          className="text-yellow-400"
          size={20}
        />
        <Image
          src={Logo}
          width={300}
          height={300}
          alt="logo"
          className="rounded-lg w-[300px] h-[70px]"
        />
        <HiMiniSquares2X2
          onClick={() => setIsMenuOpen(true)}
          className="text-yellow-400"
          size={26}
        />
      </button>
      <AgentSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default SearchButton;
