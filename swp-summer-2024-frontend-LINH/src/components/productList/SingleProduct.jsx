import React, { useState } from "react";
import moment from "moment";
import { Avatar, message, Tooltip } from "antd";
import CurrencySplitter from "../../assistants/currencySpliter";

export default function SingleProduct({
  product,
  isWishList,
  getAddToWishList,
}) {
  const [wishListState, setWishListState] = useState(isWishList);
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
      getAddToWishList(product, "add");
      setWishListState(true);
    } else {
      if (wishList.some((item) => item.id === product.id)) {
        const updated = wishList.filter((item) => item.id !== product.id);
        sessionStorage.setItem("wishList", JSON.stringify(updated));
        message.info({
          key: "wishList",
          content: "Removed from your wish list.",
          duration: 5,
        });
        getAddToWishList(product, "remove");
        setWishListState(false);
      } else {
        wishList.push(product);
        sessionStorage.setItem("wishList", JSON.stringify(wishList));
        message.success({
          key: "wishList",
          content: "Added to your wish list.",
          duration: 5,
        });
        getAddToWishList(product, "add");
        setWishListState(true);
      }
    }
  };

  return (
    <div className="h-80 basis-[30%] lg:basis-[20%] flex flex-col py-4 border border-gray-400 rounded-lg relative overflow-hidden group">
      <button
        onClick={() => addToFavorite()}
        className="absolute top-4 right-4 z-20"
      >
        {wishListState ? (
          <Tooltip title="Added to wish list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="red"
            >
              <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
            </svg>
          </Tooltip>
        ) : (
          <Tooltip title="Add to wish list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="fill-red-500 hover:stroke-red-500"
            >
              <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
            </svg>
          </Tooltip>
        )}
      </button>
      <img
        src={product.image}
        alt=""
        className="w-full overflow-hidden z-0 transition-transform duration-300 transform group-hover:scale-125"
      />
      <div className="absolute inset-0 transition-opacity duration-300 peer-hover:opacity-0 pointer-events-none"></div>
      <div
        onClick={() => (window.location.href = `/product/${product.id}`)}
        className="w-full absolute bottom-0 left-0 text-white overflow-hidden z-10 group/semi cursor-pointer"
      >
        <div className="w-full px-2 py-4 text-[1em] font-semibold bg-white text-black">
          <p className="max-w-64 text-nowrap text-ellipsis overflow-hidden group-hover/semi:underline">
            {product.name}
          </p>
          <div className="w-full flex items-center justify-between">
            <p className="text-xs font-light opacity-70">{product.brand}</p>
            <p className="text-sm text-red-600">
              $ {CurrencySplitter(Math.round(product.price * 100) / 100)}
            </p>
          </div>
          <div className="w-full flex items-center justify-between text-[0.7em] mt-2">
            <div className="flex items-center gap-1">
              <Avatar src={product.owner.avatar} alt="" size={16} />
              <p className="font-medium max-w-20 text-nowrap text-ellipsis overflow-hidden">
                {product.owner.username}
              </p>
            </div>
            <p className="font-light min-w-fit">
              {moment(product.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
