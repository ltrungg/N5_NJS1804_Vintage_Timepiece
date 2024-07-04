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

  return (
    <Modal
      title={<p className="font-black text-sky-700">CONFIRM</p>}
      open={open}
      footer={null}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen("");
      }}
    >
      <p className="font-semibold text-gray-700 text-lg">
        Are you sure you want to do this?
      </p>
      <div className="w-full flex items-center justify-end gap-8 px-2 pt-8">
        <button onClick={() => setOpen(false)} className="hover:underline">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-8 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-nowrap"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
