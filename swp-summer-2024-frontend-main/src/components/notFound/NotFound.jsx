import React from "react";
import detective from "../../assets/images/404/detective.jpg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-16 pt-16">
      <img src={detective} alt="" className="w-64 rounded-[40%]" />
      <div className="flex flex-col items-center justify-center gap-4 text-center text-gray-700">
        <p className="text-[500%] font-bold">404</p>
        <span className="font-bold">
          <p>Looks like this page is missing.</p>
          <p>Don't worry though, our best man is on the case.</p>
        </span>
        <span className="flex flex-col items-center justify-center gap-2 mt-2">
          <p className="font-light text-sm">
            Meanwhile, why don't you try again by going
          </p>
          <Link
            to="/"
            className="p-3 bg-sky-800 text-white font-bold hover:bg-sky-900 rounded-xl"
          >
            BACK HOME
          </Link>
        </span>
      </div>
    </div>
  );
}
