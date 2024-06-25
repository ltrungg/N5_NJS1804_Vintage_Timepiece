import React from "react";
import Check from "../assets/images/thank_you/check.png";
import { useParams } from "react-router-dom";

export default function ThankYou() {
  const { id } = useParams();
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-8 font-poppins">
      <p className="text-[4em] font-bold text-indigo-950">THANK YOU!</p>
      <img src={Check} alt="" className="w-32" />
      <p className="text-sm">
        Your order <span>#{id}</span> has been successfully placed.
      </p>
      <button
        onClick={() => window.location.replace("/profile")}
        className="px-8 py-2 rounded-lg bg-green-600 hover:bg-green-800 text-white"
      >
        CHECK ORDER
      </button>
    </div>
  );
}
