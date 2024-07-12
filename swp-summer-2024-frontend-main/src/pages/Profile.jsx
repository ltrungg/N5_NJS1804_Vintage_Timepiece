import React, { useEffect, useState } from "react";
import UserProfile from "../components/profile/UserProfile";
import axios from "axios";
import TimepiecesManagement from "../components/profile/TimepiecesManagement";
import { message } from "antd";
import Loading from "../components/loading/Loading";

export default function Profile() {
  const user =
    sessionStorage.signInUser && JSON.parse(sessionStorage.signInUser);
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductListOfUser = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:3000/product/user/${user.id}`)
      .then((res) => {
        setUserProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sessionStorage.profile_updated) {
      message.success({
        key: "profileUpdated",
        content: "Successfully updated your profile.",
        duration: 5,
      });
      sessionStorage.removeItem("profile_updated");
    } else if (sessionStorage.updatePhoneNumber) {
      document.getElementById("edit-profile").click();
    }

    fetchProductListOfUser();
  }, []);

  const getRequestStatus = (value) => {
    if (value === "updated") {
      fetchProductListOfUser();
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="w-full min-h-[80vh] flex items-start justify-center gap-8 p-16 bg-slate-100">
      <div className="w-1/3 flex flex-col items-start justify-center gap-8 overflow-auto">
        <UserProfile />
      </div>
      <div className="w-full flex items-start justify-center gap-4 overflow-hidden">
        <TimepiecesManagement
          list={userProducts}
          getRequestStatus={getRequestStatus}
        />
      </div>
    </div>
  );
}
