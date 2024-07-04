import React from "react";

export default function ActionList() {
  const navigate = (url: string) => {
    window.location.href = url;
  };
  return (
    <div className="w-[95%] flex flex-col items-center border border-gray-300 rounded-md">
      <div
        onClick={() => navigate("/user/accounts")}
        className="w-full flex items-center gap-6 text-gray-600 border-b border-gray-300 px-6 py-4 hover:bg-slate-100 hover:text-stone-950 duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
        >
          <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18H8ZM12 13C10.6193 13 9.5 11.8807 9.5 10.5C9.5 9.11929 10.6193 8 12 8C13.3807 8 14.5 9.11929 14.5 10.5C14.5 11.8807 13.3807 13 12 13Z"></path>
        </svg>
        <span className="flex flex-col gap-1">
          <p className="font-black">User management</p>
          <p className="text-sm">
            Take control of all of the existing accounts within the system.
          </p>
        </span>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </span>
      </div>
      <div
        onClick={() => navigate("/user/sellers")}
        className="w-full flex items-center gap-6 text-gray-600 border-b border-gray-300 px-6 py-4 hover:bg-slate-100 hover:text-stone-950 duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
        >
          <path d="M12.6844 4.02547C12.4588 4.00646 12.2306 3.9967 12 3.9967C7.58172 3.9967 4 7.57843 4 11.9967C4 16.415 7.58172 19.9967 12 19.9967C16.4183 19.9967 20 16.415 20 11.9967C20 11.7662 19.9902 11.5379 19.9711 11.3123C19.8996 10.4646 19.6953 9.6442 19.368 8.87344L20.8682 7.37114C21.2031 8.01192 21.4706 8.6935 21.6613 9.40649C21.8213 10.0063 21.9258 10.6222 21.9723 11.248C21.9907 11.4952 22 11.7449 22 11.9967C22 17.5196 17.5228 21.9967 12 21.9967C6.47715 21.9967 2 17.5196 2 11.9967C2 6.47386 6.47715 1.9967 12 1.9967C12.2518 1.9967 12.5015 2.00601 12.7487 2.02431C13.3745 2.07081 13.9904 2.17542 14.5898 2.3358C15.3032 2.52609 15.9848 2.79359 16.6256 3.1285L15.1247 4.62934C14.3525 4.30143 13.5321 4.09707 12.6844 4.02547ZM20.4853 2.09721L21.8995 3.51142L12.7071 12.7038L11.2954 12.7063L11.2929 11.2896L20.4853 2.09721Z"></path>
        </svg>
        <span className="flex flex-col gap-1">
          <p className="font-black">User's request management</p>
          <p className="text-sm">
            Handle requests to adjust products or relevant issues from users and
            take action on them.
          </p>
        </span>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </span>
      </div>
      <div
        onClick={() => navigate("/user/appraisers")}
        className="w-full flex items-center gap-6 text-gray-600 border-b border-gray-300 px-6 py-4 hover:bg-slate-100 hover:text-stone-950 duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
        >
          <path d="M21 8V12H19V9H14V4H5V20H11V22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM13.7857 15.3269C13.8246 14.5997 14.3858 14.0083 15.11 13.9313L15.9807 13.8389C16.0841 13.8279 16.1815 13.7845 16.2589 13.715L16.9102 13.1299C17.4519 12.6431 18.2669 12.6218 18.8334 13.0795L19.5145 13.6298C19.5954 13.6951 19.6949 13.7333 19.7988 13.7389L20.6731 13.7857C21.4003 13.8246 21.9917 14.3858 22.0687 15.11L22.1611 15.9807C22.1721 16.0841 22.2155 16.1815 22.285 16.2589L22.8701 16.9102C23.3569 17.4519 23.3782 18.2669 22.9205 18.8334L22.3702 19.5145C22.3049 19.5954 22.2667 19.6949 22.2611 19.7988L22.2143 20.6731C22.1754 21.4003 21.6142 21.9917 20.89 22.0687L20.0193 22.1611C19.9159 22.1721 19.8185 22.2155 19.7411 22.285L19.0898 22.8701C18.5481 23.3569 17.7331 23.3782 17.1666 22.9205L16.4855 22.3702C16.4046 22.3049 16.3051 22.2667 16.2012 22.2611L15.3269 22.2143C14.5997 22.1754 14.0083 21.6142 13.9313 20.89L13.8389 20.0193C13.8279 19.9159 13.7845 19.8185 13.715 19.7411L13.1299 19.0898C12.6431 18.5481 12.6218 17.733 13.0795 17.1666L13.6298 16.4855C13.6951 16.4046 13.7333 16.3051 13.7389 16.2012L13.7857 15.3269ZM21.0303 17.0303L19.9697 15.9697L17.5 18.4393L16.0303 16.9697L14.9697 18.0303L17.5 20.5607L21.0303 17.0303Z"></path>
        </svg>
        <span className="flex flex-col gap-1">
          <p className="font-black">Appraiser's request management</p>
          <p className="text-sm">
            Handle requests from appraisers to authenticate appraisals or
            relevant issues.
          </p>
        </span>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </span>
      </div>
      <div
        onClick={() => navigate("/timepiece")}
        className="w-full flex items-center gap-6 text-gray-600 border-b border-gray-300 px-6 py-4 hover:bg-slate-100 hover:text-stone-950 duration-200 cursor-pointer"
      >
        <svg
          fill="currentColor"
          height="32"
          width="32"
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
        <span className="flex flex-col gap-1">
          <p className="font-black">Timepiece management</p>
          <p className="text-sm">
            Manage all of the watches that are currently existing within Vintage
            Timepiece System.
          </p>
        </span>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </span>
      </div>
      <div
        onClick={() => navigate("/report/product")}
        className="w-full flex items-center gap-6 text-gray-600 border-b border-gray-300 px-6 py-4 hover:bg-slate-100 hover:text-stone-950 duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
        >
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path>
        </svg>
        <span className="flex flex-col gap-1">
          <p className="font-black">Report management</p>
          <p className="text-sm">
            View all of the reports on a specific product or an account that are
            sent by users.
          </p>
        </span>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </span>
      </div>
      <div
        onClick={() => navigate("/transaction")}
        className="w-full flex items-center gap-6 text-gray-600 px-6 py-4 hover:bg-slate-100 hover:text-stone-950 duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
        >
          <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM8 9H16V11H8V9ZM8 13H16V15H8V13Z"></path>
        </svg>
        <span className="flex flex-col gap-1">
          <p className="font-black">Transaction management</p>
          <p className="text-sm">
            Take control of every transaction that is made when purchasing a
            product in the system.
          </p>
        </span>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </span>
      </div>
    </div>
  );
}
