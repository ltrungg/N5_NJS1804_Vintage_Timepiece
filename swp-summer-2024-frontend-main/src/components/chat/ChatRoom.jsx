import React, { useEffect, useState, createRef } from "react";
import { Avatar, Tooltip, Modal, Checkbox } from "antd";
import ScrollableFeed from "react-scrollable-feed";
import { generateNumericCode } from "../../assistants/generators";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import axios from "axios";
import dateFormat from "../../assistants/date.format";
import moment from "moment";

export default function ChatRoom({ user, chatRoomId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [groupedMessageList, setGroupedMessageList] = useState([
    {
      date: "",
      messages: [],
    },
  ]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [currentChatRoom, setCurrentChatRoom] = useState();
  const [isConfirmDeleteOn, setIsConfirmDeleteOn] = useState(false);
  const [checkedConfirmDelete, setCheckedConfirmDelete] = useState(false);

  const scrollableRef = createRef();

  const fetchChatRoomParticipant = async () => {
    await axios
      .get(
        `http://localhost:3000/chatRoom/butUser/code/${user.id}/${chatRoomId}`
      )
      .then((res) => {
        if (!res.data) {
          sessionStorage.setItem("notFoundChatRoom", "yes");
          window.location.replace("/chat");
        }
        setCurrentChatRoom(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    return () => fetchChatRoomParticipant();
  }, []);

  const messageRef = collection(db, "messages");

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        id: generateNumericCode(20),
        room: chatRoomId,
        author: user.username,
        authorId: user.id,
        avatar: user.avatar,
        message: currentMessage,
        date:
          (new Date(Date.now()).getDate() < 10 ? "0" : "") +
          new Date(Date.now()).getDate() +
          "/" +
          (new Date(Date.now()).getMonth() + 1 < 10 ? "0" : "") +
          (new Date(Date.now()).getMonth() + 1) +
          "/" +
          new Date(Date.now()).getFullYear(),
        time:
          new Date(Date.now()).getHours() +
          ":" +
          (new Date(Date.now()).getMinutes() < 10 ? "0" : "") +
          new Date(Date.now()).getMinutes(),
        createdAt: serverTimestamp(),
      };
      console.log("Message: ", messageData.date);
      await addDoc(messageRef, messageData);
      setMessageList((current) => [...current, messageData]);
    }
    setCurrentMessage("");
  };

  const handleScroll = (isBottom) => {
    if (!isBottom) {
      setIsAtBottom(false);
    } else {
      setIsAtBottom(true);
    }
  };

  const handleEnterPressed = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", chatRoomId),
      orderBy("createdAt", "asc")
    );
    const realTimeHandler = onSnapshot(queryMessages, (snapshot) => {
      let tempMessages = [];
      snapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessageList(tempMessages);

      const sorted = tempMessages.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      groupMessageByDate(sorted);
    });

    return () => realTimeHandler();
  }, []);

  const groupMessageByDate = (list) => {
    if (list.length === 0) {
      return;
    } else {
      let tempGroupedList = [
        {
          date: list[0].date,
          messages: [list[0]],
        },
      ];
      let tempDate = list[0].date;
      let count = 0;
      list.map((item, index) => {
        if (index === 0) return;
        if (item.date === tempDate) {
          if (tempGroupedList[count].messages !== undefined)
            tempGroupedList[count].messages.push(item);
          else {
            tempGroupedList[count].messages = [item];
          }
        } else {
          tempDate = list[index].date;
          tempGroupedList.push({
            date: tempDate,
            messages: [list[index]],
          });
          count++;
        }
      });
      setGroupedMessageList(tempGroupedList);
    }
  };

  const compareTime = (a, b) => {
    const arrayA = a.split(":");
    const arrayB = b.split(":");

    if (parseInt(arrayA[0]) < parseInt(arrayB[0])) return 1;
    else if (parseInt(arrayA[0]) > parseInt(arrayB[0])) return -1;
    else {
      if (parseInt(arrayA[1] + 30) < parseInt(arrayB[1])) return 1;
      else return -1;
    }
  };

  const handleDeleteChatRoom = async () => {
    await axios
      .delete(`http://localhost:3000/chatRoom/${currentChatRoom.chatRoom.id}`)
      .then(() => {
        sessionStorage.setItem("deleteChat", "deleted");
        window.location.replace("/chat");
      })
      .catch((err) => console.log(err));
  };

  if (!currentChatRoom)
    return (
      <div className="w-1/2 h-[85vh] rounded-r-xl bg-white drop-shadow-xl border-l border-gray-400 py-2"></div>
    );
  else
    return (
      <div className="relative w-1/2 h-[85vh] rounded-r-xl bg-white drop-shadow-xl border-l border-gray-400 flex flex-col items-start justify-end py-2">
        <div className="z-10 bg-white border-b border-gray-300 w-full flex items-center justify-between px-4 py-2">
          <div className="flex items-center justify-start gap-4">
            <Avatar src={currentChatRoom.participant.avatar} alt="" size={48} />
            <div className="flex flex-col">
              <p className="font-semibold">
                {currentChatRoom.participant.username}
              </p>
              <p className="text-[0.7em]">
                Active{" "}
                {moment(currentChatRoom.participant.lastActive).fromNow()}
              </p>
            </div>
          </div>

          <div
            onClick={() =>
              (window.location.href = `/product/${currentChatRoom.chatRoom.product.id}`)
            }
            className="flex items-center gap-2 px-4 py-2 rounded-[30px] bg-slate-100 hover:bg-slate-200 cursor-pointer"
          >
            <img
              src={currentChatRoom.chatRoom.product.image}
              alt=""
              className="w-10 rounded-full"
            />
            <div className="flex flex-col items-start gap-1 text-sm">
              <p className="max-w-56 overflow-hidden text-nowrap text-ellipsis">
                {currentChatRoom.chatRoom.product.name}
              </p>
              <p className="text-red-500">
                ${" "}
                {Math.round(currentChatRoom.chatRoom.product.price * 100) / 100}
              </p>
            </div>
          </div>

          <button onClick={() => setIsConfirmDeleteOn(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-red-700"
            >
              <path d="M2.80777 1.3934L22.6068 21.1924L21.1925 22.6066L17.5846 18.9994L6.45516 19L2.00016 22.5V4C2.00016 3.8307 2.04223 3.67123 2.11649 3.53146L1.39355 2.80762L2.80777 1.3934ZM3.99955 5.4134L4.00016 18.3853L5.76349 17L15.5846 16.9994L3.99955 5.4134ZM21.0002 3C21.5524 3 22.0002 3.44772 22.0002 4V17.785L20.0002 15.785V5L9.21316 4.999L7.21416 3H21.0002Z"></path>
            </svg>
          </button>
        </div>
        <ScrollableFeed
          ref={scrollableRef}
          forceScroll
          onScroll={handleScroll}
          className="w-full"
        >
          <div className="grow w-full min-h-[65vh] flex flex-col items-start justify-end gap-8 py-2 overflow-y-auto">
            {groupedMessageList.map((group, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col items-start justify-start gap-2 overflow-x-hidden"
                >
                  <p className="w-full text-center text-[0.65em] font-light">
                    {group.messages[0]?.time}
                    {group.date === dateFormat(new Date(), "dd/mm/yyyy")
                      ? ""
                      : `, ${group.date}`}
                  </p>
                  <div className="w-full flex flex-col gap-1">
                    {group.messages?.map((mes, i) => {
                      return (
                        <div key={i} className="w-full flex flex-col">
                          <p
                            className={`w-full text-center text-[0.65em] font-light ${
                              (i > 0 &&
                                compareTime(
                                  group.messages[i - 1].time,
                                  mes.time
                                ) < 1) ||
                              i == 0
                                ? "hidden"
                                : "inline"
                            }`}
                          >
                            {mes.time}
                          </p>
                          <div
                            key={i}
                            className={`px-2 w-full flex items-center ${
                              mes.authorId === user.id
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`flex ${
                                mes.authorId === user.id
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              } items-center gap-2`}
                            >
                              <Tooltip
                                title={mes.time}
                                placement={
                                  mes.authorId === user.id ? "left" : "right"
                                }
                                mouseEnterDelay={0.5}
                              >
                                <p
                                  className={`px-4 py-2 rounded-[30px] max-w-96 break-words ${
                                    mes.authorId === user.id
                                      ? "bg-sky-800 text-white"
                                      : "bg-slate-200 text-black"
                                  }`}
                                >
                                  {mes.message}
                                </p>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollableFeed>

        <button
          onClick={() => {
            scrollableRef.current.scrollToBottom();
          }}
          className={`${
            isAtBottom ? "invisible" : "visible"
          } toBottomButton absolute bottom-[15%] left-1/2 z-10 flex items-center justify-center w-fit bg-white rounded-full shadow-xl p-2 transition-all duration-200`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
          </svg>
        </button>

        <div className="w-full flex items-center justify-center gap-1 px-4">
          <input
            id="message-input"
            type="text"
            autoComplete="off"
            value={currentMessage}
            maxLength={1500}
            placeholder="Enter message..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => handleEnterPressed(e)}
            className="w-full border border-gray-400 rounded-xl px-4 py-2"
          />
          <button
            disabled={currentMessage.trim().length === 0}
            id="send-message-btn"
            onClick={sendMessage}
            className={`flex items-center justify-center ${
              currentMessage.trim().length === 0
                ? "text-gray-400"
                : "bg-sky-600 text-white hover:bg-sky-800"
            } rounded-xl px-4 py-3 duration-100 disabled:cursor-not-allowed`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path>
            </svg>
          </button>
        </div>
        <Modal
          title={
            <p className="text-lg font-bold text-red-500">Delete this chat?</p>
          }
          open={isConfirmDeleteOn}
          onCancel={(e) => {
            e.stopPropagation();
            setIsConfirmDeleteOn(false);
          }}
          footer={null}
          centered
          className="font-montserrat"
        >
          <Checkbox
            checked={checkedConfirmDelete}
            onChange={() => setCheckedConfirmDelete(!checkedConfirmDelete)}
          />
          <p className="inline ml-2">
            By deleting, you and&nbsp;
            <span className="font-bold">
              {currentChatRoom.participant.username}
            </span>
            &nbsp;will be disconnected from discussing about this product.
          </p>
          <p className="text-xs italic text-gray-600 mt-2">
            Chat history will be deleted permanently.
          </p>
          <div className="w-full flex items-center justify-end gap-8 mt-8">
            <button
              onClick={() => setIsConfirmDeleteOn(false)}
              className="py-2 hover:underline"
            >
              Cancel
            </button>
            <button
              disabled={!checkedConfirmDelete}
              onClick={handleDeleteChatRoom}
              className="px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 text-white font-semibold"
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    );
}
