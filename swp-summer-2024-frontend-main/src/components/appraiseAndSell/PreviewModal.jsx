import React, { useState } from "react";
import { Avatar, Checkbox, Modal } from "antd";
import moment from "moment";
import axios from "axios";

export default function PreviewModal({ open, setOpen, user, product }) {
  const [confirmChecked, setConfirmChecked] = useState(false);

  const handleConfirm = async () => {
    console.log("Product: ", product);
    await axios
      .post("http://localhost:3000/product", product)
      .then(async (res) => {
        await axios
          .post("http://localhost:3000/sellerRequest", {
            account: user.id,
            product: res.data.id,
            type: "create",
            update: product,
            details: "Request to be appraised",
          })
          .then((res) => {
            console.log("Sent request: ", res.data);
            sessionStorage.setItem("appraisalSucceeded", "true");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      title=<p className="text-sky-700 font-bold text-lg">Preview</p>
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setConfirmChecked(false);
        setOpen(false);
      }}
      footer={null}
      centered
    >
      <div className="w-full font-montserrat pt-4">
        {product && (
          <div className="w-64 h-80 flex flex-col py-4 border border-gray-400 rounded-lg relative overflow-hidden mx-auto">
            <img
              src={product.image}
              alt=""
              className="w-full overflow-hidden z-0 transition-transform duration-300 transform group-hover:scale-125"
            />
            <div className="absolute inset-0 transition-opacity duration-300 peer-hover:opacity-0 pointer-events-none"></div>
            <div className="w-full absolute bottom-0 left-0 text-white overflow-hidden z-10 group/semi cursor-pointer">
              <div className="w-full px-2 py-4 text-[1em] font-semibold bg-white text-black">
                <p className="max-w-64 text-nowrap text-ellipsis overflow-hidden group-hover/semi:underline">
                  {product.name}
                </p>
                <div className="w-full flex items-center justify-between">
                  <p className="text-xs font-light opacity-70">
                    {product.brand}
                  </p>
                  <p className="text-sm text-red-600">
                    $ <span className="italic">actual price*</span>
                  </p>
                </div>
                <div className="w-full flex items-center justify-between text-[0.7em] mt-2">
                  <div className="flex items-center gap-1">
                    <Avatar src={user.avatar} alt="" size={16} />
                    <p className="font-medium max-w-20 text-nowrap text-ellipsis overflow-hidden">
                      {user.username}
                    </p>
                  </div>
                  <p className="font-light min-w-fit">
                    {moment(product.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-600 italic px-16 pt-2">
          Your product would be displayed like above when it is available to be
          purchased.
        </p>

        <div className="flex items-start gap-2 pt-8">
          <Checkbox
            checked={confirmChecked}
            onChange={() => setConfirmChecked(!confirmChecked)}
          />
          <p>
            By confirming, your request to appraise this watch will be sent and
            evaluated by our appraisers. Please make sure every type of data is
            completely correct!
          </p>
        </div>

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
            disabled={!confirmChecked}
            onClick={handleConfirm}
            className="grow py-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
