import React, { useEffect, useState } from "react";
import CurrencySplitter from "../../assistants/currencySpliter";
import { Checkbox, message, Tooltip } from "antd";

export default function CartItem({
  item,
  allChecked,
  getCheckedItem,
  getListIsChanged,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCheck = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
      getCheckedItem({
        item: item,
        checked: true,
      });
    } else {
      setIsChecked(false);
      getCheckedItem({
        item: item,
        checked: false,
      });
    }
  };

  const handleRemove = () => {
    const cart = JSON.parse(sessionStorage.cartList);
    const updated = cart.filter((i) => i.id !== item.id);
    sessionStorage.setItem("cartList", JSON.stringify(updated));
    getListIsChanged(true);
    message.open({
      key: "remove",
      type: "info",
      content: "Item has been removed from cart.",
      duration: 5,
    });
  };
  
  useEffect(() => {
    if (allChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [allChecked]);

  return (
    <div className="w-full min-h-[18vh] max-h-[18vh] flex items-center justify-between p-3 border-b border-gray-600 last:border-none overflow-hidden">
      {contextHolder}
      <div className="max-w-[100%] max-h-[100%] flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          onChange={handleCheck}
          className="px-4"
        ></Checkbox>
        <img
          src={item.image}
          alt=""
          width="15%"
          height="15%"
          className="object-cover"
        />
        <div className="w-1/3 flex flex-col items-start justify-center gap-8">
          <div>
            <Tooltip title={item.name}>
              <p className="max-w-[500px] font-bold text-xl text-ellipsis text-nowrap overflow-hidden">
                {item.name}
              </p>
            </Tooltip>
            <p className="font-light text-sm">brand</p>
          </div>
          <div className="flex items-center gap-8">
            <button className="min-w-fit text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM12.1779 7.17624C11.4834 7.48982 11 8.18846 11 9C11 10.1046 11.8954 11 13 11C13.8115 11 14.5102 10.5166 14.8238 9.82212C14.9383 10.1945 15 10.59 15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C11.41 7 11.8055 7.06167 12.1779 7.17624Z"></path>
              </svg>
              View statistics
            </button>

            <button
              onClick={handleRemove}
              className="min-w-fit text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="min-w-fit text-2xl font-semibold">
        {Math.round(item.price * 100) / 100} $
      </div>
    </div>
  );
}
