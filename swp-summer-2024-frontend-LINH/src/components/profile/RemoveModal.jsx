import { Avatar, Checkbox, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RemoveModal({
  product,
  open,
  setOpen,
  getRequestStatus,
}) {
  const [checkedConfirm, setCheckedConfirm] = useState(false);
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const handleConfirmUpdatePrice = async () => {
    await axios
      .post("http://localhost:3000/sellerRequest", {
        account: user.id,
        product: product.id,
        type: "delete",
        details: "Stop selling",
      })
      .then(async (res) => {
        await axios
          .patch(`http://localhost:3000/product/${product.id}`, {
            status: "UPDATE_REQUESTED",
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
        message.success({
          key: "updateStatus",
          content: "Your remove request has been successfully recorded.",
          duration: 5,
        });
        getRequestStatus("updated");
      })
      .catch((err) => {
        console.log(err);
        message.error({
          key: "updateStatus",
          content: "Failed to send request. Please try again!",
          duration: 5,
        });
      });
    setOpen(false);
  };

  return (
    <Modal
      title=<p className="text-red-700 font-semibold font-montserrat">
        Are you sure to request to remove this product?
      </p>
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
    >
      <div className="w-full flex items-start gap-2 font-montserrat px-2 py-8">
        <Avatar src={product.image} alt="" size={64} />
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{product.name}</p>
          <p className="text-xs opacity-80">
            {product.brand} &#8226; $ {Math.round(product.price * 100) / 100}
          </p>
        </div>
      </div>

      <div>
        <Checkbox
          checked={checkedConfirm}
          onChange={() => setCheckedConfirm(!checkedConfirm)}
        />
        <p className="inline ml-2 font-montserrat">
          By checking, you are confirming remove this product out of Vintage
          Timepiece System.
        </p>
      </div>

      <p className="text-[0.8em] italic text-red-500 py-2 font-montserrat">
        This action CANNOT be reverted.
      </p>

      <div className="w-full flex items-center justify-end gap-8 font-montserrat pt-4">
        <button onClick={() => setOpen(false)} className="hover:underline">
          Cancel
        </button>
        <button
          disabled={!checkedConfirm}
          onClick={handleConfirmUpdatePrice}
          className="px-8 py-2 bg-red-500 hover:bg-red-600 font-semibold text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
