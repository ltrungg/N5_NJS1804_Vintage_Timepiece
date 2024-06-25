import { Avatar, message } from "antd";
import React, { useState } from "react";
import Loading from "../loading/Loading";

export default function ProductDetailComponent({ product, isInCart }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [tempAddToCart, setTempAddToCart] = useState(false);

  const handleAddToCart = () => {
    setTempAddToCart(true);
    const cartSession = sessionStorage.cartList;
    if (cartSession) {
      const cart = JSON.parse(cartSession);
      const findInCart = cart.find((item) => item.id === product.id);
      if (findInCart) {
        messageApi.open({
          key: "addToCart",
          type: "info",
          content: (
            <p className="inline">
              This item has already been in your cart.{" "}
              <span
                className="underline text-sky-600 cursor-pointer hover:text-sky-800"
                onClick={() => window.location.replace("/cart")}
              >
                Check it out!
              </span>
            </p>
          ),
        });
      } else {
        cart.push(product);
        sessionStorage.setItem("cartList", JSON.stringify(cart));
        messageApi.open({
          key: "addToCart",
          type: "success",
          content: (
            <p className="inline">
              Added to cart.{" "}
              <span
                className="underline text-sky-600 cursor-pointer hover:text-sky-800"
                onClick={() => window.location.replace("/cart")}
              >
                Check it out!
              </span>
            </p>
          ),
        });
      }
    } else {
      sessionStorage.setItem("cartList", JSON.stringify([product]));
      messageApi.open({
        key: "addToCart",
        type: "success",
        content: (
          <p className="inline">
            Added to cart.{" "}
            <span
              className="underline text-sky-600 cursor-pointer hover:text-sky-800"
              onClick={() => window.location.replace("/cart")}
            >
              Check it out!
            </span>
          </p>
        ),
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.replace("/cart");
  };

  return !product ? (
    <Loading />
  ) : (
    <div className="w-full flex flex-row justify-center font-montserrat gap-4">
      {contextHolder}
      <div className="w-full flex flex-col items-center justify-between">
        <img src={product.image} alt="" className="w-[400px]" />
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
              <p className="font-bold">Year of production:</p>
              <p className="font-light">{product.yearOfProduction}</p>
            </div>
            <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
              <p className="font-bold">Remaining Insurance:</p>
              <p className="font-light">{product.remainingInsurance} months</p>
            </div>
            <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
              <p className="font-bold">Case material:</p>
              <p className="font-light">{product.caseMaterial}</p>
            </div>
            <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
              <p className="font-bold">Case size:</p>
              <p className="font-light">{product.caseSize} mm</p>
            </div>
            <div className="flex flex-row items-center justify-between grow-0 flex-[100%] sm:flex-[45%] md:flex-[30%] lg:hidden">
              <p className="font-bold">Water resistance:</p>
              <p className="font-light">{product.waterResistance} mm</p>
            </div>
          </div>
        </div>
      </div>
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
            $ {Math.round(product.price * 100) / 100}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <button
            onClick={handleAddToCart}
            className={`w-5/6 flex items-center justify-center gap-2 rounded-md font-bold text-sm text-xl text-white ${
              isInCart || tempAddToCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-teal-700 hover:bg-teal-900"
            } mx-auto py-3 transition-all duration-500`}
          >
            {isInCart || tempAddToCart ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                </svg>
                Added to cart
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"></path>
                </svg>
                Add to cart
              </>
            )}
          </button>
          <button
            onClick={handleBuyNow}
            className="w-5/6 flex items-center justify-center gap-2 rounded-md bg-red-500 hover:bg-red-700 font-bold text-sm text-xl text-white mx-auto py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
            </svg>
            Buy now
          </button>
        </div>

        <div className="flex flex-row gap-1 font-light text-xs mx-auto mt-6">
          <div className="flex flex-col gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M12 20V22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9998 7V14H19V8H15V4H5V20H12ZM14.4646 19.4647L18.0001 23.0002L22.9498 18.0505L21.5356 16.6362L18.0001 20.1718L15.8788 18.0505L14.4646 19.4647Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M10.0073 2.10365C8.60568 1.64993 7.08206 2.28104 6.41181 3.59294L5.60603 5.17011C5.51029 5.35751 5.35787 5.50992 5.17048 5.60566L3.5933 6.41144C2.2814 7.08169 1.6503 8.60532 2.10401 10.0069L2.64947 11.6919C2.71428 11.8921 2.71428 12.1077 2.64947 12.3079L2.10401 13.9929C1.6503 15.3945 2.28141 16.9181 3.5933 17.5883L5.17048 18.3941C5.35787 18.4899 5.51029 18.6423 5.60603 18.8297L6.41181 20.4068C7.08206 21.7187 8.60569 22.3498 10.0073 21.8961L11.6923 21.3507C11.8925 21.2859 12.108 21.2859 12.3082 21.3507L13.9932 21.8961C15.3948 22.3498 16.9185 21.7187 17.5887 20.4068L18.3945 18.8297C18.4902 18.6423 18.6426 18.4899 18.83 18.3941L20.4072 17.5883C21.7191 16.9181 22.3502 15.3945 21.8965 13.9929L21.351 12.3079C21.2862 12.1077 21.2862 11.8921 21.351 11.6919L21.8965 10.0069C22.3502 8.60531 21.7191 7.08169 20.4072 6.41144L18.83 5.60566C18.6426 5.50992 18.4902 5.3575 18.3945 5.17011L17.5887 3.59294C16.9185 2.28104 15.3948 1.64993 13.9932 2.10365L12.3082 2.6491C12.108 2.71391 11.8925 2.71391 11.6923 2.6491L10.0073 2.10365ZM8.19283 4.50286C8.41624 4.06556 8.92412 3.8552 9.39132 4.00643L11.0763 4.55189C11.6769 4.74632 12.3236 4.74632 12.9242 4.55189L14.6092 4.00643C15.0764 3.8552 15.5843 4.06556 15.8077 4.50286L16.6135 6.08004C16.9007 6.64222 17.3579 7.09946 17.9201 7.38668L19.4973 8.19246C19.9346 8.41588 20.145 8.92375 19.9937 9.39095L19.4483 11.076C19.2538 11.6766 19.2538 12.3232 19.4483 12.9238L19.9937 14.6088C20.145 15.076 19.9346 15.5839 19.4973 15.8073L17.9201 16.6131C17.3579 16.9003 16.9007 17.3576 16.6135 17.9197L15.8077 19.4969C15.5843 19.9342 15.0764 20.1446 14.6092 19.9933L12.9242 19.4479C12.3236 19.2535 11.6769 19.2535 11.0763 19.4479L9.39132 19.9933C8.92412 20.1446 8.41624 19.9342 8.19283 19.4969L7.38705 17.9197C7.09983 17.3576 6.64258 16.9003 6.08041 16.6131L4.50323 15.8073C4.06593 15.5839 3.85556 15.076 4.0068 14.6088L4.55226 12.9238C4.74668 12.3232 4.74668 11.6766 4.55226 11.076L4.0068 9.39095C3.85556 8.92375 4.06593 8.41588 4.50323 8.19246L6.0804 7.38668C6.64258 7.09946 7.09983 6.64222 7.38705 6.08004L8.19283 4.50286ZM6.75984 11.7573L11.0025 15.9999L18.0736 8.92885L16.6594 7.51464L11.0025 13.1715L8.17406 10.343L6.75984 11.7573Z"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <p className="min-w-max">
              Free fast shipping within <span className="font-bold">1-2</span>{" "}
              days
            </p>
            <p className="min-w-max">
              Offer a full return within <span className="font-bold">14</span>{" "}
              days
            </p>
            <p className="min-w-max">
              <span className="font-bold">Fully certified</span> by our
              appraisers
            </p>
            <p className="min-w-max">
              Insurance offered is up to <span className="font-bold">36</span>{" "}
              months
            </p>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
