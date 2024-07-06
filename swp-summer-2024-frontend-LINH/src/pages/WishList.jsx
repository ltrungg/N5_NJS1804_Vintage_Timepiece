import React, { useState } from "react";
import WishListItem from "../components/wishlist/WishListItem";
import EmptyList from "../assets/images/profile/empty-order.webp";
import { message } from "antd";
import Loading from "../components/loading/Loading";

export default function WishList() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const wishList = sessionStorage.wishList
    ? JSON.parse(sessionStorage.wishList)
    : [];

  const [currentList, setCurrentList] = useState(wishList);

  const getRemoveItem = (value) => {
    const updated = currentList.filter((item) => item !== value);
    sessionStorage.setItem("wishList", JSON.stringify(updated));
    setCurrentList(updated);
    message.info({
      key: "remove",
      content: "Removed from your wish list!",
      duration: 5,
    });
  };

  return (
    <div className="w-full bg-slate-100 min-h-[80vh] flex flex-col items-center justify-start gap-4">
      <div className="relative w-2/3 h-fit flex items-center justify-start gap-2 bg-white drop-shadow-md rounded-lg p-8 mt-2">
        <p className="font-semibold text-lg">MY WISH LIST</p>
        <div
          className={`flex items-center gap-2 ${
            currentList.length === 0 && "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="fill-teal-600"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
          </svg>
          <p>
            {currentList.length} ITEM
            <span className={`${currentList.length > 1 ? "inline" : "hidden"}`}>
              S
            </span>
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/signin")}
          className={`absolute top-1/4 right-8 bg-gray-700 text-white p-2 lg:px-8 lg:py-2 rounded-xl ${
            user && "invisible"
          }`}
        >
          SIGN IN
        </button>
      </div>

      {currentList.length === 0 ? (
        <div className="w-2/3 flex flex-col items-center justify-center gap-8 h-64 bg-white drop-shadow-lg rounded-lg">
          <img src={EmptyList} alt="" className="w-24" />
          <p className="text-gray-600">EMPTY WISH LIST</p>
        </div>
      ) : (
        <div className="w-2/3 flex flex-wrap justify-start gap-4 px-4 pb-16">
          {currentList.map((product) => {
            return (
              <WishListItem
                key={product.id}
                user={user}
                product={product}
                getRemoveItem={getRemoveItem}
                isLoading={() => {
                  return <Loading />;
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
