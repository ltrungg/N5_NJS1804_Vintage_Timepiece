import React from "react";
import logo from "../logoSVG/logo.svg";

export default function Footer() {
  if (
    window.location.pathname.match("/chat") ||
    window.location.pathname === "/signin" ||
    window.location.pathname === "/signup"
  )
    return;

  return (
    <footer className="w-full bg-teal-950 h-24 flex items-center justify-between text-white px-8 py-4">
      <div className="flex flex-col items-start gap-1">
        <button
          onClick={() => window.location.replace("/")}
          className="w-1/3 flex items-center gap-4 font-bold text-[1.2em] md:text-[2em] min-w-fit"
        >
          <img src={logo} width={24} />
          VINTAGE TIMEPIECE
        </button>
        <p className="text-[0.6em]">
          Please contact{" "}
          <span className="opacity-70 underline cursor-pointer">
            vintagetimepiece00@gmail.com
          </span>{" "}
          for further information.
        </p>
      </div>
      <div className="text-[0.6em] text-white self-end">
        Vintage Timepiece &copy;, 2024
      </div>
    </footer>
  );
}
