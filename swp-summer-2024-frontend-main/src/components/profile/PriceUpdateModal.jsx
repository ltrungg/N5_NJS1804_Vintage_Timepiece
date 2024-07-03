import { Avatar, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PriceUpdateModal({
  product,
  open,
  setOpen,
  getRequestStatus,
}) {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [isValidPrice, setIsValidPrice] = useState(true);
  const [priceError, setPriceError] = useState("");
  const maxPrice =
    parseFloat(product.price) + (parseFloat(product.price) * 20) / 100;
  const minPrice =
    parseFloat(product.price) - (parseFloat(product.price) * 20) / 100;

  useEffect(() => {
    if (price > maxPrice) {
      setPriceError("Your desired price is too high to be dealt");
      setIsValidPrice(false);
    } else if (price < minPrice) {
      setPriceError("Your desired price is too low to be dealt");
      setIsValidPrice(false);
    } else {
      setIsValidPrice(true);
      setPriceError("");
    }
  }, [price]);

  const handleConfirmUpdatePrice = async () => {
    await axios
      .post("http://localhost:3000/sellerRequest", {
        account: user.id,
        product: product.id,
        type: "update",
        update: {
          price: price,
        },
        note: note,
        status: false,
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
          key: "updatePrice",
          content: "Your price update request has been successfully recorded.",
          duration: 5,
        });
        getRequestStatus("updated");
      })
      .catch((err) => {
        console.log(err);
        message.error({
          key: "updatePrice",
          content: "Failed to send request. Please try again!",
          duration: 5,
        });
      });
    setOpen(false);
  };

  return (
    <Modal
      title=<p className="font-montserrat">Request to update price</p>
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
          <p className="text-xs opacity-80">{product.brand}</p>
          <p className="">
            Current price:{" "}
            <span className="text-lg font-semibold text-sky-800 px-1">
              $ {Math.round(product.price * 100) / 100}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <p>
              Your desired price: <span className="text-red-500">*</span>
            </p>
            <input
              value={price}
              maxLength={6}
              onChange={(e) => {
                if (e.target.value.length === 0) setPrice("");
                else if (
                  e.target.value.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/) &&
                  parseFloat(e.target.value) > 0
                ) {
                  setPrice(Math.round(parseFloat(e.target.value) * 100) / 100);
                }
              }}
              className="w-[10em] border p-2 rounded-xl text-sky-600 disabled:border-none disabled:bg-white"
            />
          </div>
          <p
            className={`text-xs ${
              isValidPrice ? "text-green-500" : "text-red-500"
            } font-light italic ${price === "" && "invisible"}`}
          >
            {isValidPrice ? (
              <>&#10003; &ensp; Valid price</>
            ) : (
              <>Warning: {priceError}</>
            )}
          </p>

          <p>
            Reason: <span className="text-red-500">*</span>
          </p>
          <Input.TextArea
            autoSize={{
              minRows: 4,
              maxRows: 10,
            }}
            showCount
            maxLength={500}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter..."
            className="font-montserrat"
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-8">
        <button onClick={() => resetData()} className="hover:underline">
          Reset
        </button>
        <button
          disabled={!isValidPrice || price === "" || note.length === 0}
          onClick={handleConfirmUpdatePrice}
          className="px-8 py-2 bg-green-500 hover:bg-green-600 font-semibold text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
