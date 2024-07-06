import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function AppraisersProfile() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const getEditStatus = async (value) => {};

  useEffect(() => {
    console.log("User profile: ", user);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center gap-4 rounded-xl px-8 py-8">
      <p className="text-xl font-bold">Appraiser</p>
      <div className="w-full flex flex-col items-start justify-center gap-2">
        <div className="w-1/2 min-w-fit flex items-center gap-2">
          <Avatar src={user.avatar} alt="" size={40} />
          <p className="text-lg font-bold min-w-fit max-w-96 text-nowrap text-ellipsis overflow-hidden">
            {user.username}
          </p>
        </div>
      </div>
      <div className="w-full min-w-fit flex flex-col gap-1">
        <div className="w-full flex flex-col items-start border border-sky-800 bg-slate-100 rounded-[30px] px-4 py-2">
          <p className="text-xs opacity-70">Email:</p>
          <p className="max-w-96 text-nowrap overflow-hidden text-ellipsis">
            {user.email}
          </p>
        </div>
        <div className="w-full flex flex-col items-start border border-sky-800 bg-slate-100 rounded-[30px] px-4 py-2">
          <p className="text-xs opacity-70">Phone number:</p>
          <p className="max-w-full text-nowrap overflow-hidden text-ellipsis">
            {user.phone || "Not yet provided"}
          </p>
        </div>
      </div>
      <button
        onClick={() => setIsEditingProfile(true)}
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 px-8 py-3 font-semibold text-white rounded-3xl duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
        </svg>
        EDIT PROFILE
      </button>
      <EditProfileModal
        user={user}
        open={isEditingProfile}
        setOpen={setIsEditingProfile}
        getEditStatus={getEditStatus}
      />
    </div>
  );
}
