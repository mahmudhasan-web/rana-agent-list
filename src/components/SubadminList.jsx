"use client";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import UserDetailsModal from "./UserDetails";
import api from "@/app/utils/api";
import ReportModal from "./Report";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const SubadminList = () => {
  const [reportModal, setReportModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/users/list/subadmins?page=${currentPage}&limit=${limit}`
        );
        console.log(response);
        setAdmins(response.data.result.subadmins);
        setTotalPages(response.data.result.totalPages);
      } catch (error) {
        setError("Failed to fetch agents.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [currentPage]);

  const handlemodal = (id) => {
    console.log(id);
    setIsModalOpen(true);
    setSelectedUserId(id);
  };

  const handleReport = (id) => {
    setReportModal(true);
    setSelectedUserId(id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-yellow-400 lg:text-xl text-[14px] lg:font-bold font-semibold lg:mb-8 mb-2">
        BetXwin ONLINE Sub-Agent LIST
      </h1>
      <div className="min-h-screen bg-[#1a1b1f] text-white lg:p-4 p-2 rounded-md w-full">
        <div className="max-w-7xl mx-auto">
          <TableHeader />
          {loading ? (
            <p className="text-center grid grid-cols-1 gap-2 items-center bg-[#22242c] lg:p-3 p-1 rounded-lg mb-2">
              Loading...
            </p>
          ) : (
            <>
              {admins.length <= 0 ? (
                <p className="text-center grid grid-cols-1 gap-2 items-center bg-[#22242c] lg:p-3 p-1 rounded-lg mb-2">
                  No Admins Found
                </p>
              ) : (
                admins?.map((admin) => (
                  <TableBody
                    admin={admin}
                    handleModal={handlemodal}
                    handleReport={handleReport}
                  />
                ))
              )}
            </>
          )}
        </div>
        <ReportModal
          userId={selectedUserId}
          isOpen={reportModal}
          onClose={() => setReportModal(false)}
        />
        <UserDetailsModal
          userId={selectedUserId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <div className="mt-1">
        <button
          className="bg-blue-400 px-2 py-1 rounded-lg"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          className="bg-blue-400 px-2 py-1 rounded-lg"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubadminList;
