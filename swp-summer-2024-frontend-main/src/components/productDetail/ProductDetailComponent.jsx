import { Avatar, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { generateChatRoomId } from "../../assistants/generators";
import Loading from "../loading/Loading";
import CurrencySplitter from "../../assistants/currencySpliter";
import ReportModal from "./ReportModal";
import ColumnGroup from "antd/es/table/ColumnGroup";

export default function ProductDetailComponent({
  user,
  product,
  isInWishList,
}) {
  const [wishListState, setWishListState] = useState(isInWishList);
  const [isReporting, setIsReporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          <div className="ml-4 flex flex-col gap-3">
            <p className="font-light">{product.brand}</p>
            <p className="text-[2em] font-semibold leading-[1.2em]">
              {product.name}
            </p>
            <p className="w-full text-xs text-end pr-4">
              owned by &ensp;
              <span className="opacity-70 cursor-pointer hover:opacity-100">
                <Avatar size={16} src={product.owner.avatar} />{" "}
                {product.owner.username}
              </span>
            </p>
            <p className="text-[30px] font-bold">
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
        <p className="text-2xl font-bold">SPECIFICATIONS</p>
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
      </div>
    </div>
  );
}
