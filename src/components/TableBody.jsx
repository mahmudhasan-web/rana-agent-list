import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const TableBody = ({ admin, handleModal, handleReport }) => {
  return (
    <>
      {/* ================= MOBILE CARD ================= */}
      <div className="lg:hidden bg-[#22242c] rounded-xl p-4 mb-3 space-y-3">

        {/* Top Section */}
        <div className="flex justify-between items-start">

          {/* Profile */}
          <div className="flex gap-3">

            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-medium">
                {admin?.fullname}
              </p>

              <p className="text-xs text-gray-400">
                Sub Admin
              </p>
            </div>

          </div>

          {/* ID */}
          <div className="bg-yellow-400 text-black text-xs px-2 py-1 flex gap-1  rounded-md text-center">
            <div>ID :</div>
            <div className="font-semibold">
              {admin?.userId}
            </div>
          </div>

        </div>


        {/* WhatsApp */}
        <div className="flex justify-center">

          <a
            href={`https://wa.me/${admin?.whatsappNo}`}
            target="_blank"
          >
            <FaWhatsapp className="text-green-500 w-6 h-6" />
          </a>

        </div>


        {/* Phone */}
        <div className="text-center">

          <p className="text-sm">
            {admin?.phoneNumber}
          </p>

          <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Whatsapp
          </span>

        </div>


        {/* Buttons */}
        <div className="flex justify-between items-center pt-2">

          <button
            onClick={() => handleModal(admin?.id)}
          >
            <FiEye size={20} />
          </button>

          <button
            onClick={() => handleReport(admin.id)}
            className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm w-[70%]"
          >
            Report
          </button>

        </div>

      </div>



      {/* ================= DESKTOP ROW ================= */}

      <div className="hidden lg:grid grid-cols-9 items-center bg-[#22242c] p-3 rounded-lg mb-2">

        {/* Profile */}
        <div className="col-span-2 flex items-center gap-3">

          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>

          <div>

            <p>{admin?.fullname}</p>

            <p className="text-xs text-gray-400">
              Sub Admin
            </p>

          </div>

        </div>


        {/* ID */}
        <div className="col-span-1 text-center">

          <span className="bg-yellow-400 text-black px-2 py-1 rounded-md text-xs">

            ID {admin?.userId}

          </span>

        </div>


        {/* Rating */}
        <div className="col-span-1 flex justify-center">

          {[...Array(admin?.rating || 0)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}

        </div>


        {/* WhatsApp */}
        <div className="col-span-1 flex justify-center">

          <FaWhatsapp className="text-green-500 w-6 h-6" />

        </div>


        {/* Phone */}
        <div className="col-span-2 text-center">

          {admin?.phoneNumber}

        </div>


        {/* View */}
        <div className="col-span-1 text-center">

          <button
            onClick={() => handleModal(admin?.id)}
          >
            <FiEye size={20} />
          </button>

        </div>


        {/* Report */}
        <div className="col-span-1 text-center">

          <button
            onClick={() => handleReport(admin.id)}
            className="bg-red-500 px-4 py-2 rounded text-sm"
          >
            Report
          </button>

        </div>

      </div>

    </>
  );
};

export default TableBody;
