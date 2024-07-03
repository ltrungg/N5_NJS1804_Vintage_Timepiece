import { Avatar } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { generateChatRoomId } from "../../assistants/generators";

export default function WishListItem({ user, product, getRemoveItem }) {
  const handleRemove = () => {
    getRemoveItem(product);
  };

  const handleChat = async () => {
    await axios
      .get(`http://localhost:3000/chatRoom/user/${user.id}`)
      .then(async (res) => {
        console.log("LIST OF USER CHAT ROOMS: ", res.data);
        res.data.map(async (item) => {
          await axios
            .get(
              `http://localhost:3000/chatRoom/butUser/${user.id}/${item.chatRoom.id}`
            )
            .then((res) => {
              if (
                res.data.participant.id === product.owner.id &&
                res.data.chatRoom.product.id === product.id
              ) {
                window.location.href = `/chat/${res.data.chatRoom.code}`;
                return;
              }
            });
        });
        setTimeout(async () => {
          const newRoomCode = generateChatRoomId();
          console.log("New room code: ", newRoomCode);
          await axios
            .post("http://localhost:3000/chatRoom", {
              code: newRoomCode,
              product: product.id,
              participants: [user.id, product.owner.id],
            })
            .then((res) => {
              console.log("CREATE ROOM CHAT: ", res.data);
              window.location.href = `/chat/${newRoomCode}`;
            })
            .catch((err) => console.log(err));
        }, 2000);
      });
  };

  return (
    <div className="basis-[32%] shrink bg-white drop-shadow-md flex flex-col justify-between gap-2 p-4 rounded-md">
      <div
        onClick={() => (window.location.href = `/product/${product.id}`)}
        className="flex justify-between gap-2 cursor-pointer group"
      >
        <img src={product.image} alt="" className="w-16 h-16 rounded-full" />
        <div className="w-full flex flex-col items-start gap-2 text-xs">
          <p className="opacity-70">{product.brand}</p>
          <p className="font-semibold group-hover:underline">{product.name}</p>
          <p>$ {Math.round(product.price * 100) / 100}</p>
          <div className="flex items-center gap-1">
            <p className="text-[0.7em] opacity-80">owned by</p>
            <Avatar src={product.owner.avatar} size={24} />
            <p className="text-[0.9em]">{product.owner.username}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-2 text-xs py-2 font-semibold">
        <button
          onClick={handleChat}
          className="flex items-center gap-2 border border-green-700 text-green-700 rounded-md px-4 py-2 hover:bg-green-800 hover:text-white duration-200 text-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
          </svg>
          CHAT NOW
        </button>
        <button
          onClick={handleRemove}
          className="flex items-center gap-2 bg-red-600 text-white rounded-md p-2 hover:bg-red-800 duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
          </svg>
          REMOVE
        </button>
      </div>
    </div>
  );
}
