"use client";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import api from "@/app/utils/api";
import ReportModal from "@/components/Report";
import UserDetailsModal from "@/components/UserDetails";
import { useSearchParams } from "next/navigation";

const SearchComponent = () => {
  const [reportModal, setReportModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const userId = searchParams.get("userId");
  const whatsappNo = searchParams.get("whatsappNo");

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/list/filter/search`, {
          params: {
            role: type,
            userId,
            whatsappNo,
          },
        });
        console.log(response);
        setAdmins(response.data.result);
      } catch (error) {
        setError("Failed to fetch agents.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [type, userId, whatsappNo, searchParams]);

  const handlemodal = (id) => {
    setIsModalOpen(true);
    setSelectedUserId(id);
  };

  const handleReport = (id) => {
    setReportModal(true);
    setSelectedUserId(id);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-yellow-400 lg:text-xl text-[14px] lg:font-bold font-semibold lg:mb-8 mb-2">
        Search Result
      </h1>
      <div className="min-h-screen bg-[#1a1b1f] text-white lg:p-4 p-2 rounded-md w-full">
        {/* Header Title */}

        <div className="max-w-7xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-7 lg:gap-4 mb-4 lg:px-4 text-gray-300 bg-gray-800 lg:p-2 rounded-md text-[12px] lg:text-[16px]">
            <div className="col-span-1">Name</div>
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Rating</div>
            <div className="col-span-1">App</div>
            <div className="col-span-1">Phone</div>
            <div className="col-span-1">View</div>
            <div className="col-span-1">Report</div>
          </div>

          {loading ? (
            <p className="text-center grid grid-cols-1 gap-2 items-center bg-[#22242c] lg:p-3 p-1 rounded-lg mb-2">
              Loading...
            </p>
          ) : (
            <>
              {admins?.map((admin) => (
                <div
                  key={admin.id}
                  className="grid grid-cols-7 gap-2 items-center bg-[#22242c] lg:p-3 p-1 rounded-lg mb-2 "
                >
                  {/* Name and Avatar */}
                  <div className="col-span-1 flex items-center lg:gap-3 gap-1">
                    <div className="lg:w-10 lg:h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg
                        className="lg:w-6 lg:h-6 w-4 h-4 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] lg:text-[16px]">
                        {admin.fullname}
                      </p>
                      <div className="text-xs text-gray-400">{admin.role}</div>
                    </div>
                  </div>

                  {/* ID Badge */}
                  <div className="col-span-1 ms-2 lg:ms-0">
                    <span className="bg-yellow-400 text-black lg:w-8 w-6 h-[35px] lg:px-2 px-1 lg:py-1 rounded-md text-xs flex flex-col items-center justify-center">
                      <span>ID</span> <span>{admin.userId}</span>
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="col-span-1 flex">
                    {[...Array(admin?.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="lg:w-3 lg:h-3 w-2 h-2 text-yellow-400 fill-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* WhatsApp Link */}
                  <div className="col-span-1">
                    <a
                      href={`https://wa.me/${admin.whatsappNo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <FaWhatsapp className="text-green-500 lg:h-8 lg:w-8" />
                    </a>
                  </div>

                  {/* Phone Number with WhatsApp Badge */}
                  <div className="col-span-1">
                    <div className="flex flex-col">
                      <span className="text-[8px] lg:text-[16px]">
                        {admin.phoneNumber}
                      </span>
                      <p className="bg-green-600 text-white text-[7px] lg:text-xs px-1 py-0.5 rounded-full lg:w-1/2 w-full">
                        Whatsapp
                      </p>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <button
                      onClick={() => handlemodal(admin.id)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <svg
                        className="lg:w-5 lg:h-5 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/*Report Buttons */}
                  <div className="col-span-1">
                    <button
                      onClick={() => handleReport(admin.id)}
                      className="bg-red-500 hover:bg-red-600 text-white lg:px-4 lg:py-2 rounded-md transition-colors lg:text-[16px] text-xs p-1"
                    >
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
          <ReportModal
            userId={selectedUserId}
            isOpen={reportModal}
            onClose={() => setReportModal(false)}
          />
        </div>
        <UserDetailsModal
          userId={selectedUserId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
