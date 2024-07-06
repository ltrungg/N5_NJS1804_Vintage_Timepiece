import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Image } from "antd";
import PlaceholderImage from "../../assets/images/profile/placeholder_image.svg";
import { imageDb } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function ProductForm({
  open,
  setOpen,
  product,
  editable,
  getProductData,
}) {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const [isEditing, setIsEditing] = useState(editable ? true : false);

  const [name, setName] = useState(product ? product.name : "");
  const [brand, setBrand] = useState(product ? product.brand : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [image, setImage] = useState(
    product ? product.image : PlaceholderImage
  );
  const [price, setPrice] = useState(
    product ? (Math.round(product.price) * 100) / 100 : 0
  );
  const [type, setType] = useState(product && product.type);
  const [dialColor, setDialColor] = useState(product ? product.dialColor : "");
  const [dialColorList, setDialColorList] = useState(
    product ? product.dialColor.split(",") : []
  );
  const [waterResistance, setWaterResistance] = useState(
    product && product.waterResistance
  );

  const [box, setBox] = useState(product ? product.box : null);
  const [papers, setPapers] = useState(product ? product.papers : null);

  const [caseMaterial, setCaseMaterial] = useState(
    product && product.caseMaterial
  );
  const [caseSize, setCaseSize] = useState(product ? product.caseSize : "");
  const [yearOfProduction, setYearOfProduction] = useState(
    product && product.yearOfProduction
  );
  const [pastUsageTime, setPastUsageTime] = useState(
    product ? product.pastUsageTime : ""
  );
  const [remainingInsurance, setRemainingInsurance] = useState(
    product ? product.remainingInsurance : ""
  );

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

  const mergeDialColor = (value) => {
    setDialColorList(value);
    let temp = "";
    value.forEach((item, index) => {
      if (index !== value.length - 1) temp += `${item}, `;
      else temp += item;
    });
    setDialColor(temp);
  };

  const handleConfirmForm = () => {
    if (!user) window.location.href("/signin");
    else {
      //Complete product data
      const productData = {
        owner: user.id,
        name,
        brand,
        price: 0,
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
      };
      console.log("Product: ", productData);
      getProductData(productData);

      //Do anything with the product here...
      setOpen(false);
    }
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
    } else {
      setName("");
      setBrand("");
      setImage(PlaceholderImage);
      setDescription("");
      setType(null);
      setDialColorList([]);
      setWaterResistance(null);
      setCaseMaterial(null);
      setCaseSize("");
      setBox(null);
      setPapers(null);
      setYearOfProduction("");
      setPastUsageTime("");
      setRemainingInsurance("");
    }
  };

  const checkFormValidity = () => {
    if (
      name.length > 0 &&
      brand.length > 0 &&
      description.length > 0 &&
      type &&
      dialColorList.length > 0 &&
      waterResistance &&
      caseMaterial &&
      caseSize > 0 &&
      (box === true || box === false) &&
      (papers === true || papers === false)
    )
      setIsValidForm(true);
    else setIsValidForm(false);
  };

  useEffect(() => {
    checkFormValidity();
  }, [
    name,
    brand,
    description,
    type,
    dialColorList,
    waterResistance,
    caseMaterial,
    caseSize,
    box,
    papers,
  ]);

  const handleFileUpload = async (e) => {
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

  return (
    <Modal
      title=<h1 className="text-xl font-bold text-sky-800">
        Product Information
      </h1>
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
          <Image src={image} alt="" width={300} preview={!editable} />
          {isEditing && (
            <>
              <input type="file" onChange={handleFileUpload} accept="image/*" />
            </>
          )}
        </div>
        <div className="w-2/3 flex flex-col items-start gap-2">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Name{" "}
              <span className={`${!editable && "hidden"} text-red-600`}>*</span>
            </p>
            <input
              disabled={!isEditing}
              type="text"
              placeholder="e.g. Casio Stainless Steel Classic Digital Watch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[35em] border p-2 rounded-xl disabled:border-none disabled:bg-white"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Brand{" "}
              <span className={`${!editable && "hidden"} text-red-600`}>*</span>
            </p>
            <input
              disabled={!isEditing}
              placeholder="e.g. Casio"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-[20em] border p-2 rounded-xl disabled:border-none disabled:bg-white"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Description{" "}
              <span className={`${!editable && "hidden"} text-red-600`}>*</span>
            </p>
            {isEditing ? (
              <Input.TextArea
                disabled={!isEditing}
                autoSize={{
                  minRows: 4,
                  maxRows: 10,
                }}
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-[35em] border p-2 font-montserrat rounded-xl disabled:border-none disabled:bg-white"
              />
            ) : (
              <p className="text-xs px-2">{description}</p>
            )}
          </div>
          <div
            className={`${
              editable && "hidden"
            } flex flex-col items-start justify-start gap-1`}
          >
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Price <span className="font-light">($)</span>{" "}
              <span className={`${!editable && "hidden"} text-red-600`}>*</span>
            </p>
            <input
              disabled={!isEditing}
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
              className="w-[10em] border p-2 rounded-xl disabled:border-none disabled:bg-white"
            />
          </div>

          <div className="w-full flex items-center justify-between gap-1">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Type{" "}
                <span className={`${!editable && "hidden"} text-red-600`}>
                  *
                </span>
              </p>
              {isEditing ? (
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
              ) : (
                <p className="px-2">{type}</p>
              )}
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Dial color{" "}
                <span className={`${!editable && "hidden"} text-red-600`}>
                  *
                </span>
              </p>
              {isEditing ? (
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
              ) : (
                <p className="px-2">{dialColor}</p>
              )}
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Water resistance <span className="font-light">(mm)</span>{" "}
                <span className={`${!editable && "hidden"} text-red-600`}>
                  *
                </span>
              </p>
              {isEditing ? (
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
              ) : (
                <p className="px-2">{waterResistance}</p>
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case material{" "}
                <span className={`${!editable && "hidden"} text-red-600`}>
                  *
                </span>
              </p>
              {isEditing ? (
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
              ) : (
                <p className="px-2">{caseMaterial}</p>
              )}
            </div>
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case size <span className="font-light">(mm)</span>{" "}
                <span className={`${!editable && "hidden"} text-red-600`}>
                  *
                </span>
              </p>
              <input
                disabled={!isEditing}
                placeholder="e.g. 42, 50"
                value={caseSize}
                maxLength={3}
                onChange={(e) => {
                  if (e.target.value.length === 0) setCaseSize("");
                  else if (e.target.value.match(/^[0-9]*$/))
                    setCaseSize(e.target.value);
                }}
                className="w-[10em] border p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
            <div className="grow"></div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2 pb-4">
            <div className="w-full flex items-center justify-between gap-8">
              <div className="w-1/2 flex flex-col items-start justify-start gap-1">
                <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                  Box{" "}
                  <span className={`${!editable && "hidden"} text-red-600`}>
                    *
                  </span>
                </p>
                <div className="w-full flex items-center justify-start">
                  <button
                    onClick={() => {
                      if (isEditing) setBox(true);
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
                      if (isEditing) setBox(false);
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
                  Papers{" "}
                  <span className={`${!editable && "hidden"} text-red-600`}>
                    *
                  </span>
                </p>
                <div className="w-full flex items-center justify-start">
                  <button
                    onClick={() => {
                      if (isEditing) setPapers(true);
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
                      if (isEditing) setPapers(false);
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
                disabled={!isEditing}
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
                className="w-[10em] border p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Past usage time <span className="font-light">(month)</span>
              </p>
              <input
                disabled={!isEditing}
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
                className="w-[10em] border p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Remaining insurance <span className="font-light">(month)</span>
              </p>
              <input
                disabled={!isEditing}
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
                className="w-[10em] border p-2 rounded-xl disabled:border-none disabled:bg-white"
              />
            </div>
          </div>
          <p
            className={`${!editable && "hidden"} text-xs font-light italic p-2`}
          >
            Note: Please fulfill every field that are marked by{" "}
            <span className="text-red-500">*</span> and upload an image.
          </p>
        </div>
      </div>

      <div
        className={`${
          !editable && "hidden"
        } w-full flex items-center justify-end gap-8 font-montserrat`}
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
