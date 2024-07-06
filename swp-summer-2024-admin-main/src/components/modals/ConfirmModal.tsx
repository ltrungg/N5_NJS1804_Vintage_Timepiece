import { Modal } from "antd";
import React from "react";

export default function ConfirmModal({
  action,
  object,
  open,
  setOpen,
  getConfirm,
}: {
  action?: string;
  object: any | any[];
  open: boolean;
  setOpen: Function;
  getConfirm: Function;
}) {
  const handleConfirm = () => {
    getConfirm({
      action: action,
      object: object,
    });
    setOpen("");
  };

  const status = action?.match("approve");

  return (
    <Modal
      title={
        <p className="font-bold text-lg">CONFIRM TO {action?.toUpperCase()}</p>
      }
      open={open}
      footer={null}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen("");
      }}
      centered
    >
      <p className="text-gray-700 text-md italic">Are you sure you want to do this?</p>
      <div className="w-full flex items-center justify-end gap-8 px-2 pt-8">
        <button
          onClick={() => setOpen(false)}
          className="text-xs hover:underline"
        >
          CANCEL
        </button>
        <button
          onClick={handleConfirm}
          className={`px-8 py-2 rounded-xl ${status ? "bg-green-600 hover:bg-green-800" : "bg-red-600 hover:bg-red-800"} duration-200 text-white font-semibold text-nowrap`}
        >
          CONFIRM
        </button>
      </div>
    </Modal>
  );
}
