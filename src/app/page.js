"use client";
import { RiFacebookFill } from "react-icons/ri";
import { FaTelegram, FaUserAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Swipers from "@/components/Swiper";
import Link from "next/link";
import ReportModal from "@/components/Report";
import { useEffect, useState } from "react";
import api from "./utils/api";

export default function Home() {
  const [reportModal, setReportModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReport = (id) => {
    setReportModal(true);
    setSelectedUserId(id);
  };

  useEffect(() => {
    const fetchMaster = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/list/random/master`);
        console.log(response);
        setUser(response.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaster();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* facebook group section */}
      <div className="px-2 flex justify-evenly  items-center py-2 bg-gray-800 shadow-md rounded-lg gap-2 lg:gap-[140px]">
        <p className="text-yellow-400 text-xs lg:text-lg">
          আমাদের অফিসিয়াল গ্রুপঃ
        </p>
        <div className="flex gap-4">
          <Link
            href={
              "https://www.facebook.com/groups/2831053157025919/?ref=share&mibextid=NSMWBT"
            }
            className="bg-blue-500 flex items-center p-1 rounded-lg"
          >
            <RiFacebookFill size={22} />
            <button className="hidden lg:flex text-xs lg:text-lg">
              {" "}
              এখানে ক্লিক করুন
            </button>
          </Link>
          <Link
            href={"https://t.me/BetxwinOfficial444"}
            className="bg-blue-500 flex items-center p-1 rounded-lg"
          >
            <FaTelegram size={22} />
            <button className="hidden lg:flex text-xs lg:text-lg">
              {" "}
              এখানে ক্লিক করুন
            </button>
          </Link>
        </div>
      </div>

      {/* master agent adn proxi link */}
      <div className="flex lg:flex-row flex-col justify-evenly items-center py-2 shadow-md rounded-lg gap-4">
        <div className="w-full lg:px-10 p-3 lg:pt-6 lg:pb-16 bg-gray-800 shadow-md rounded-lg lg:gap-8 gap-4 flex flex-col items-center">
          <p className="text-yellow-400">কুইক মাস্টার এজেন্ট নম্বর</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-[#1F2029] lg:px-6 lg:py-3 p-2 rounded-md flex justify-between lg:gap-4 w-full">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 lg:p-2 p-1 rounded-full">
                  <FaUserAlt className="text-black w-4 h-4 lg:w-6 lg:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="lg:text-lg text-xs">{user?.fullname}</span>
                  <span className="text-xs">{user?.role}</span>
                </div>
              </div>
              <div className="flex items-center lg:gap-4 gap-2">
                <div className="bg-yellow-400 p-1 flex flex-col rounded-md text-black">
                  <span className="text-xs font-bold">ID</span>
                  <span className="text-xs font-bold">{user?.userId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="lg:text-lg text-xs">{user?.whatsappNo}</span>
                  <span className="text-xs bg-green-500 rounded-lg px-1 w-16">
                    Whatsapp
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <Link
                  href={`https://wa.me/${user?.whatsappNo}`}
                  className="bg-green-500 px-1 rounded-md text-xs lg:text-lg"
                >
                  Message
                </Link>
                <button
                  onClick={() => handleReport(user?.id)}
                  className="bg-orange-600 px-1 rounded-md text-xs lg:text-lg"
                >
                  Report
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:px-10 px-4 py-4 bg-gray-800 shadow-md rounded-lg gap-8 flex flex-col items-center">
          <p className="text-yellow-400">আমাদের প্রক্সি লিংক</p>
          <div className="bg-[#1F2029] lg:px-6 px-2 py-3 rounded-md flex flex-col justify-between gap-4 w-full overflow-y-auto h-[130px] lg:h-[140px]">
            <div className="flex flex-row w-full items-center lg:gap-4 gap-2 justify-between lg:text-lg text-xs">
              <span className="text-yellow-400">Main Link</span>
              <p className="text-white">https://batxwin.bet</p>
              <div className="flex items-center justify-center">
                <GoDotFill className="text-green-400" />
                <p className="text-green-400">Active</p>
              </div>
              <Link
                href={"https://batxwin.bet"}
                className="bg-yellow-400 rounded-md px-2 text-black"
              >
                Visit
              </Link>
            </div>
            {/* <div className="flex flex-row w-full items-center gap-4 justify-between lg:text-lg text-xs">
              <span className="text-yellow-400">Main Link</span>
              <p className="text-white">10wikets.live</p>
              <div className="flex items-center justify-center">
                <GoDotFill className="text-green-400" />
                <p className="text-green-400">Active</p>
              </div>
              <button className="bg-yellow-400 rounded-md px-2 text-black">
                Visit
              </button>
            </div>
            <div className="flex flex-row w-full items-center gap-4 justify-between lg:text-lg text-xs">
              <span className="text-yellow-400">Main Link</span>
              <p className="text-white">10wikets.live</p>
              <div className="flex items-center justify-center">
                <GoDotFill className="text-green-400" />
                <p className="text-green-400">Active</p>
              </div>
              <button className="bg-yellow-400 rounded-md px-2 text-black">
                Visit
              </button>
            </div>
            <div className="flex flex-row w-full items-center gap-4 justify-between lg:text-lg text-xs">
              <span className="text-yellow-400">Main Link</span>
              <p className="text-white">10wikets.live</p>
              <div className="flex items-center justify-center">
                <GoDotFill className="text-green-400" />
                <p className="text-green-400">Active</p>
              </div>
              <button className="bg-yellow-400 rounded-md px-2 text-black">
                Visit
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg w-full flex flex-col lg:flex-row gap-6 p-4">
        <div className="lg:w-[80%] w-full">
          {/* Title */}
          <h2 className="text-yellow-400 text-center lg:text-xl font-semibold mb-4">
            এজেন্ট কয় ধকারঃ
          </h2>

          {/* Main Container */}
          <div className="grid lg:grid-cols-3 gap-4 bg-[#1F2029] lg:p-4 p-2 rounded-lg">
            {/* Card 1 */}
            <div className="bg-gray-800 p-4 rounded-lg text-center flex flex-col justify-between items-center">
              <h3 className="text-yellow-400 text-center lg:text-[16px] font-semibold">
                অনলাইন সুপার এজেন্ট লিঙ্কঃ
              </h3>
              <p className="text-white text-sm mt-2">
                সুপার এজেন্ট বা, ইউজার একাউন্ট এবং মাস্টার এজেন্ট একাউন্ট খুলে
                দিতে পারেনা। কোন সুপার এজেন্ট এর নামে অভিযোগ থাকলে সরাসরি এডমিন
                কে জানাতে হবে।
              </p>
              <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md lg:w-full">
                Report
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 p-4 rounded-lg text-center flex flex-col justify-between items-center">
              <h3 className="text-yellow-400 lg:text-[16px] font-semibold">
                অনলাইন মাস্টার এজেন্ট লিঙ্কঃ
              </h3>
              <p className="text-white text-sm mt-2">
                অনলাইন মাস্টার এজেন্ট বা, শুধু ইউজার একাউন্ট খুলে দিতে পারেন।
                কোন মাস্টার এজেন্ট এর নামে অভিযোগ থাকলে সরাসরি সুপার এজেন্ট এর
                কাছে অভিযোগ করতে হবে।
              </p>
              <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md lg:w-full">
                Report
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center">
              <h3 className="text-yellow-400 text-lg font-semibold lg:text-[16px]">
                লোকাল মাস্টার এজেন্ট লিঙ্কঃ
              </h3>
              <p className="text-white text-sm mt-4">
                লোকাল মাস্টার এজেন্ট বা, শুধু ইউজার একাউন্ট খুলে দিতে পারেন।
                কিন্তু তাদের সাথে লেনদেন প্রতিটি ইউজার এর নিজ দায়িত্বে লেনদেন
                করতে হবে। তাদের নামে কোন অভিযোগ কারো কাছে করা যাবেনা।
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="rounded-lg lg:w-[20%] w-full">
          <h2 className="text-yellow-400 text-center lg:text-xl font-semibold mb-4">
            এজেন্ট লিস্টঃ
          </h2>
          <div className="bg-[#1F2029] lg:p-4 p-2 rounded-lg">
            <div className="text-white text-sm bg-gray-800 p-4 rounded-lg">
              একাউন্ট খুলতে নির্ধারিত অনলাইন এজেন্ট লিঙ্ক এ ক্লিক করুন। এজেন্ট
              লিঙ্ক এর এজেন্ট দের সাথে ইউজার দের শুধু মাত্র হোয়াটসঅ্যাপ এর
              মাধ্যমে যোগাযোগ করতে হবে। হোয়াটসঅ্যাপ ছাড়া অন্য কোন মাধ্যমে
              যোগাযোগ করলে বা লেনদেন করলে তা গ্রহণযোগ্য হবে না।
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4">
        <div className="bg-gray-800 rounded-lg w-full flex flex-col items-center gap-6 lg:p-8 p-4">
          <p className="text-yellow-400">কিভাবে একাউন্ট খুলবেনঃ</p>
          <div className="bg-[#1F2029] lg:p-6 rounded-lg text-white lg:mx-4 p-2 lg:text-[16px] text-[14px]">
            https://batxwin.bet তে একাউন্ট করতে হলে আপনার এজেন্ট এর মাধ্যমে একাউন্ট
            খুলতে হবে। এজেন্ট এর মাধ্যমেই টাকা ডিপোজিট এবং উইথড্র করতে হবে। আপনি
            যে এজেন্ট এর কাছ থেকে একাউন্ট খুলবেন তার সাথেই সব সময় লেনদেন করতে
            হবে। ঠিক কোন এজেন্ট কে টাকা দিবেন এবং কিভাবে তার সাথে লেনদেন করবেন
            তার বুঝতে হলে আপনার নিম্বের তথ্য গুলো পড়া জরুরী।
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg w-full flex flex-col items-center gap-6 lg:p-8 p-4">
          <p className="text-yellow-400">betXwin এর নতুন সব আপডেট</p>
          <div className="rounded-lg text-white mx-4 w-full max-w-md">
            <Swipers />
          </div>
        </div>
        <ReportModal
          userId={selectedUserId}
          isOpen={reportModal}
          onClose={() => setReportModal(false)}
        />
      </div>
    </div>
  );
}
