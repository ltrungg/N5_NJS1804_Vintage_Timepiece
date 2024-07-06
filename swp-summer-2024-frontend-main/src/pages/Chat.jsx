import React, { useEffect, useState } from "react";
import ChatRoom from "../components/chat/ChatRoom";
import RoomList from "../components/chat/RoomList";
import axios from "axios";
import UnselectedChatRoom from "../components/chat/UnselectedChatRoom";
import Loading from "../components/loading/Loading";
import { message } from "antd";

export default function Chat() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const [selectedChatRoomId, setSelectedChatRoomId] = useState("");
  const [chatRoomList, setChatRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserChatRoom = async () => {
    setChatRoomList([]);
    await axios
      .get(`http://localhost:3000/chatRoom/user/${user.id}`)
      .then((res) => {
        res.data.map(async (chatRoomToUser) => {
          setIsLoading(true);
          await axios
            .get(
              `http://localhost:3000/chatRoom/butUser/${user.id}/${chatRoomToUser.chatRoom.id}`
            )
            .then((response) => {
              setChatRoomList((current) => [...current, response.data]);
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sessionStorage.notFoundChatRoom) {
      message.error({
        key: "handleRedirect",
        content:
          "This chat room has been aborted by the other participant. Please try with another!",
        duration: 8,
      });
      sessionStorage.removeItem("notFoundChatRoom");
    }
    if (sessionStorage.createChatRoomRedirect) {
      setSelectedChatRoomId(sessionStorage.createChatRoomRedirect);
      sessionStorage.removeItem("createChatRoomRedirect");
    }

    return () => fetchUserChatRoom();
  }, []);

  if (isLoading) return <Loading />;
  else
    return (
      <div className="w-full min-h-[90vh] bg-slate-100 flex items-center justify-center">
        <RoomList
          currentSelectedRoomId={selectedChatRoomId}
          list={chatRoomList}
          getSelectedRoom={(value) => {
            console.log("Room selected: ", value);
            setSelectedChatRoomId(value);
          }}
        />

        {selectedChatRoomId.length > 0 ? (
          <ChatRoom
            user={user}
            chatRoomId={selectedChatRoomId}
            getDeleteStatus={() => {
              fetchUserChatRoom();
              setSelectedChatRoomId("");
            }}
          />
        ) : (
          <UnselectedChatRoom />
        )}
      </div>
    );
}
