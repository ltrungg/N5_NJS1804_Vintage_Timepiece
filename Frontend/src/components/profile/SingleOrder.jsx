import React, { useEffect, useState } from "react";
import dateFormat from "../../assistants/date.format";
import axios from "axios";
import { Avatar, message } from "antd";

export default function SingleOrder({ order }) {
  const [orderItemList, setOrderItemList] = useState([]);
  const [showProductList, setShowProductList] = useState(false);

  const date = dateFormat(order.createdAt, "dd");
  const month = dateFormat(order.createdAt, "mmm");

  const fetchOrderItemList = async () => {
    await axios
      .get(`http://localhost:3000/orderItem/order/${order.id}`)
      .then((res) => {
        setOrderItemList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrderItemList();
  }, []);

  const getStatus = () => {
    if (order.status === "PENDING") {
      return (
        <button className="w-40 bg-amber-600 hover:bg-amber-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          PENDING
        </button>
      );
    } else if (order.status === "IN DELIVERY") {
      return (
        <button className="w-40 bg-sky-600 hover:bg-sky-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          IN DELIVERY
        </button>
      );
    } else if (order.status === "COMPLETED") {
      return (
        <button className="w-40 bg-green-600 hover:bg-green-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          COMPLETED
        </button>
      );
    } else if (order.status === "CANCELLED") {
      return (
        <button className="w-40 bg-pink-600 hover:bg-pink-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          CANCELLED{" "}
        </button>
      );
    } else if (order.status === "REFUNDED") {
      return (
        <button className="w-40 bg-neutral-600 hover:bg-neutral-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          REFUNDED
        </button>
      );
    }
  };

  return (
    <>
      <div
        onClick={() => setShowProductList(!showProductList)}
        className="w-full flex items-center justify-between border-b border-gray-200 p-4 cursor-pointer hover:bg-slate-100 rounded-lg rounded-b-none"
      >
        <div className="min-w-fit flex items-center justify-start gap-10">
          <div className="flex flex-col items-center justify-start">
            <p className="font-black text-[2em]">{date}</p>
            <p className="text-xs">{month}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold"># {order.code}</p>
            <p className="text-sm font-light">
              {orderItemList.length} item
              <span
                className={`${orderItemList.length > 1 ? "inline" : "hidden"}`}
              >
                s
              </span>{" "}
              ordered
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-16">
          {getStatus()}
          <div className="flex items-center gap-8">
            <p
              className={`md:text-[1.5em] min-w-fit flex items-center gap-2 ${
                order.paidStatus && "text-green-600"
              }`}
            >
              <span className={`${order.paidStatus ? "visible" : "invisible"}`}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                </svg>
              </span>{" "}
              $ {order.total}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              {showProductList ? (
                <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
              ) : (
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
              )}
            </svg>
          </div>
        </div>
      </div>

      {orderItemList.map((item) => {
        return (
          <div
            key={item.id}
            className={`${
              showProductList ? "flex" : "hidden"
            } w-full item-center justify-between border-b border-gray-400 overflow-hidden md:w-[90%] md:ml-auto px-4 py-4`}
            style={{
              transition: "0.3s ease-out",
            }}
          >
            <div className="w-2/3 flex items-center justify-start gap-4">
              <Avatar src={item.product.image} alt="" size={64} />
              <div className="flex flex-col gap-2">
                <p className="max-w-64 overflow-hidden">{item.product.name}</p>
                <p className="text-xs opacity-60">{item.product.brand}</p>
              </div>
            </div>

            <div className="w-1/3 flex items-center justify-center">
              <button
                onClick={() =>
                  message.warning({
                    key: "detailed",
                    content: "Viewing details is in developing process...",
                    duration: 5,
                  })
                }
                className="min-w-fit h-fit my-auto px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-500 hover:text-white duration-200"
              >
                View details
              </button>
            </div>

            <p className="text-end w-1/3 my-auto">$ {item.price}</p>
          </div>
        );
      })}
    </>
  );
}
