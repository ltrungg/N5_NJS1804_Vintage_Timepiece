import React, { useState } from "react";
import { Checkbox } from "antd";

export default function FilterSidebar({
  brandList,
  getSearchKey,
  getSortOrder,
  getSelectedBrandList,
}) {
  const [currentBrandList, setCurrentBrandList] = useState(
    brandList.slice(0, 8)
  );
  const [key, setKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedBrandList, setSelectedBrandList] = useState([]);

  const handleSearch = (e) => {
    setSelectedBrandList([]);
    setKey(e.target.value);
    getSearchKey(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    getSortOrder(order);
  };

  const handleSelectBrand = (brand) => {
    let temp = [...selectedBrandList];
    if (selectedBrandList.some((i) => i === brand)) {
      temp = temp.filter((i) => i !== brand);
      setSelectedBrandList(selectedBrandList.filter((i) => i !== brand));
    } else {
      temp.push(brand);
      setSelectedBrandList((current) => [...current, brand]);
    }
    getSelectedBrandList(temp);
  };

  return (
    <div className="w-1/4 min-w-fit flex flex-col items-start gap-8 p-4 bg-white border-r border-black">
      <div className="flex flex-col items-start gap-4">
        <p className="font-bold">Search</p>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
          </svg>
          <input
            placeholder="Search..."
            value={key}
            onChange={handleSearch}
            className="text-xs rounded-lg border px-4 py-2"
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        <p className="font-bold">Sort By</p>
        <div className="flex flex-col text-xs items-start gap-4">
          <button
            onClick={() => handleSort("price_asc")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 duration-200 ${
              sortOrder === "price_asc"
                ? "bg-gray-800 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M9.00054 3L9 11H7V5.41L5 5.9485V3.61978L7.31304 3H9.00054ZM19 3V16H22L18 21L14 16H17V3H19ZM11 15.5C11 16.0645 10.8441 16.5926 10.5729 17.0436L8.28871 21H5.97931L7.45156 18.45C6.05661 18.1923 5 16.9695 5 15.5C5 13.8431 6.34315 12.5 8 12.5C9.65685 12.5 11 13.8431 11 15.5ZM8 16.5C8.55228 16.5 9 16.0523 9 15.5C9 14.9477 8.55228 14.5 8 14.5C7.44772 14.5 7 14.9477 7 15.5C7 16.0523 7.44772 16.5 8 16.5Z"></path>
            </svg>
            Price (Low to High)
          </button>
          <button
            onClick={() => handleSort("price_des")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 duration-200 ${
              sortOrder === "price_des"
                ? "bg-gray-800 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M9 11L9.00054 3H7.31304L5 3.61978V5.9485L7 5.41V11H9ZM22 8L18 3L14 8H17V21H19V8H22ZM8 16.5C7.44772 16.5 7 16.0523 7 15.5C7 14.9477 7.44772 14.5 8 14.5C8.55228 14.5 9 14.9477 9 15.5C9 16.0523 8.55228 16.5 8 16.5ZM10.5729 17.0436C10.8441 16.5926 11 16.0645 11 15.5C11 13.8431 9.65685 12.5 8 12.5C6.34315 12.5 5 13.8431 5 15.5C5 16.9695 6.05661 18.1923 7.45156 18.45L5.97931 21H8.28871L10.5729 17.0436Z"></path>
            </svg>
            Price (High to Low)
          </button>
          <button
            onClick={() => handleSort("date_des")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 duration-200 ${
              sortOrder === "date_des"
                ? "bg-gray-800 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M20 4V16H23L19 21L15 16H18V4H20ZM12 18V20H3V18H12ZM14 11V13H3V11H14ZM14 4V6H3V4H14Z"></path>
            </svg>
            Latest to Oldest
          </button>
          <button
            onClick={() => handleSort("date_asc")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 duration-200 ${
              sortOrder === "date_asc"
                ? "bg-gray-800 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M19 3L23 8H20V20H18V8H15L19 3ZM14 18V20H3V18H14ZM14 11V13H3V11H14ZM12 4V6H3V4H12Z"></path>
            </svg>
            Oldest to Latest
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        <p className="font-bold">Brands</p>
        <div className="flex flex-col text-xs items-start gap-2">
          {currentBrandList.map((brand) => {
            return (
              <div key={brand}>
                <button className="flex items-center gap-2 px-4 py-1 rounded-full">
                  <Checkbox
                    checked={selectedBrandList.some((i) => i === brand)}
                    onChange={() => handleSelectBrand(brand)}
                  />
                  {brand}
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (currentBrandList.length === brandList.length)
              setCurrentBrandList(brandList.slice(0, 8));
            else setCurrentBrandList(brandList);
          }}
          className="text-[0.7em] text-gray-500 px-4 hover:underline"
        >
          {currentBrandList.length === brandList.length ? (
            <>Show less</>
          ) : (
            <>View all {brandList.length} brands</>
          )}
        </button>
      </div>
    </div>
  );
}
