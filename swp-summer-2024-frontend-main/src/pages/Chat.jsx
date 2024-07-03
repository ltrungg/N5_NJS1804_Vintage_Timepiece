import React, { useEffect, useState } from "react";
import ChatRoom from "../components/chat/ChatRoom";
import { useParams } from "react-router-dom";
import RoomList from "../components/chat/RoomList";
import axios from "axios";
import UnselectedChatRoom from "../components/chat/UnselectedChatRoom";
import Loading from "../components/loading/Loading";
import { message } from "antd";

export default function Chat() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const chatRoomId = useParams().id;
  const [chatRoomList, setChatRoomList] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserChatRoom = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:3000/chatRoom/user/${user.id}`)
      .then((res) => {
        res.data.map(async (chatRoomToUser) => {
          await axios
            .get(
              `http://localhost:3000/chatRoom/butUser/${user.id}/${chatRoomToUser.chatRoom.id}`
            )
            .then((response) => {
              setChatRoomList((current) => [...current, response.data]);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.deleteChat) {
      message.info({
        key: "handleRedirect",
        content: "A chat room has been deleted.",
        duration: 5,
      });
      sessionStorage.removeItem("deleteChat");
    } else if (sessionStorage.notFoundChatRoom) {
      message.error({
        key: "handleRedirect",
        content:
          "This chat room has been aborted by the other participant. Please try with another!",
        duration: 8,
      });
      sessionStorage.removeItem("notFoundChatRoom");
    }
    if (!isRendered) {
      setIsRendered(true);
      return () => fetchUserChatRoom();
    }
  }, []);

  if (isLoading && chatRoomList.length === 0) return <Loading />;
  else
    return (
      <div className="w-full min-h-[90vh] bg-slate-100 flex items-center justify-center">
        <RoomList list={chatRoomList} />

        {chatRoomId ? (
          <ChatRoom user={user} chatRoomId={chatRoomId} />
        ) : (
          <UnselectedChatRoom />
        )}
      </div>
    );
}
