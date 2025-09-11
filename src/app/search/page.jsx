import SearchComponent from "@/components/SearchComponent";
import React, { Suspense } from "react";

const SearchPage = () => {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
};

export default SearchPage;
