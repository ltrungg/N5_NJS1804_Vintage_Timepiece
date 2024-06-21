import React from "react";
import ProductCard from "../productDetail/ProductCard";

export default function LatestProducts({ list }) {
  return (
    <div className="font-poppins pb-16 bg-gray-800 text-white">
      <p className="w-full text-center text-[3em] mt-8 font-bold">
        LATEST PRODUCTS
      </p>
      <div className="w-full flex justify-end px-16 mb-8 font-light">
        <button
          onClick={() => window.location.replace("/products")}
          className="flex items-center gap-2 hover:underline"
        >
          See more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
      </div>
      <div className="w-full px-16 grid grid-cols-4 grid-gap-6 gap-y-4 place-items-center">
        {list.map((item) => {
          return <ProductCard key={item.id} product={item} />;
        })}
      </div>
    </div>
  );
}
