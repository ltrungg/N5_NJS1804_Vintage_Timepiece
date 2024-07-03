import React from "react";
import { Avatar } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function RoomItem({ chatRoom }) {
  const roomId = useParams().id;
  const currentlySelected = roomId && chatRoom.chatRoom.code === roomId;

  const handleSelectRoom = () => {
    if (roomId !== chatRoom.chatRoom.code) {
      window.location.replace(`/chat/${chatRoom.chatRoom.code}`);
    }
  };

  return (
    <div
      onClick={handleSelectRoom}
      className={`w-full flex items-center justify-between gap-2 p-2 cursor-default border-b border-gray-200 ${
        currentlySelected ? "bg-slate-200" : "bg-white hover:bg-slate-100"
      }`}
    >
      <div className="flex gap-2">
        <Avatar src={chatRoom.participant.avatar} alt="" size={40} />
        <div className="min-w-fit flex flex-col self-start justify-start gap-1">
          <div className="flex items-center gap-2">
            <p className="max-w-40 text-sm text-nowrap text-ellipsis overflow-hidden">
              {chatRoom.participant.username} &#8226;{" "}
            </p>
            <span className="flex items-center text-[0.6em] opacity-80">
              {moment(chatRoom.participant.lastActive).fromNow()}
            </span>
          </div>
          <p className="max-w-56 overflow-hidden text-nowrap text-ellipsis text-xs text-gray-500">
            {chatRoom.chatRoom.product.name}
          </p>
        </div>
      </div>
      <img
        src={chatRoom.chatRoom.product.image}
        alt=""
        className="w-16 rounded-full"
      />
    </div>
  );
}
