import React from "react";
import moment from "moment";

export default function ProductCard({ product }) {
  return (
    <div
      onClick={() => window.location.replace(`/product/${product.id}`)}
      className="bg-gray-700 min-w-64 max-w-64 h-80 flex flex-col border border-gray-400 rounded-lg relative cursor-pointer overflow-hidden group"
    >
      <img
        src={product.image}
        alt=""
        className="w-full overflow-hidden z-0 transition-transform duration-300 transform group-hover:scale-125"
      />
      <div className="absolute inset-0 transition-opacity duration-300 peer-hover:opacity-0 pointer-events-none"></div>
      <div className="w-full absolute bottom-0 left-0 text-white overflow-hidden z-10">
        <div className="w-full px-2 py-4 text-[1em] font-semibold bg-gray-700">
          <p className="max-w-64 text-nowrap text-ellipsis overflow-hidden group-hover:underline">
            {product.name}
          </p>
          <p className="text-sm font-light">
            $ {Math.round(product.price * 100) / 100}
          </p>
          <p className="text-xs font-thin mt-2 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
            </svg>
            {moment(product.updatedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}
