import React from "react";
import { Modal } from "antd";

export default function UpdatePhoneModal({ open, setOpen }) {
  return (
    <Modal
      title=<p className="text-yellow-700 font-semibold">
        Phone number yet provided!
      </p>
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
      centered
    >
      <div className="w-full font-montserrat">
        <p className="text-gray-600">
          Phone number is required if you want to appraise and sell your product
          within <span className="font-semibold">Vintage Timepiece System</span>
          .
        </p>
        <div className="w-full flex items-center gap-2 mt-8">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="grow py-2 border border-gray-400 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              sessionStorage.setItem("updatePhoneNumber", "true");
              window.location.href = "/profile";
            }}
            className="grow py-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-xl"
          >
            Update phone number
          </button>
        </div>
      </div>
    </Modal>
  );
}
