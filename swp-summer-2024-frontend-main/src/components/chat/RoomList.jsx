import React, { useState } from "react";
import RoomItem from "./RoomItem";
import EmptyChatList from "../../assets/images/chat/emptyChatList.jpg";

export default function RoomList({
  currentSelectedRoomId,
  list,
  getSelectedRoom,
}) {
  return (
    <div className="w-1/4 min-h-[85vh] max-h-[85vh] rounded-l-xl bg-white drop-shadow-xl flex flex-col flex-nowrap overflow-y-auto">
      <p className="w-full px-8 py-4 text-[1.5em] font-bold border-b border-gray-300">
        CHAT
      </p>
      {list.length === 0 ? (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center opacity-50">
          <img src={EmptyChatList} alt="" className="w-40 rounded-full" />
          <p className="text-[0.9em] font-semibold">
            NO CHAT ROOM CONNECTED YET!
          </p>
        </div>
      ) : (
        list.map((item, index) => {
          return (
            <RoomItem
              key={index}
              chatRoom={item}
              current={currentSelectedRoomId === item.chatRoom.code}
              getSelectedRoom={(value) => getSelectedRoom(value)}
            />
          );
        })
      )}
    </div>
  );
}
