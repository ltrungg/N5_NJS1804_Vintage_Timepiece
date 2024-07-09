import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AppraisersProfile() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const location = useLocation();

  useEffect(() => {
    console.log("User profile: ", user);
  }, [user]);

  return (
    <aside className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="p-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden mb-4">
          <img
            src={user?.avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-lg font-bold truncate max-w-full">
          {user?.username}
        </p>
        <p className="text-sm text-gray-600">Appraiser</p>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link
              to="/appraisal/Appraisers"
              className={`block px-6 py-3 text-sm font-medium ${
                location.pathname === "/appraisal/all-requests"
                  ? "bg-sky-600 text-white"
                  : "text-gray-700 hover:bg-sky-100"
              }`}
            >
              All requests
            </Link>
          </li>
          <li>
            <Link
              to="/appraisal/new-request"
              className={`block px-6 py-3 text-sm font-medium ${
                location.pathname === "/appraisal/new-request"
                  ? "bg-sky-600 text-white"
                  : "text-gray-700 hover:bg-sky-100"
              }`}
            >
              New request
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
