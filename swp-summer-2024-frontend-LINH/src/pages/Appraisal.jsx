import React, { useEffect, useState } from "react";
import AppraisersProfile from "../components/profile/AppraisersProfile";
import axios from "axios";
import Appraisers from "../components/profile/AppraisersManagement";
import { message } from "antd";
import AppraisalHistory from "../components/profile/AppraisalHistory";

export default function Appraisal() {
  const user =
    sessionStorage.signInUser && JSON.parse(sessionStorage.signInUser);
  const [orders, setOrders] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  // const fetchUserOrder = async () => {
  //   await axios
  //     .get(`http://localhost:3000/product`)
  //     .then((res) => {
  //       setOrders(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const fetchProductListOfUser = async () => {
    await axios
      .get(`http://localhost:3000/product`)
      .then((res) => {
        setUserProducts(res.data);
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
    }
    // fetchUserOrder();
    fetchProductListOfUser();
  }, []);

  const getRequestStatus = (value) => {
    if (value === "updated") {
      fetchProductListOfUser();
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-start justify-center gap-8 p-16 bg-slate-100">
      <div className="w-1/3 flex flex-col items-start justify-center gap-8 overflow-auto">
        <AppraisersProfile />
       
      </div>
      <div className="w-full flex items-start justify-center gap-4 overflow-hidden">
        {window.location.pathname === "/profile" ? (
          <AppraisalHistory list={orders} />
        ) : (
          <Appraisers
            list={userProducts}
            getRequestStatus={getRequestStatus}
          />
        )}
      </div>
    </div>
  );
}
