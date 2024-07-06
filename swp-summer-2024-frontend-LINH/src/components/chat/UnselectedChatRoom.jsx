import React from "react";
import ChatGif from "../../assets/images/chat/select_room.gif";

export default function UnselectedChatRoom() {
  return (
    <div className="relative w-1/2 h-[85vh] rounded-r-xl bg-white drop-shadow-xl border-l border-gray-400 flex flex-col items-center justify-center py-2">
      <img src={ChatGif} alt="" className="w-80 rounded-full" />
      <div className="flex flex-col items-center gap-4">
        <p className="font-semibold text-sm opacity-70">
          START TO PURCHASE ANY OF YOUR CHOICES AFAR
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="text-xs px-4 py-2 border border-gray-500 rounded-lg hover:text-white hover:bg-gray-600 duration-100"
        >
          GO GET A WATCH NOW!
        </button>
      </div>
    </div>
  );
}
