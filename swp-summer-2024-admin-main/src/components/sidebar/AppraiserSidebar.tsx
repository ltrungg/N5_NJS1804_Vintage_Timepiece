"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AppraiserSidebar() {
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(window.location.pathname);
  }, [path]);
  return (
    <div className="min-h-screen min-w-56 flex flex-col float-left border-r-2 border-black items-start py-4 px-4 gap-4">
      <Link
        href="/user/appraisers"
        className={`flex items-center w-full h-[8vh] text-sm font-bold px-4 rounded-md mb-[-10%] hover:bg-gray-800 hover:text-white
        ${path.match("/user") ? "bg-gray-800 text-white" : ""}`}
      >
        All Appraisal
      </Link>
      <Link
        href="/user/appraisers"
        className={`flex items-center w-[92%] h-[6vh] text-xs px-4 my-2 rounded-md ml-4 mb-[-10%] hover:bg-cyan-800 hover:text-white
        ${path === "/user/appraisers" ? "bg-cyan-800 text-white" : ""}`}
      >
        All
      </Link>
      <Link
        href="/user/inAppraisal"
        className={`flex items-center w-[92%] h-[6vh] text-xs px-4 my-2 rounded-md ml-4 mb-[-10%] hover:bg-cyan-800 hover:text-white
        ${path === "/user/inAppraisal" ? "bg-cyan-800 text-white" : ""}`}
      >
        Pending requests
      </Link>
      <Link
        href="/user/history"
        className={`flex items-center w-[92%] h-[6vh] text-xs px-4 my-2 rounded-md ml-4 mb-[-10%] hover:bg-cyan-800 hover:text-white
        ${path === "/user/history" ? "bg-cyan-800 text-white" : ""}`}
      >
        History
      </Link>
    </div>
  );
}
