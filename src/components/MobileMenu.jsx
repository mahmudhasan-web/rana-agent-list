"use client";
import {
  X,
  Home,
  Users,
  User,
  Search,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo-betx365.webp";
import AgentSearchModal from "./SearchAgent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IoAddCircle, IoCreate } from "react-icons/io5";
import Link from "next/link";

export default function MobileMenu({ isOpen, onClose }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = Cookies.get("accessToken");

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/");
    setIsModalOpen(false);
    setUserInfo(null);
  };
  if (!isOpen) return null;

  const handleNavigation = (path) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1C1C24]">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Logo Section */}
      <div className="my-24 flex flex-col items-center">
        <Image
          src={Logo}
          alt="10WICKETS"
          width={200}
          height={80}
          className="mb-2"
        />
        <p className="text-lg font-bold">Official Agent List</p>
        <p className="mt-2">100% Secure & Reliable Online Betting Website</p>
      </div>

      <div className="bg-gray-800 flex flex-col gap-3 items-center">
        {/* Search Button */}
        <div className="mt-4" onClick={() => setIsModalOpen(true)}>
          <button className="flex items-center gap-12 rounded-lg bg-yellow-400 px-8 py-1 text-lg font-medium text-black hover:bg-yellow-400">
            <Search className="h-5 w-5" />
            <span>এজেন্ট খুজুন</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 w-full px-20 mb-4">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavigation("/admin")}
            className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
          >
            <Users className="h-4 w-4" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => handleNavigation("/sub-admin")}
            className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
          >
            <User className="h-4 w-4" />
            <span>Sub Admin</span>
          </button>

          <button
            onClick={() => handleNavigation("/master")}
            className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
          >
            <User className="h-4 w-4" />
            <span>Super</span>
          </button>

          {accessToken ? (
            <>
              <Link
                href={"/create-list"}
                onClick={() => handleNavigation("/master")}
                className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
              >
                <IoAddCircle className="h-4 w-4" />
                <span>Add List</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
              >
                <LogOutIcon className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/signup")}
                className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
              >
                <IoCreate className="h-4 w-4" />
                <span>Signup</span>
              </button>

              <button
                onClick={() => handleNavigation("/login")}
                className="flex items-center gap-12 rounded-lg bg-[#2C2C34] px-4 text-left text-white hover:bg-[#3C3C44]"
              >
                <LogInIcon className="h-4 w-4" />
                <span>Login</span>
              </button>
            </>
          )}
        </nav>
      </div>
      <AgentSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
