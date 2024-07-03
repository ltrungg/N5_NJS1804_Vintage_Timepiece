import React, { useEffect, useState } from "react";
import EmptyOrderImage from "../../assets/images/profile/empty-order.webp";
import SingleTimepiece from "./SingleTimepiece";
import { Pagination, Tooltip } from "antd";

export default function TimepiecesManagement({ list, getRequestStatus }) {
  const [listState, setListState] = useState("all");
  const [currentList, setCurrentList] = useState(list);
  const [temp, setTemp] = useState(list);

  const defaultPageSize = 8;
  const [pagingState, setPagingState] = useState({
    min: 0,
    max: defaultPageSize,
  });

  const handlePageChange = (page) => {
    setPagingState({
      min: (page - 1) * defaultPageSize,
      max: page * defaultPageSize,
    });
  };

  const searchProductByNameAndBrand = (key) => {
    getFilteredList();

    if (key) {
      if (currentList.length > 0) {
        console.log("Current list: ", currentList);
        setCurrentList(
          currentList.filter(
            (item) =>
              item.name.toLowerCase().includes(key.toLowerCase()) ||
              item.brand.toLowerCase().includes(key.toLowerCase())
          )
        );
      } else
        setCurrentList(
          temp.filter(
            (item) =>
              item.name.toLowerCase().includes(key.toLowerCase()) ||
              item.brand.toLowerCase().includes(key.toLowerCase())
          )
        );
    }
  };

  const getFilteredList = () => {
    if (listState === "all") {
      setCurrentList(list);
      setTemp(list);
    } else if (listState === "in appraisal") {
      setCurrentList(
        list.filter((item) => item.status.toUpperCase() === "IN APPRAISAL")
      );
      setTemp(
        list.filter((item) => item.status.toUpperCase() === "IN APPRAISAL")
      );
    } else if (listState === "available") {
      setCurrentList(
        list.filter((item) => item.status.toUpperCase() === "AVAILABLE")
      );
      setTemp(list.filter((item) => item.status.toUpperCase() === "AVAILABLE"));
    } else if (listState === "update_requested") {
      setCurrentList(
        list.filter((item) => item.status.toUpperCase() === "UPDATE_REQUESTED")
      );
      setTemp(
        list.filter((item) => item.status.toUpperCase() === "UPDATE_REQUESTED")
      );
    } else if (listState === "sold") {
      setCurrentList(
        list.filter((item) => item.status.toUpperCase() === "SOLD")
      );
      setTemp(list.filter((item) => item.status.toUpperCase() === "SOLD"));
    }
    setPagingState({
      min: 0,
      max: defaultPageSize,
    });
  };

  useEffect(() => {
    getFilteredList();
  }, [listState, list]);

  return (
    <div className="relative w-full min-h-full bg-white rounded-xl">
      <Tooltip title="Sell a new timepiece">
        <button
          onClick={() => {
            window.location.href = "/sell";
          }}
          className="absolute top-9 right-8 flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white rounded-xl px-2 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path>
          </svg>
        </button>
      </Tooltip>
      {list.length === 0 ? (
        <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4">
          <img src={EmptyOrderImage} alt="" className="w-24" />
          <p>There is yet any products!</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-start justify-start gap-2 p-4">
          <div className="w-full flex items-center justify-center gap-4">
            <button
              onClick={() => setListState("all")}
              className={`px-4 py-2 rounded-full duration-100 ${
                listState === "all"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-slate-200 text-black"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setListState("in appraisal")}
              className={`min-w-fit px-4 py-2 rounded-full duration-100 ${
                listState === "in appraisal"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-slate-200 text-black"
              }`}
            >
              In appraisal
            </button>
            <button
              onClick={() => setListState("available")}
              className={`px-4 py-2 rounded-full duration-100 ${
                listState === "available"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-slate-200 text-black"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setListState("update_requested")}
              className={`px-4 py-2 rounded-full duration-100 ${
                listState === "update_requested"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-slate-200 text-black"
              }`}
            >
              Waiting to be updated
            </button>
            <button
              onClick={() => setListState("sold")}
              className={`px-4 py-2 rounded-full duration-100 ${
                listState === "sold"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-slate-200 text-black"
              }`}
            >
              Sold
            </button>
          </div>

          <div className="w-1/2 px-16 py-2 flex items-center gap-2 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg>

            <input
              id="search-box"
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                searchProductByNameAndBrand(
                  e.target.value.toLowerCase().trim()
                );
              }}
              className="pl-2 pr-32 py-2 border border-gray-400 rounded-xl"
            />
          </div>

          {currentList.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-4 my-16">
              <img src={EmptyOrderImage} alt="" className="w-24" />
              <p>No product!</p>
            </div>
          ) : (
            <div className="w-full min-h-[40vh] flex flex-col items-center justify-start">
              {currentList
                .slice(pagingState.min, pagingState.max)
                .map((item) => {
                  return (
                    <SingleTimepiece
                      key={item.id}
                      product={item}
                      getRequestStatus={(value) => getRequestStatus(value)}
                    />
                  );
                })}
              <Pagination
                total={currentList.length}
                pageSize={defaultPageSize}
                hideOnSinglePage
                size="default"
                onChange={handlePageChange}
                className="mt-8"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
