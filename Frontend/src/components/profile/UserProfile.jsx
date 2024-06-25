import { message } from "antd";
import React, { useEffect } from "react";

export default function UserProfile() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log("User profile: ", user);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center gap-4 rounded-xl px-8 py-16">
      {contextHolder}
      <div className="w-1/4 rounded-full overflow-hidden">
        <img src={user.avatar} alt="" className="w-full" />
      </div>
      <p className="text-xl font-bold">{user.username}</p>

      <button
        onClick={() => {
          messageApi.open({
            key: "editProfile",
            type: "warning",
            content: "Profile editing is in developing process...",
            duration: 5,
          });
        }}
        className="flex items-center gap-2 bg-sky-300 hover:bg-sky-500 px-8 py-3 font-semibold text-black rounded-3xl mb-8 duration-300"
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

      <div className="w-full flex flex-col items-start border border-sky-800 bg-slate-100 rounded-[30px] px-8 py-4">
        <p className="text-xs opacity-70">Email:</p>
        <p className="max-w-full text-nowrap overflow-hidden text-ellipsis">
          {user.email}
        </p>
      </div>
      <div className="w-full flex flex-col items-start border border-sky-800 bg-slate-100 rounded-[30px] px-8 py-4">
        <p className="text-xs opacity-70">Phone number:</p>
        <p className="max-w-full text-nowrap overflow-hidden text-ellipsis">
          {user.phone}
        </p>
      </div>
    </div>
  );
}
