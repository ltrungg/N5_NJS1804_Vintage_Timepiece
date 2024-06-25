import React from "react";

export default function ProfileCharts({ list }) {
  const onGoingList = list.filter(
    (item) => item.status === "PENDING" || item.status === "IN DELIVERY"
  ).length;

  const completedList = list.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  const cancelledList = list.filter(
    (item) => item.status === "CANCELLED" || item.status === "REFUNDED"
  ).length;

  return (
    <div className="w-full max-w-full flex flex-nowrap items-center justify-center gap-4">
      <div className="grow flex flex-col gap-2 text-white bg-blue-800 hover:bg-blue-900 px-10 py-6 rounded-[30px]">
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          All orders
        </p>
        <p className="text-[2em] font-bold">{list.length}</p>
      </div>
      <div className="grow flex flex-col gap-2 text-white bg-amber-800 hover:bg-amber-900 px-10 py-6 rounded-[30px]">
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          On going orders
        </p>
        <p className="text-[2em] font-bold">{onGoingList}</p>
      </div>
      <div className="grow flex flex-col gap-2 text-white bg-green-800 hover:bg-green-900 px-10 py-6 rounded-[30px]">
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          Completed orders
        </p>
        <p className="text-[2em] font-bold">{completedList}</p>
      </div>
      <div className="grow flex flex-col gap-2 text-white bg-pink-800 hover:bg-pink-900 px-10 py-6 rounded-[30px]">
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          Cancelled orders
        </p>
        <p className="text-[2em] font-bold">{cancelledList}</p>
      </div>
    </div>
  );
}
