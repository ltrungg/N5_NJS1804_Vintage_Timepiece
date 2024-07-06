import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Image, message } from "antd";
import { Montserrat } from "next/font/google";
import { imageDb } from "@/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: "normal",
  weight: ["200", "400", "600", "800"],
});

export default function EditProductModal({
  open,
  setOpen,
  product,
  getEditStatus,
}: any) {
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [price, setPrice] = useState((Math.round(product.price) * 100) / 100);
  const [type, setType] = useState(product && product.type);
  const [dialColor, setDialColor] = useState(product.dialColor);
  const [dialColorList, setDialColorList] = useState(
    product.dialColor.split(",")
  );
  const [waterResistance, setWaterResistance] = useState(
    product.waterResistance
  );
  const [box, setBox] = useState(product.box);
  const [papers, setPapers] = useState(product.papers);
  const [caseMaterial, setCaseMaterial] = useState(product.caseMaterial);
  const [caseSize, setCaseSize] = useState(product.caseSize);
  const [yearOfProduction, setYearOfProduction] = useState(
    product.yearOfProduction
  );
  const [pastUsageTime, setPastUsageTime] = useState(product.pastUsageTime);
  const [remainingInsurance, setRemainingInsurance] = useState(
    product.remainingInsurance
  );
  const [status, setStatus] = useState(product.status);

  const [isValidForm, setIsValidForm] = useState(false);

  const watchTypeOptions = [
    {
      label: "Analogue",
      value: "Analogue",
    },
    {
      label: "Automatic",
      value: "Automatic",
    },
    {
      label: "Chronograph",
      value: "Chronograph",
    },
    {
      label: "Digital",
      value: "Digital",
    },
    {
      label: "Hybrid",
      value: "Hybrid",
    },
    {
      label: "Mechanical",
      value: "Mechanical",
    },
    {
      label: "Quartz",
      value: "Quartz",
    },
    {
      label: "Smartwatch",
      value: "Smartwatch",
    },
  ];

  const dialColorOptions = [
    {
      label: "White",
      value: "White",
    },
    {
      label: "Silver",
      value: "Silver",
    },
    {
      label: "Golden",
      value: "Golden",
    },
    {
      label: "Black",
      value: "Black",
    },
    {
      label: "Blue",
      value: "Blue",
    },
    {
      label: "Dark blue",
      value: "Dark blue",
    },
    {
      label: "Champagne",
      value: "Champagne",
    },
    {
      label: "Navy",
      value: "Navy",
    },
    {
      label: "Green",
      value: "Green",
    },
  ];

  const waterResistanceOptions = [
    {
      label: "Not water-resistant",
      value: "0",
    },
    {
      label: "30 (3 ATM)",
      value: "30",
    },
    {
      label: "50 (5 ATM)",
      value: "50",
    },
    {
      label: "100 (10 ATM)",
      value: "100",
    },
    {
      label: "150 (15 ATM)",
      value: "150",
    },
    {
      label: "200 (20 ATM)",
      value: "200",
    },
    {
      label: "300 (30 ATM)",
      value: "300",
    },
  ];

  const caseMaterialOptions = [
    {
      label: "Stainless Steel",
      value: "Stainless Steel",
    },
    {
      label: "Silver",
      value: "Silver",
    },
    {
      label: "Gold",
      value: "Gold",
    },
    {
      label: "Titanium",
      value: "Titanium",
    },
    {
      label: "Bronze",
      value: "Bronze",
    },
    {
      label: "PVD",
      value: "PVD",
    },
    {
      label: "Plastic",
      value: "Plastic",
    },
    {
      label: "Base metal",
      value: "Base metal",
    },
    {
      label: "Silicon",
      value: "Silicon",
    },
  ];

  const mergeDialColor = (value: any) => {
    setDialColorList(value);
    let temp = "";
    value.forEach((item: any, index: number) => {
      if (index !== value.length - 1) temp += `${item}, `;
      else temp += item;
    });
    setDialColor(temp);
  };

  const handleConfirmForm = async () => {
    const productData = {
      owner: product.owner.id,
      name,
      brand,
      price,
      description,
      image,
      type,
      dialColor,
      waterResistance,
      caseMaterial,
      caseSize,
      box,
      papers,
      yearOfProduction,
      pastUsageTime,
      remainingInsurance,
      status,
    };
    console.log("Product: ", productData);
    await axios
      .patch(`http://localhost:3000/product/${product.id}`, productData)
      .then((res) => {
        message.success({
          key: "editProduct",
          content: (
            <p className="inline">
              <span className="font-bold text-sky-800">{name}</span> has been
              successfully updated.
            </p>
          ),
          duration: 5,
        });
        getEditStatus("edited");
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const resetData = () => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setImage(product.image);
      setDescription(product.description);
      setPrice(product.price);
      setType(product.type);
      setDialColorList(product.dialColor.split(","));
      setWaterResistance(product.waterResistance);
      setCaseMaterial(product.caseMaterial);
      setCaseSize(product.caseSize);
      setBox(product.box);
      setPapers(product.papers);
      setYearOfProduction(product.yearOfProduction);
      setPastUsageTime(product.pastUsageTime);
      setRemainingInsurance(product.remainingInsurance);
    }
  };

  const checkFormValidity = () => {
    if (
      name.length > 0 &&
      brand.length > 0 &&
      image.length > 0 &&
      price > 0 &&
      description.length > 0 &&
      type &&
      dialColorList.length > 0 &&
      waterResistance &&
      caseMaterial &&
      caseSize > 0 &&
      (box === true || box === false) &&
      (papers === true || papers === false) &&
      (name !== product.name ||
        brand !== product.brand ||
        image !== product.image ||
        price !== parseFloat(product.price) ||
        description !== product.description ||
        type !== product.type ||
        dialColor !== product.dialColor ||
        waterResistance !== product.waterResistance ||
        caseMaterial !== product.caseMaterial ||
        caseSize !== product.caseSize ||
        box !== product.box ||
        papers !== product.papers ||
        status !== product.status)
    )
      setIsValidForm(true);
    else setIsValidForm(false);
  };

  useEffect(() => {
    checkFormValidity();
  }, [
    name,
    brand,
    image,
    description,
    type,
    dialColorList,
    waterResistance,
    caseMaterial,
    caseSize,
    box,
    papers,
    status,
  ]);

  const handleFileUpload = async (e: any) => {
    const uploaded = e.target.files[0];
    //Upload image
    if (uploaded) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, uploaded).then(async (value) => {
        console.log("Uploaded: ", value.metadata);
        setImage(await getDownloadURL(value.ref));
      });
    }
  };

  const handleImageUrl = () => {
    const url = prompt("Enter new image url:");
    if (url) setImage(url);
  };

  return (
    <Modal
      title={
        <h1 className="text-xl font-bold text-sky-800">Product Information</h1>
      }
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        resetData();
        setOpen(false);
      }}
      footer={null}
      style={{
        top: 20,
      }}
      width={1000}
    >
      <div
        className={`w-full flex items-start justify-center gap-8 p-8 ${montserrat.className} overflow-x-hidden`}
      >
        <div className="flex flex-col items-center justify-start gap-8">
          {image.length === 0 && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png"
              className="w-48 h-48 rounded-full"
            />
          )}
          <Image
            src={image}
            alt=""
            width={300}
            preview={{ maskClassName: "rounded-full" }}
            className="rounded-full"
          />
          <button
            onClick={() => {
              document.getElementById("image-upload")?.click();
            }}
            className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-semibold"
          >
            Upload image
          </button>
          <p className="text-gray-500 text-[0.8em]">
            or{" "}
            <span
              onClick={handleImageUrl}
              className="underline cursor-pointer hover:text-black"
            >
              use a URL instead
            </span>
          </p>
          <input
            id="image-upload"
            type="file"
            hidden
            onChange={handleFileUpload}
          />
        </div>
        <div className="w-2/3 flex flex-col items-start gap-2">
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              STATUS <span className="text-red-600">*</span>
            </p>
            <div className="w-full flex justify-between">
              <button
                onClick={() => setStatus("IN APPRAISAL")}
                className={`grow border py-2 duration-200 ${
                  status === "IN APPRAISAL"
                    ? "bg-amber-600 text-white font-semibold"
                    : "hover:bg-amber-500 hover:text-white text-gray-400"
                } rounded-l-lg`}
              >
                IN APPRAISAL
              </button>
              <button
                onClick={() => setStatus("AVAILABLE")}
                className={`grow border border-l-0 py-2 duration-200 ${
                  status === "AVAILABLE"
                    ? "bg-green-600 text-white font-semibold"
                    : "hover:bg-green-500 hover:text-white text-gray-400"
                }`}
              >
                AVAILABLE
              </button>
              <button
                onClick={() => setStatus("UPDATE_REQUESTED")}
                className={`grow border border-l-0 py-2 duration-200 ${
                  status === "UPDATE_REQUESTED"
                    ? "bg-sky-600 text-white font-semibold"
                    : "hover:bg-sky-500 hover:text-white text-gray-400"
                }`}
              >
                UPDATING
              </button>
              <button
                onClick={() => setStatus("SOLD")}
                className={`grow border border-l-0 py-2 duration-200 ${
                  status === "SOLD"
                    ? "bg-stone-600 text-white font-semibold"
                    : "hover:bg-stone-500 hover:text-white text-gray-400"
                }`}
              >
                SOLD
              </button>
              <button
                onClick={() => setStatus("CANCELED")}
                className={`grow border border-l-0 py-2 duration-200 ${
                  status === "CANCELED"
                    ? "bg-red-600 text-white font-semibold"
                    : "hover:bg-red-500 hover:text-white text-gray-400"
                } rounded-r-lg`}
              >
                CANCELED
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Name <span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              placeholder="e.g. Casio Stainless Steel Classic Digital Watch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[35em] border border-gray-300 p-2 rounded-xl disabled:border-none disabled:bg-white"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Brand <span className="text-red-600">*</span>
            </p>
            <input
              placeholder="e.g. Casio"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-[20em] border border-gray-300 p-2 rounded-xl disabled:border-none disabled:bg-white"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Description <span className="text-red-600">*</span>
            </p>
            <Input.TextArea
              autoSize={{
                minRows: 4,
                maxRows: 10,
              }}
              placeholder="Enter description..."
              spellCheck={false}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-[35em] border p-2 font-montserrat rounded-xl disabled:border-none disabled:bg-white ${montserrat.className}`}
            />
          </div>
          <div className={`flex flex-col items-start justify-start gap-1`}>
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Price <span className="font-light">($)</span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <input
              value={price}
              onChange={(e) => {
                if (e.target.value.length === 0) setPrice(0);
                else if (
                  e.target.value.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/) &&
                  parseFloat(e.target.value) > 0 &&
                  parseFloat(e.target.value) < 100000
                )
                  setPrice(Math.round(parseFloat(e.target.value) * 100) / 100);
              }}
              className="w-[10em] border border-gray-300 p-2 rounded-xl disabled:border-none disabled:bg-white"
            />
          </div>

          <div className="w-full flex items-center justify-between gap-1">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Type <span className="text-red-600">*</span>
              </p>

              <Select
                showSearch
                placeholder="Select type..."
                popupMatchSelectWidth={200}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={type}
                options={watchTypeOptions}
                onSelect={(value) => {
                  setType(value);
                }}
                className="min-w-[8em]"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Dial color <span className="text-red-600">*</span>
              </p>

              <Select
                mode="tags"
                maxTagTextLength={5}
                maxCount={3}
                placeholder="Select dial color(s)... (maximum 3)"
                popupMatchSelectWidth={200}
                value={dialColorList}
                options={dialColorOptions}
                onChange={mergeDialColor}
                className="min-w-[8em]"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Water resistance <span className="font-light">(mm)</span>{" "}
                <span className="text-red-600">*</span>
              </p>

              <Select
                placeholder="Select water resistance level..."
                popupMatchSelectWidth={200}
                value={waterResistance}
                options={waterResistanceOptions}
                onSelect={(value) => {
                  setWaterResistance(value);
                }}
                className="min-w-[8em]"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case material <span className="text-red-600">*</span>
              </p>

              <Select
                showSearch
                placeholder="Select case material..."
                popupMatchSelectWidth={200}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={caseMaterial}
                options={caseMaterialOptions}
                onSelect={(value) => {
                  setCaseMaterial(value);
                }}
                className="min-w-[10em]"
              />
            </div>
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case size <span className="font-light">(mm)</span>{" "}
                <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="e.g. 42, 50"
                value={caseSize}
                maxLength={3}
                onChange={(e) => {
                  if (e.target.value.length === 0) setCaseSize("");
                  else if (e.target.value.match(/^[0-9]*$/))
                    setCaseSize(e.target.value);
                }}
                className="w-[10em] border border-gray-300 p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
            <div className="grow"></div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2 pb-4">
            <div className="w-full flex items-center justify-between gap-8">
              <div className="w-1/2 flex flex-col items-start justify-start gap-1">
                <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                  Box <span className="text-red-600">*</span>
                </p>
                <div className="w-full flex items-center justify-start">
                  <button
                    onClick={() => {
                      setBox(true);
                    }}
                    className={`${
                      box === true
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-l-md duration-200`}
                  >
                    YES
                  </button>
                  <button
                    onClick={() => {
                      setBox(false);
                    }}
                    className={`${
                      box === false
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-r-md duration-200`}
                  >
                    NO
                  </button>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-start justify-start gap-1">
                <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                  Papers <span className="text-red-600">*</span>
                </p>
                <div className="w-full flex items-center justify-start">
                  <button
                    onClick={() => {
                      setPapers(true);
                    }}
                    className={`${
                      papers === true
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-l-md duration-200`}
                  >
                    YES
                  </button>
                  <button
                    onClick={() => {
                      setPapers(false);
                    }}
                    className={`${
                      papers === false
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-r-md duration-200`}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Year of manufacture
              </p>
              <input
                placeholder="e.g. 1999, 2024"
                value={yearOfProduction}
                maxLength={4}
                onChange={(e) => {
                  if (e.target.value.length === 0) setYearOfProduction("");
                  else if (
                    e.target.value.match(/^[0-9]*$/) &&
                    parseFloat(e.target.value) < 2025
                  )
                    setYearOfProduction(e.target.value);
                }}
                className="w-[10em] border border-gray-300 p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Past usage time <span className="font-light">(month)</span>
              </p>
              <input
                placeholder="e.g. 3, 6, 12"
                value={pastUsageTime}
                maxLength={3}
                onChange={(e) => {
                  if (e.target.value.length === 0) setPastUsageTime("");
                  else if (
                    e.target.value.match(/^[0-9]*$/) &&
                    parseFloat(e.target.value) < 240
                  )
                    setPastUsageTime(e.target.value);
                }}
                className="w-[10em] border border-gray-300 p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Remaining insurance <span className="font-light">(month)</span>
              </p>
              <input
                placeholder="e.g. 3, 6, 12"
                value={remainingInsurance}
                maxLength={3}
                onChange={(e) => {
                  if (e.target.value.length === 0) setRemainingInsurance("");
                  else if (
                    e.target.value.match(/^[0-9]*$/) &&
                    parseFloat(e.target.value) < 240
                  )
                    setRemainingInsurance(e.target.value);
                }}
                className="w-[10em] border border-gray-300 p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
          </div>
          <p className={`text-sm font-light italic p-2`}>
            Note: Please make sure every field that are marked by{" "}
            <span className="text-red-500">*</span> and the image are fulfilled.
          </p>
        </div>
      </div>

      <div
        className={`${montserrat.className} w-full flex items-center justify-end gap-8 font-montserrat`}
      >
        <button onClick={() => resetData()} className="hover:underline">
          Reset
        </button>
        <button
          disabled={!isValidForm}
          onClick={handleConfirmForm}
          className="px-8 py-2 bg-green-500 hover:bg-green-600 font-semibold text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
