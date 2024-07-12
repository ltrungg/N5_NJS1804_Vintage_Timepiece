import { Avatar, message, Modal, Tooltip } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { generateChatRoomId } from "../../assistants/generators";
import Loading from "../loading/Loading";
import CurrencySplitter from "../../assistants/currencySpliter";
import ReportModal from "./ReportModal";
import moment from "moment";
import ProductForm from "../profile/ProductForm";

export default function ProductDetailComponent({
  user,
  product,
  isInWishList,
}) {
  const [wishListState, setWishListState] = useState(isInWishList);
  const [isReporting, setIsReporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPhoneNumber, setIsShowingPhoneNumber] = useState(false);
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const copyPhoneNumber = () => {
    const phone = document.getElementById("phone-number");
    phone.select();
    navigator.clipboard.writeText(phone.value);
    message.success({
      key: "copyPhoneNumber",
      content: "Copied phone number to clipboard!",
      duration: 5,
    });
  };

  const addToFavorite = () => {
    const wishList = sessionStorage.wishList
      ? JSON.parse(sessionStorage.wishList)
      : [];
    if (wishList.length === 0) {
      sessionStorage.setItem("wishList", JSON.stringify([product]));
      message.success({
        key: "wishList",
        content: "Added to your wish list.",
        duration: 5,
      });
      setWishListState(true);
    } else {
      if (wishList.some((item) => item.id === product.id)) {
        message.info({
          key: "wishList",
          content: "Already added to your wish list.",
          duration: 5,
        });
      } else {
        wishList.push(product);
        sessionStorage.setItem("wishList", JSON.stringify(wishList));
        message.success({
          key: "wishList",
          content: "Added to your wish list.",
          duration: 5,
        });
        setWishListState(true);
      }
    }
  };

  const handleChat = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:3000/chatRoom/user/${user.id}`)
      .then(async (res) => {
        res.data.map(async (item) => {
          await axios
            .get(
              `http://localhost:3000/chatRoom/butUser/${user.id}/${item.chatRoom.id}`
            )
            .then((res) => {
              if (
                res.data.participant.id === product.owner.id &&
                res.data.chatRoom.product.id === product.id
              ) {
                sessionStorage.setItem(
                  "createChatRoomRedirect",
                  res.data.chatRoom.code
                );
                window.location.href = `/chat`;
                return;
              }
            });
        });
        setTimeout(async () => {
          const newRoomCode = generateChatRoomId();
          sessionStorage.setItem("createChatRoomRedirect", newRoomCode);
          await axios
            .post("http://localhost:3000/chatRoom", {
              code: newRoomCode,
              product: product.id,
              participants: [user.id, product.owner.id],
            })
            .then((res) => {
              setIsLoading(false);
              window.location.href = `/chat`;
            })
            .catch((err) => console.log(err));
        }, 2000);
      });
  };

  return (
    <div className="w-full flex flex-col justify-center font-montserrat gap-4">
      {isLoading && <Loading />}
      <div className="w-full flex items-center justify-between">
        <img src={product.image} alt="" className="w-[400px]" />
        <div className="w-1/2 flex flex-col items-start justify-between text-xl gap-8">
          <div className="w-full flex flex-col justify-start gap-2">
            <div className="w-full flex items-start text-sm gap-4 p-2 border-b">
              <Avatar src={product.owner.avatar} size={40} alt="" />
              <span className="flex flex-col gap-1">
                <p>{product.owner.username}</p>
                <p className="text-[0.7em] text-gray-500">
                  Active {moment(product.owner.lastActive).fromNow()}
                </p>
              </span>
              <div className="self-center ml-auto flex items-center gap-1 ">
                <button
                  onClick={() =>
                    (window.location.href = `/profile/${product.owner.id}`)
                  }
                  className="text-white font-semibold px-6 py-2 bg-gray-700 hover:bg-gray-800 rounded-full duration-200"
                >
                  View profile
                </button>
                <Tooltip title="Show phone number" mouseEnterDelay={0.5}>
                  <button
                    onClick={() => {
                      if (product.owner.phone === "") {
                        message.warning({
                          key: "emptyPhoneNumber",
                          content: "This user yet provided a phone number.",
                          duration: 5,
                        });
                        return;
                      } else setIsShowingPhoneNumber(true);
                    }}
                    className="text-gray-500 p-2 border border-gray-300 rounded-xl hover:bg-sky-700 hover:text-white duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
                    </svg>
                  </button>
                </Tooltip>
                <Modal
                  open={isShowingPhoneNumber}
                  onCancel={(e) => {
                    e.stopPropagation();
                    setIsShowingPhoneNumber(false);
                  }}
                  footer={null}
                  centered
                  closeIcon={null}
                >
                  <div className="w-full flex items-center justify-center gap-4">
                    <button onClick={copyPhoneNumber}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="fill-gray-500 hover:fill-black"
                      >
                        <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
                      </svg>
                    </button>
                    <p className="font-semibold text-2xl font-montserrat">
                      {product.owner.phone}
                    </p>
                    <input
                      id="phone-number"
                      type="text"
                      value={product.owner.phone}
                      hidden
                    />
                  </div>
                </Modal>
              </div>
            </div>
            <p className="font-light">{product.brand}</p>
            <p className="text-[1.5em] font-semibold leading-[1.2em]">
              {product.name}
            </p>
            <p className="text-red-500 font-bold">
              $ {CurrencySplitter(Math.round(product.price * 100) / 100)}
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <button
              disabled={user.id === product.owner.id}
              onClick={handleChat}
              className={`w-full flex items-center justify-center gap-2 rounded-md font-bold
               text-white text-sm bg-sky-600 hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-400
               mx-auto py-3 transition-all duration-200`}
            >
              {user.id === product.owner.id ? (
                <>Owned</>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM20 19V8.99374C20 6.79539 18.2049 5 15.9993 5H8.00066C5.78458 5 4 6.78458 4 8.99374V15.0063C4 17.2046 5.79512 19 8.00066 19H20ZM14 11H16V13H14V11ZM8 11H10V13H8V11Z"></path>
                  </svg>
                  Chat with{" "}
                  <span className="flex items-center gap-2">
                    <Avatar size={16} src={product.owner.avatar} />{" "}
                    {product.owner.username}
                  </span>
                </>
              )}
            </button>
            <div className="flex items-center gap-2">
              {wishListState ? (
                <button
                  onClick={addToFavorite}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-green-500 hover:bg-green-700 font-bold text-sm text-white mx-auto py-3 duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                  </svg>
                  Added to wishlist
                </button>
              ) : (
                <button
                  onClick={addToFavorite}
                  className={`w-full flex items-center justify-center gap-2 rounded-md border border-red-500 font-bold text-sm text-red-500 hover:bg-stone-100 mx-auto py-3 duration-200 ${
                    user.id === product.owner.id && "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
                  </svg>
                  Add to wishlist
                </button>
              )}

              <button
                onClick={async () => {
                  await axios
                    .get(
                      `http://localhost:3000/report/check/${user.id}/${product.id}`
                    )
                    .then((res) => {
                      if (res.data)
                        message.warning({
                          key: "report",
                          content:
                            "Your report on this product has already been recorded.",
                          duration: 5,
                        });
                      else {
                        setIsReporting(true);
                      }
                    })
                    .catch((err) => console.log(err));
                }}
                className={`w-1/6 flex flex-col items-center gap-1 text-amber-600 hover:text-amber-700 ${
                  user.id === product.owner.id && "hidden"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path>
                </svg>
                <p className="text-xs">Report</p>
              </button>
              <ReportModal
                on={"product"}
                object={product}
                open={isReporting}
                setOpen={setIsReporting}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8 gap-8">
        <p className="text-2xl font-bold flex items-center gap-8">
          SPECIFICATIONS{" "}
          <button
            onClick={() => {
              setIsShowingDetails(true);
            }}
            className="text-xs font-light p-2 rounded-lg bg-sky-800 hover:bg-sky-900 text-white"
          >
            View details
          </button>
        </p>
        <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 text-sm">
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Type:</p>
            <p className="font-light">{product.type}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Dial color:</p>
            <p className="font-light">{product.dialColor}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Box:</p>
            <div className="font-light">
              <p>Yes</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Papers:</p>
            <div className="font-light">
              <p>Yes</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Year of manufacture:</p>
            <p className="font-light">{product.yearOfProduction}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Water resistance:</p>
            <p className="font-light">{product.waterResistance} mm</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Case material:</p>
            <p className="font-light">{product.caseMaterial}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Case size:</p>
            <p className="font-light">{product.caseSize} mm</p>
          </div>
        </div>
        <ProductForm
          product={product}
          open={isShowingDetails}
          setOpen={setIsShowingDetails}
          editable={false}
        />
      </div>
    </div>
  );
}
