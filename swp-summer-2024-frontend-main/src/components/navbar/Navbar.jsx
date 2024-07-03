import React, { useEffect } from "react";
import { Avatar, Dropdown } from "antd";
import { useCookies } from "react-cookie";
import logo from "../logoSVG/logo.svg";

export default function Navbar() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const [cookies, setCookie, removeCookie] = useCookies(["signInUser"]);

  const signOut = () => {
    console.log("Sign out");
    sessionStorage.removeItem("signInUser");
    removeCookie("signInUser");
    window.location.href = "/signin";
  };

  const handlePressSignIn = () => {
    sessionStorage.setItem("signInRedirect", window.location.pathname);
    window.location.href = "/signin";
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => (window.location.href = "/profile")}
          className="w-full min-w-fit flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
          </svg>
          View Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => (window.location.href = "/profile/manage-product")}
          className="w-full min-w-fit flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"></path>
          </svg>
          <p className="min-w-fit">Timepiece Management</p>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={signOut}
          className="w-full px-8 py-1 flex items-center gap-2 text-lg justify-center bg-red-600 rounded-md text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
          </svg>
          Sign out
        </div>
      ),
    },
  ];

  if (
    window.location.pathname === "/signin" ||
    window.location.pathname === "/signup"
  )
    return;

  return (
    <nav className="relative w-full h-20 bg-teal-950 font-montserrat flex items-center justify-between px-4 md:px-8 text-white">
      <div className="flex justify-end gap-4 xl:gap-8 font-semibold text-sm">
        <button
          onClick={() => (window.location.href = "/products")}
          className={`min-w-fit hidden lg:flex items-center gap-2 hover:text-slate-300 hover:underline underline-offset-8 ${
            window.location.pathname === "/products" &&
            "underline text-teal-400"
          }`}
        >
          <svg
            fill="currentColor"
            height="24"
            width="24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path
                d="M432,256c0-40.625-15.228-77.755-40.264-106.002c-0.046-0.176-0.088-0.352-0.147-0.527l-20.353-61.06
		c-1.964-5.89-6.052-10.605-11.236-13.446V24c0-13.233-10.767-24-24-24H208c-13.233,0-24,10.767-24,24v50.964
		c-5.184,2.842-9.273,7.557-11.236,13.447l-20.353,61.06c-0.058,0.175-0.101,0.351-0.147,0.527
		c-14.734,16.624-26.072,36.322-32.905,58.002H104c-13.234,0-24,10.766-24,24v48c0,13.234,10.766,24,24,24h15.359
		c6.833,21.682,18.172,41.381,32.907,58.006c0.046,0.175,0.088,0.35,0.146,0.524l20.353,61.06
		c1.963,5.889,6.05,10.604,11.234,13.446V488c0,13.233,10.767,24,24,24h128c13.233,0,24-10.767,24-24v-50.963
		c5.186-2.842,9.275-7.558,11.238-13.448l20.354-61.06c0.059-0.176,0.102-0.354,0.148-0.531C416.774,333.752,432,296.624,432,256z
		 M187.942,93.471c1.091-3.272,4.141-5.471,7.59-5.471h100.465c4.418,0,8-3.582,8-8s-3.582-8-8-8H200V24c0-4.411,3.589-8,8-8h128
		c4.411,0,8,3.589,8,8v48h-15.999c-4.418,0-8,3.582-8,8s3.582,8,8,8h20.467c3.449,0,6.499,2.198,7.59,5.47l11.401,34.204
		C340.793,107.786,307.747,96,272,96c-35.747,0-68.793,11.786-95.459,31.674L187.942,93.471z M104,288c-4.411,0-8-3.589-8-8v-48
		c0-4.411,3.589-8,8-8h11.217c-2.108,10.343-3.217,21.044-3.217,32s1.109,21.657,3.217,32H104z M272,112
		c79.402,0,144,64.598,144,144s-64.598,144-144,144s-144-64.598-144-144S192.598,112,272,112z M356.059,418.53
		c-1.091,3.272-4.141,5.47-7.589,5.47h-20.467c-4.418,0-8,3.582-8,8s3.582,8,8,8H344v48c0,4.411-3.589,8-8,8H208
		c-4.411,0-8-3.589-8-8v-48h95.999c4.418,0,8-3.582,8-8s-3.582-8-8-8H195.534c-3.449,0-6.499-2.198-7.59-5.47l-11.401-34.202
		C203.209,404.214,236.254,416,272,416c35.749,0,68.795-11.787,95.461-31.676L356.059,418.53z"
              />
              <path
                d="M272,384c70.58,0,128-57.42,128-128c0-27.96-8.854-54.524-25.606-76.82c-2.654-3.532-7.669-4.244-11.202-1.59
		c-3.532,2.654-4.244,7.669-1.59,11.202c13.046,17.362,20.599,37.692,22.103,59.208H376c-4.418,0-8,3.582-8,8s3.582,8,8,8h7.711
		c-3.929,55.394-48.317,99.782-103.711,103.711V360c0-4.418-3.582-8-8-8s-8,3.582-8,8v7.711
		c-55.394-3.929-99.782-48.317-103.711-103.711H168c4.418,0,8-3.582,8-8s-3.582-8-8-8h-7.711
		c3.929-55.394,48.317-99.782,103.711-103.711V152c0,4.418,3.582,8,8,8s8-3.582,8-8v-7.705c21.512,1.503,41.837,9.054,59.197,22.094
		c3.531,2.652,8.547,1.942,11.201-1.592c2.653-3.533,1.941-8.547-1.592-11.201C326.514,136.851,299.955,128,272,128
		c-70.58,0-128,57.42-128,128S201.42,384,272,384z"
              />
              <path
                d="M272,176c-4.418,0-8,3.582-8,8v72c0,0.067,0.008,0.131,0.01,0.198c0.004,0.162,0.011,0.324,0.025,0.486
		c0.009,0.109,0.022,0.216,0.036,0.323c0.019,0.15,0.041,0.299,0.068,0.449c0.022,0.119,0.047,0.237,0.075,0.354
		c0.031,0.132,0.064,0.264,0.102,0.395c0.037,0.131,0.079,0.259,0.123,0.387c0.039,0.115,0.08,0.229,0.125,0.343
		c0.055,0.139,0.115,0.276,0.177,0.411c0.047,0.101,0.094,0.201,0.145,0.3c0.073,0.142,0.151,0.28,0.232,0.417
		c0.035,0.059,0.063,0.12,0.099,0.178l40,64c1.518,2.428,4.125,3.761,6.792,3.761c1.448,0,2.914-0.393,4.232-1.217
		c3.747-2.342,4.885-7.277,2.544-11.024L280,253.705V184C280,179.582,276.418,176,272,176z"
              />
            </g>
          </svg>
          ALL WATCHES
        </button>
        <button
          onClick={() => (window.location.href = "/sell")}
          className={`min-w-fit hidden lg:flex items-center gap-2 hover:text-slate-300 hover:underline underline-offset-8
            ${
              window.location.pathname === "/sell" && "underline text-teal-400"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M12.998 2V3H19.998V5H12.998V19H16.998V21H6.99805V19H10.998V5H3.99805V3H10.998V2H12.998ZM4.99805 6.34315L7.82647 9.17157C8.55033 9.89543 8.99805 10.8954 8.99805 12C8.99805 14.2091 7.20719 16 4.99805 16C2.78891 16 0.998047 14.2091 0.998047 12C0.998047 10.8954 1.44576 9.89543 2.16962 9.17157L4.99805 6.34315ZM18.998 6.34315L21.8265 9.17157C22.5503 9.89543 22.998 10.8954 22.998 12C22.998 14.2091 21.2072 16 18.998 16C16.7889 16 14.998 14.2091 14.998 12C14.998 10.8954 15.4458 9.89543 16.1696 9.17157L18.998 6.34315ZM4.99805 9.17157L3.58383 10.5858C3.20988 10.9597 2.99805 11.4606 2.99805 12C2.99805 13.1046 3.89348 14 4.99805 14C6.10262 14 6.99805 13.1046 6.99805 12C6.99805 11.4606 6.78621 10.9597 6.41226 10.5858L4.99805 9.17157ZM18.998 9.17157L17.5838 10.5858C17.2099 10.9597 16.998 11.4606 16.998 12C16.998 13.1046 17.8935 14 18.998 14C20.1026 14 20.998 13.1046 20.998 12C20.998 11.4606 20.7862 10.9597 20.4123 10.5858L18.998 9.17157Z"></path>
          </svg>
          APPRAISE & SELL
        </button>
        <button
          onClick={() => (window.location.href = "/contact")}
          className={`min-w-fit hidden lg:flex items-center gap-2 hover:text-slate-300 hover:underline underline-offset-8
            ${
              window.location.pathname === "/contact" &&
              "underline text-teal-400"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M19 7H24V9H19V7ZM17 12H24V14H17V12ZM20 17H24V19H20V17ZM2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11Z"></path>
          </svg>
          CONTACT
        </button>
      </div>

      <button
        onClick={() => (window.location.href = "/")}
        className="absolute top-4 left-8 lg:left-1/2 duration-100 flex flex-col items-center gap-1 font-bold min-w-fit"
      >
        <img src={logo} width={32} />
        <p className="hidden sm:inline">VINTAGE TIMEPIECE</p>
      </button>

      {user ? (
        <div className="flex items-center gap-8">
          <button
            onClick={() => (window.location.href = "/chat")}
            className="flex flex-col items-center gap-1 group/chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              className="group-hover/chat:fill-gray-400 duration-200"
            >
              <path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM14 11V13H16V11H14ZM8 11V13H10V11H8Z"></path>
            </svg>
            <p className="text-[0.6em] group-hover/chat:text-gray-400 duration-200">
              CHAT
            </p>
          </button>

          <button
            onClick={() => (window.location.href = "/wishlist")}
            className="flex flex-col items-center gap-1 group/wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              className="group-hover/wishlist:fill-gray-400 duration-200"
            >
              <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
            </svg>
            <p className="text-[0.6em] group-hover/wishlist:text-gray-400 duration-200">
              WISHLIST
            </p>
          </button>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            trigger={["click"]}
            className="flex items-center border border-white md:p-2 rounded-full"
          >
            <button className="flex items-center gap-2 bg-white text-black hover:text-slate-600">
              <Avatar src={user.avatar} />
              <p className="text-[0.8em] overflow-hidden text-nowrap text-ellipsis max-w-40">
                {user ? user.username : " user"}
              </p>
            </button>
          </Dropdown>
        </div>
      ) : (
        <button
          className="xs:min-w-fit flex items-center gap-2 hover:text-gray-800 border border-white p-2 rounded-xl hover:bg-white duration-300"
          onClick={handlePressSignIn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M10 11V8L15 12L10 16V13H1V11H10ZM2.4578 15H4.58152C5.76829 17.9318 8.64262 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9H2.4578C3.73207 4.94289 7.52236 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C7.52236 22 3.73207 19.0571 2.4578 15Z"></path>
          </svg>
          SIGN IN / SIGN UP
        </button>
      )}
    </nav>
  );
}
