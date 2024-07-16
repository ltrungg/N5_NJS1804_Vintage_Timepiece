"use client";
import React, { useState } from "react";
import { Modal, Image, Avatar } from "antd";
import dateFormat from "@/assistants/date.format";
import CurrencySplitter from "@/assistants/currencySpliter";

export default function ProductInformation({
  product,
  open,
  setOpen,
}: {
  product: any;
  open: boolean;
  setOpen: Function;
}) {
  const [dialColor, setDialColor] = useState(product?.dialColor || "");
  const [dialColorList, setDialColorList] = useState(
    (product?.dialColor || "").split(",")
  );
  const [waterResistance, setWaterResistance] = useState(
    product?.waterResistance || 0
  );

  return (
    <Modal
      title={
        <h1 className="text-xl font-bold text-sky-800">Product Information</h1>
      }
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
      style={{
        top: 20,
      }}
      width={1000}
    >
      <div className="w-full flex items-start justify-center gap-8 p-8 font-montserrat overflow-x-hidden">
        <div className="flex flex-col items-center justify-start gap-8">
          <div className="font-mono py-1 flex items-center justify-center gap-2">
            <p>Owner:</p>
            {product?.owner ? (
              <>
                <Avatar src={product.owner.avatar} alt="" size={32} />
                <p>{product.owner.username}</p>
              </>
            ) : (
              <p>No owner information available</p>
            )}
          </div>
          {product?.image && (
            <Image
              src={product.image}
              alt=""
              width={300}
              preview={{
                maskClassName: "rounded-full",
              }}
            />
          )}
        </div>
        <div className="w-2/3 flex flex-col items-start gap-2">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">Name</p>
            <p className="px-2">{product?.name}</p>
          </div>
          <div className="w-full flex items-center justify-start gap-16">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Brand
              </p>
              <p className="px-2">{product?.brand}</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Price
              </p>
              <p className="px-2">
                $ {CurrencySplitter(Math.round((product?.price || 0) * 100) / 100)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Description
            </p>
            <p className="text-xs px-2">{product?.description}</p>
          </div>

          <div className="w-full flex items-center justify-between gap-1">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Type
              </p>
              <p className="px-2">{product?.type}</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Dial color
              </p>
              <p className="px-2">{dialColor}</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Water resistance <span className="font-light">(mm)</span>
              </p>
              <p className="px-2">{waterResistance}</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case material
              </p>
              <p className="px-2">{product?.caseMaterial}</p>
            </div>
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case size <span className="font-light">(mm)</span>
              </p>
              <p className="px-2">{product?.caseSize}</p>
            </div>
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Box
              </p>
              <p className="px-2">
                {product?.box ? (
                  <span className="text-green-600">&#10003;</span>
                ) : (
                  <span className="text-red-500">&#10005;</span>
                )}
              </p>
            </div>
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Papers
              </p>
              <p className="px-2">
                {product?.papers ? (
                  <span className="text-green-600">&#10003;</span>
                ) : (
                  <span className="text-red-500">&#10005;</span>
                )}
              </p>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Year of manufacture
              </p>
              <p className="px-2">{product?.yearOfProduction}</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Past usage time <span className="font-light">(month)</span>
              </p>
              <p className="px-2">{product?.pastUsageTime}</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Remaining insurance <span className="font-light">(month)</span>
              </p>
              <p className="px-2">{product?.remainingInsurance}</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-end text-[0.8em] text-gray-600 mt-8">
            <p>Status: {product?.status}&emsp;&#8226;&emsp;</p>
            {dateFormat(product?.createdAt, "HH:MM dd/mm/yyyy")}
          </div>
        </div>
      </div>
    </Modal>
  );
}
