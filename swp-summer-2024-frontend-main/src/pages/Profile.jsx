import React, { useEffect, useState } from "react";
import UserProfile from "../components/profile/UserProfile";
import ProfileCharts from "../components/profile/ProfileCharts";
import OrderHistory from "../components/profile/OrderHistory";
import axios from "axios";
import TimepiecesManagement from "../components/profile/TimepiecesManagement";

export default function Profile() {
  const user =
    sessionStorage.signInUser && JSON.parse(sessionStorage.signInUser);
  const [orders, setOrders] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  const fetchUserOrder = async () => {
    await axios
      .get(`http://localhost:3000/order/user/${user.id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchProductListOfUser = async () => {
    await axios
      .get(`http://localhost:3000/product/user/${user.id}`)
      .then((res) => {
        setUserProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserOrder();
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
        <UserProfile />
        <ProfileCharts orderList={orders} productList={userProducts} />
      </div>
      <div className="w-full flex items-start justify-center gap-4 overflow-hidden">
        {window.location.pathname === "/profile" ? (
          <OrderHistory list={orders} />
        ) : (
          <TimepiecesManagement
            list={userProducts}
            getRequestStatus={getRequestStatus}
          />
        )}
      </div>
    </div>
  );
}
