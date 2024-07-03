import React from "react";

export default function ProfileCharts({ orderList, productList }) {
  const inAppraisalList = productList.filter(
    (item) => item.status === "IN APPRAISAL"
  ).length;

  const availableList = productList.filter(
    (item) => item.status === "AVAILABLE"
  ).length;

  const soldList = productList.filter((item) => item.status === "SOLD").length;

  const updateRequestedList = productList.filter(
    (item) => item.status === "UPDATE_REQUESTED"
  ).length;

  return (
    <div className="w-full max-w-full flex flex-col items-center justify-center gap-2">
      <div
        onClick={() => (window.location.href = "/profile")}
        className="w-full grow flex flex-col gap-2 text-white bg-amber-800 hover:bg-amber-900 px-10 py-6 rounded-[30px] cursor-pointer"
      >
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          Total Orders
        </p>
        <p className="text-[2em] font-bold">{orderList.length}</p>
      </div>
      <div
        onClick={() => (window.location.href = "/profile/manage-product")}
        className="w-full grow flex flex-col gap-2 text-white bg-blue-800 hover:bg-blue-900 px-10 py-6 rounded-[30px] cursor-pointer"
      >
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          Total Timepieces
        </p>
        <p className="text-[2em] font-bold">{productList.length}</p>
      </div>

      {/* <div className="w-full grow flex flex-col gap-2 text-white bg-green-700 hover:bg-green-800 px-10 py-6 rounded-[30px]">
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          Available
        </p>
        <p className="text-[2em] font-bold">{availableList}</p>
      </div>
      <div className="w-full grow flex flex-col gap-2 text-white bg-gray-800 hover:bg-gray-900 px-10 py-6 rounded-[30px]">
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          Sold
        </p>
        <p className="text-[2em] font-bold">{soldList}</p>
      </div>
      <div className="w-full grow flex flex-col gap-2 text-white bg-slate-500 hover:bg-slate-600 px-10 py-6 rounded-[30px]">
        <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
          Waiting to be updated
        </p>
        <p className="text-[2em] font-bold">{updateRequestedList}</p>
      </div> */}
    </div>
  );
}
