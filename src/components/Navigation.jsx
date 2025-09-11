"use client"; // Ensure it's a Client Component
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import AgentSearchModal from "./SearchAgent";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { LogOutIcon } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const pathname = usePathname();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUserInfo(decodedToken);
    } else {
      setUserInfo(null);
    }
  }, [accessToken]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUserInfo(null);
  };

  const getLinkClass = (href) =>
    pathname === href ? "text-yellow-400 font-semibold" : "text-white";

  return (
    <div className="flex justify-evenly items-center px-2 lg:py-2 bg-gray-800 shadow-md rounded-lg gap-[140px]">
      <button
        onClick={() => setIsModalOpen(true)}
        className="hidden sm:flex items-center bg-[#1F2029] rounded-lg px-1 py-2 ms-4 w-[15%]"
      >
        <span className="text-xl">🔍</span>
        <span className="w-full bg-[#1F2029] text-white">এজেন্ট খুজুন</span>
      </button>

      <div className="flex lg:gap-4 gap-1 text-[14px] lg:text-lg lg:py-0 py-3">
        <Link
          href="/"
          className={`${getLinkClass("/")} flex items-center gap-1`}
        >
          <IoHomeSharp />
          Home
        </Link>
        <Link
          href="/admin"
          className={`${getLinkClass("/admin")} flex items-center gap-0.5`}
        >
          <RiAdminFill /> Admin
        </Link>
        <Link
          href="/sub-admin"
          className={`${getLinkClass("/sub-admin")} flex items-center gap-0.5`}
        >
          <BsPersonFill /> SubAdmin
        </Link>
        <Link
          href="/super-admin"
          className={`${getLinkClass("/super-admin")} flex items-center gap-0.5`}
        >
          <BsPersonFill /> Super
        </Link>
        <Link
          href="/master"
          className={`${getLinkClass("/master")} flex items-center gap-0.5`}
        >
          <BsPersonFill /> Master
        </Link>
      </div>
      {userInfo?.role === "ADMIN" ? (
        <div className="lg:flex gap-1 hidden">
          <button
            onClick={handleLogout}
            className=" bg-green-500 px-2 py-1 rounded-md flex items-center"
          >
            <LogOutIcon size={12} /> Logout
          </button>
          <button className=" bg-green-500 px-2 py-1 rounded-md">
            <Link
              href="/create-list"
              className={`${getLinkClass("/master")} flex items-center gap-1`}
            >
              <FaPlus /> Add
            </Link>
          </button>
        </div>
      ) : (
        <div className="lg:flex gap-1 hidden">
          <button className=" bg-green-500 px-2 py-1 rounded-md">
            <Link
              href="/login"
              className={`${getLinkClass("/master")} flex items-center gap-1`}
            >
              <BsPersonFill /> Login
            </Link>
          </button>
          <button className=" bg-green-500 px-2 py-1 rounded-md">
            <Link
              href="/signup"
              className={`${getLinkClass("/master")} flex items-center gap-1`}
            >
              <BsPersonFill /> Signup
            </Link>
          </button>
        </div>
      )}

      <AgentSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Navigation;
