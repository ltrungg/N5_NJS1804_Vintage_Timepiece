import React from "react";
import image from "../../assets/images/home/herosection.jpg";

export default function HeroSection() {
  return (
    <div className="w-full h-[520px] bg-teal-950 flex items-center py-16 justify-between text-white mb-2 overflow-hidden">
      <div className="font-poppins w-1/2 px-16 flex flex-col gap-4">
        <p className="text-[2em] lg:text-[4em] font-bold">
          An elegant and simple way to{" "}
          <span className="text-[#CDBE4A]">TIME</span>.
          <p className="opacity-80 text-sm">
            Get access to a grand variety of watches that fit your wrist
          </p>
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="w-3/4 min-w-fit text-md md:text-2xl bg-white font-semibold py-2 md:py-4 rounded-xl text-black border-white hover:border hover:bg-[#CDBE4A] hover:border-black duration-300 mt-16"
        >
          SHOP NOW
        </button>
      </div>

      <div
        className="w-1/2 h-full bg-black flex items-start rounded-xl overflow-hidden mr-16 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
    </div>
  );
}
