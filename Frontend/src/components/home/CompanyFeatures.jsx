import React from "react";

export default function CompanyFeatures() {
  return (
    <div className="font-poppins bg-teal-950">
      <p className="w-full text-center text-white text-[3em] my-8 font-bold">
        ABOUT VINTAGE TIMEPIECE
      </p>
      <div className="w-full flex items-center text-center mt-8">
        <div className="w-1/4 h-64 px-2 bg-black text-white flex flex-col items-center justify-center gap-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="currentColor"
          >
            <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
          </svg>
          <p className="uppercase">
            Free fast-shipping within{" "}
            <span className="font-bold underline underline-offset-4">
              1-3 days
            </span>
          </p>
        </div>
        <div className="w-1/4 h-64 px-2 bg-teal-500 flex flex-col items-center justify-center gap-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="currentColor"
          >
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
          <p className="uppercase">
            Offer a{" "}
            <span className="font-bold underline underline-offset-4">
              {" "}
              full return within 14 days
            </span>
          </p>
        </div>
        <div className="w-1/4 h-64 px-2 bg-black text-white flex flex-col items-center justify-center gap-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="currentColor"
          >
            <path d="M12 20V22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9998 7V14H19V8H15V4H5V20H12ZM14.4646 19.4647L18.0001 23.0002L22.9498 18.0505L21.5356 16.6362L18.0001 20.1718L15.8788 18.0505L14.4646 19.4647Z"></path>
          </svg>
          <p className="uppercase">
            <span className="font-bold underline underline-offset-4">
              Fully certified
            </span>{" "}
            by Vintage Timepiece Team
          </p>
        </div>
        <div className="w-1/4 h-64 px-2 bg-teal-500 flex flex-col items-center justify-center gap-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="currentColor"
          >
            <path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM16.4524 8.22183L17.8666 9.63604L11.5026 16L7.25999 11.7574L8.67421 10.3431L11.5019 13.1709L16.4524 8.22183Z"></path>
          </svg>
          <p className="uppercase">
            Offered{" "}
            <span className="font-bold underline underline-offset-4">
              the best prices
            </span>{" "}
            in current market
          </p>
        </div>
      </div>
    </div>
  );
}
