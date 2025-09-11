import React from "react";

const TableHeader = () => {
  return (
    <div className="grid grid-cols-9 lg:gap-4 mb-4 lg:px-4 text-gray-300 bg-gray-800 lg:p-2 rounded-md text-[12px] lg:text-[16px]">
      <div className="col-span-2">Name</div>
      <div className="col-span-1 text-center">ID</div>
      <div className="col-span-1 text-center">Rating</div>
      <div className="col-span-1 ms-1 text-center">App</div>
      <div className="col-span-2 text-center">Phone</div>
      <div className="col-span-1 text-start">View</div>
      <div className="col-span-1">Report</div>
    </div>
  );
};

export default TableHeader;
