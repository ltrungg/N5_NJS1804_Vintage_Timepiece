import React, { useEffect, useState } from "react";
import EmptyOrderImage from "../../assets/images/profile/empty-order.webp";
import SingleOrder from "./SingleOrder";

export default function OrderHistory({ list }) {
  const [listState, setListState] = useState("all");
  const [currentList, setCurrentList] = useState(list);

  const getFilteredList = () => {
    if (listState === "all") {
      setCurrentList(list);
    } else if (listState === "on going") {
      setCurrentList(
        list.filter(
          (item) =>
            item.status.toUpperCase() === "PENDING" ||
            item.status.toUpperCase() === "IN DELIVERY"
        )
      );
    } else if (listState === "completed") {
      setCurrentList(
        list.filter((item) => item.status.toUpperCase() === "COMPLETED")
      );
    } else if (listState === "cancelled") {
      setCurrentList(
        list.filter(
          (item) =>
            item.status.toUpperCase() === "CANCELLED" ||
            item.status.toUpperCase() === "REFUNDED"
        )
      );
    }
  };

  useEffect(() => {
    getFilteredList();
  }, [listState, list]);

  return (
    <div className="w-full min-h-full bg-white rounded-xl">
      {list.length === 0 ? (
        <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4">
          <img src={EmptyOrderImage} alt="" className="w-24" />
          <p>There is yet any orders!</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-start justify-start gap-2 p-4">
          <div className="w-full flex items-center justify-center gap-4">
            <button
              onClick={() => setListState("all")}
              className={`px-4 py-2 hover:bg-slate-200 hover:text-black rounded-full duration-100 ${
                listState === "all" && "bg-gray-700 text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setListState("on going")}
              className={`px-4 py-2 hover:bg-slate-200 hover:text-black rounded-full duration-100 ${
                listState === "on going" && "bg-gray-700 text-white"
              }`}
            >
              On going
            </button>
            <button
              onClick={() => setListState("completed")}
              className={`px-4 py-2 hover:bg-slate-200 hover:text-black rounded-full duration-100 ${
                listState === "completed" && "bg-gray-700 text-white"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setListState("cancelled")}
              className={`px-4 py-2 hover:bg-slate-200 hover:text-black rounded-full duration-100 ${
                listState === "cancelled" && "bg-gray-700 text-white"
              }`}
            >
              Cancelled
            </button>
          </div>

          {currentList.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-4 my-16">
              <img src={EmptyOrderImage} alt="" className="w-24" />
              <p>There is yet any orders!</p>
            </div>
          ) : (
            currentList.map((item) => {
              return <SingleOrder key={item.id} order={item} />;
            })
          )}
        </div>
      )}
    </div>
  );
}
