import { Modal, Input, message } from "antd";
import React, { useState } from "react";

export default function AppraisalConfirm({
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
  const [newPrice, setNewPrice] = useState("");
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    let data: any = {
      action: action,
      object: object,
    };
  
    if (action === "approve" && newPrice) {
        const parsedPrice = parseFloat(newPrice);
        if (!isNaN(parsedPrice) && parsedPrice > 0) {
          data.newPrice = parsedPrice;
          data.note = `Price updated to ${parsedPrice}`;
        } else {
          message.error("Please enter a valid price");
          return;
        }
      }
  
      if (action === "reject" && note) {
        data.note = note;
      }
  
    getConfirm(data);
    setOpen("");
    setNewPrice("");
    setNote("");
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
        setNewPrice("");
        setNote("");
      }}
      centered
    >
      <p className="text-gray-700 text-md italic">Are you sure you want to do this?</p>
      {status ? (
        <Input
          type="number"
          placeholder="Enter new price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="mt-4"
          
        />
        
      ) : (
        <Input.TextArea
          placeholder="Enter reject note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-4"
        />
      )}
      <div className="w-full flex items-center justify-end gap-8 px-2 pt-8">
        <button
          onClick={() => {
            setOpen(false);
            setNewPrice("");
            setNote("");
          }}
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