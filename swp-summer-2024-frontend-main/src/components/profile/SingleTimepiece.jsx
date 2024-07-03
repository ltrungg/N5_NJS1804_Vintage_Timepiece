import React, { useState } from "react";
import dateFormat from "../../assistants/date.format";
import { Avatar, Dropdown, message } from "antd";
import ProductForm from "./ProductForm";
import PriceUpdateModal from "./PriceUpdateModal";
import StatusUpdateModal from "./StatusUpdateModal";

export default function SingleTimepiece({ product, getRequestStatus }) {
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const date = dateFormat(product.createdAt, "dd");
  const month = dateFormat(product.createdAt, "mmm");

  const getStatus = () => {
    if (product.status === "IN APPRAISAL") {
      return (
        <button className="w-40 bg-amber-600 hover:bg-amber-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          IN APPRAISAL
        </button>
      );
    } else if (product.status === "AVAILABLE") {
      return (
        <button className="w-40 bg-green-600 hover:bg-green-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          AVAILABLE
        </button>
      );
    } else if (product.status === "UPDATE_REQUESTED") {
      return (
        <button className="w-40 bg-cyan-600 hover:bg-cyan-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          UPDATING...
        </button>
      );
    } else if (product.status === "SOLD") {
      return (
        <button className="w-40 bg-stone-600 hover:bg-stone-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          SOLD
        </button>
      );
    }
  };

  const menuOptions = [
    {
      key: "0",
      label: (
        <div className="w-full flex items-center gap-2 font-montserrat font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM12.1779 7.17624C11.4834 7.48982 11 8.18846 11 9C11 10.1046 11.8954 11 13 11C13.8115 11 14.5102 10.5166 14.8238 9.82212C14.9383 10.1945 15 10.59 15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C11.41 7 11.8055 7.06167 12.1779 7.17624Z"></path>
          </svg>
          View details
        </div>
      ),
      onClick: () => {
        setIsShowingDetails(true);
      },
    },
    {
      key: "1",
      label: (
        <div className="w-full flex items-center gap-2 font-montserrat font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path d="M5.67591 4.25667C9.60392 1.03828 15.4094 1.26236 19.076 4.92893C22.9812 8.83418 22.9812 15.1658 19.076 19.0711C15.1707 22.9763 8.83906 22.9763 4.93382 19.0711C2.40932 16.5466 1.51676 13.0081 2.25611 9.76666L2.33275 9.45394L4.26718 9.96315C3.56967 12.623 4.26329 15.5721 6.34803 17.6569C9.47222 20.781 14.5375 20.781 17.6617 17.6569C20.7859 14.5327 20.7859 9.46734 17.6617 6.34315C14.8441 3.5255 10.4475 3.24903 7.32006 5.51375L7.09886 5.67983L8.1158 6.6967L3.5196 7.75736L4.58026 3.16117L5.67591 4.25667ZM13.0049 6V8H15.5049V10H10.0049C9.72874 10 9.50488 10.2239 9.50488 10.5C9.50488 10.7455 9.68176 10.9496 9.91501 10.9919L10.0049 11H14.0049C15.3856 11 16.5049 12.1193 16.5049 13.5C16.5049 14.8807 15.3856 16 14.0049 16H13.0049V18H11.0049V16H8.50488V14H14.0049C14.281 14 14.5049 13.7761 14.5049 13.5C14.5049 13.2545 14.328 13.0504 14.0948 13.0081L14.0049 13H10.0049C8.62417 13 7.50488 11.8807 7.50488 10.5C7.50488 9.11929 8.62417 8 10.0049 8H11.0049V6H13.0049Z"></path>
          </svg>
          Update price
        </div>
      ),
      onClick: () => {
        if (product.status === "AVAILABLE") setIsUpdatingPrice(true);
        else {
          message.warning({
            key: "updatePrice",
            content: "This watch is being evaluated. Please try again later!",
            duration: 5,
          });
        }
      },
      disabled: product.status !== "AVAILABLE",
    },
    {
      key: "2",
      label: (
        <div className="w-full flex items-center gap-2 font-montserrat font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path d="M5.67591 4.25667C9.60392 1.03828 15.4094 1.26236 19.076 4.92893C22.9812 8.83418 22.9812 15.1658 19.076 19.0711C15.1707 22.9763 8.83906 22.9763 4.93382 19.0711C2.40932 16.5466 1.51676 13.0081 2.25611 9.76666L2.33275 9.45394L4.26718 9.96315C3.56967 12.623 4.26329 15.5721 6.34803 17.6569C9.47222 20.781 14.5375 20.781 17.6617 17.6569C20.7859 14.5327 20.7859 9.46734 17.6617 6.34315C14.8441 3.5255 10.4475 3.24903 7.32006 5.51375L7.09886 5.67983L8.1158 6.6967L3.5196 7.75736L4.58026 3.16117L5.67591 4.25667ZM13.0049 6V8H15.5049V10H10.0049C9.72874 10 9.50488 10.2239 9.50488 10.5C9.50488 10.7455 9.68176 10.9496 9.91501 10.9919L10.0049 11H14.0049C15.3856 11 16.5049 12.1193 16.5049 13.5C16.5049 14.8807 15.3856 16 14.0049 16H13.0049V18H11.0049V16H8.50488V14H14.0049C14.281 14 14.5049 13.7761 14.5049 13.5C14.5049 13.2545 14.328 13.0504 14.0948 13.0081L14.0049 13H10.0049C8.62417 13 7.50488 11.8807 7.50488 10.5C7.50488 9.11929 8.62417 8 10.0049 8H11.0049V6H13.0049Z"></path>
          </svg>
          Update sale status
        </div>
      ),
      onClick: () => {
        if (product.status === "AVAILABLE") setIsUpdatingStatus(true);
        else {
          message.warning({
            key: "updateStatus",
            content: "This watch is being evaluated. Please try again later!",
            duration: 5,
          });
        }
      },
      disabled: product.status !== "AVAILABLE",
    },
    {
      key: "3",
      label: (
        <div className="w-full flex items-center gap-2 font-montserrat font-semibold text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
          </svg>
          Remove
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="w-full flex items-center justify-between border-b border-gray-200 p-4 hover:bg-slate-100 rounded-lg rounded-b-none">
        <div className="min-w-fit w-full flex items-center justify-start gap-8">
          <div className="w-16 flex flex-col items-center justify-start">
            <p className="font-black text-[2em]">{date}</p>
            <p className="text-xs">{month}</p>
          </div>

          <div className="flex items-center gap-2">
            <Avatar
              onClick={() => setIsShowingDetails(true)}
              src={product.image}
              alt=""
              size={64}
              className="cursor-pointer"
            />
            <span className="flex flex-col items-start">
              <p
                onClick={() => setIsShowingDetails(true)}
                className="text-lg font-bold min-w-[28rem] max-w-[28rem] text-nowrap text-ellipsis overflow-hidden cursor-pointer hover:underline"
              >
                {product.name}
              </p>
              <div className="w-full flex items-center justify-start gap-4 pr-2">
                <p className="text-xs font-light">{product.brand}</p>
                <p
                  className={`font-light text-gray-600 ${
                    product.status === "IN APPRAISAL" && "invisible"
                  }`}
                >
                  &#8226;
                </p>
                <p
                  className={`text-red-600 text-md font-semibold ${
                    product.status === "IN APPRAISAL" && "invisible"
                  }`}
                >
                  ${Math.round(product.price * 100) / 100}
                </p>
              </div>
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-2 lg:gap-8">
          <div className="w-full flex justify-end">{getStatus()}</div>

          <div
            className={`${
              product.status === "SOLD" && "invisible"
            } flex items-center gap-8 px-8`}
          >
            <Dropdown
              menu={{ items: menuOptions }}
              trigger={["click"]}
              placement="bottomLeft"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                className="cursor-pointer"
              >
                <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
              </svg>
            </Dropdown>
            <ProductForm
              open={isShowingDetails}
              setOpen={setIsShowingDetails}
              product={product}
              editable={false}
              getProductData={() => {}}
            />
            <PriceUpdateModal
              product={product}
              open={isUpdatingPrice}
              setOpen={setIsUpdatingPrice}
              getRequestStatus={(value) => getRequestStatus(value)}
            />
            <StatusUpdateModal
              product={product}
              open={isUpdatingStatus}
              setOpen={setIsUpdatingStatus}
              getRequestStatus={(value) => getRequestStatus(value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
