import React, { useEffect, useState } from "react";
import UserProfile from "../components/profile/UserProfile";
import ProfileCharts from "../components/profile/ProfileCharts";
import OrderHistory from "../components/profile/OrderHistory";
import axios from "axios";

export default function Profile() {
  const user =
    sessionStorage.signInUser && JSON.parse(sessionStorage.signInUser);
  const [orders, setOrders] = useState([]);

  const fetchUserOrder = async () => {
    await axios
      .get(`http://localhost:3000/order/user/${user.id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserOrder();
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex items-start justify-center gap-8 p-16 bg-slate-100">
      <div className="w-1/3">
        <UserProfile />
      </div>
      <div className="w-2/3 flex flex-col items-center justify-start gap-8 overflow-auto">
        <ProfileCharts list={orders} />
        <OrderHistory list={orders} />
      </div>
    </div>
  );
}
