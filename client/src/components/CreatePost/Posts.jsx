import React from "react";
import {Filter }from "./Filter";
export function Posts() {
  return (
    <div>
      <div className="bg-gray-900 shadow-fb rounded w-full">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-white">Posts</div>
          <button className=" text-white px-4 py-2.5 focus:outline-none rounded flex justify-center items-center">
            <Filter/> <span className="ml-2 font-bold"></span>
          </button>
        </div>
      </div>
    </div>
  );
}