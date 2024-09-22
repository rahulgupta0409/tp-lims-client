import { Input } from "@mui/material";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ locationLabel, durationLabel, guessLabel }) => {
  return (
    <div
      //   onClick={searchModel.onOpen}
      className="border-[1px] bg-white md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        {/* <div className="hidden sm:block text-losm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div> */}
        <input style={{ width: "100%", outline: "none" }} type="text" />
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block text-center">{guessLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
