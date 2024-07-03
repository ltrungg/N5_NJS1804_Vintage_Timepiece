import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartCheckout({ getCheckoutInfo }) {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const [checkoutInfo, setCheckoutInfo] = useState({
    contact: {
      email: user ? user.email : "",
      phone: user ? user.phone : "",
    },
    address: "",
    purchaseMethod: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const getProvincesData = async () => {
    await axios
      .get(`http://localhost:3000/addressApi/provinces`)
      .then((res) => {
        const provincesList = res.data.map((item) => ({
          ...item,
          label: item.province_name,
          value: JSON.stringify({
            id: item.province_id,
            name: item.province_name,
          }),
        }));
        setProvinces(provincesList);
      });
  };

  useEffect(() => {
    getProvincesData();
  }, []);

  useEffect(() => {
    getCheckoutInfo(checkoutInfo);
  }, [checkoutInfo]);

  const handleSelectProvince = async (value) => {
    const selectedProvince = JSON.parse(value);
    console.log("Select province value: ", JSON.parse(value));
    await axios
      .get(`http://localhost:3000/addressApi/districts/${selectedProvince.id}`)
      .then((res) => {
        const districtsList = res.data.map((item) => ({
          ...item,
          label: item.district_name,
          value: JSON.stringify({
            id: item.district_id,
            name: item.district_name,
          }),
        }));
        setDistricts(districtsList);
        setCheckoutInfo({ ...checkoutInfo, address: selectedProvince.name });
      })
      .catch((err) => console.log(err));
  };

  const handleSelectDistrict = async (value) => {
    const selectedDistrict = JSON.parse(value);
    await axios
      .get(`http://localhost:3000/addressApi/wards/${selectedDistrict.id}`)
      .then((res) => {
        const wardsList = res.data.map((item) => ({
          ...item,
          label: item.ward_name,
          value: JSON.stringify({
            id: item.ward_id,
            name: item.ward_name,
          }),
        }));
        setWards(wardsList);
      })
      .catch((err) => console.log(err));
    const addressArray = checkoutInfo.address.split(",");
    setCheckoutInfo({
      ...checkoutInfo,
      address:
        selectedDistrict.name +
        ", " +
        addressArray[addressArray.length - 1].trim(),
    });
  };

  const handleSelectWard = (value) => {
    const selectedWard = JSON.parse(value);
    const addressArray = checkoutInfo.address.split(",");
    setCheckoutInfo({
      ...checkoutInfo,
      address:
        selectedWard.name +
        ", " +
        addressArray[addressArray.length - 2].trim() +
        ", " +
        addressArray[addressArray.length - 1].trim(),
    });
  };

  const handleEnterDetailedAddress = (e) => {
    const detailedAddress = e.target.value;
    const addressArray = checkoutInfo.address.split(",");
    if (detailedAddress.length === 0)
      setCheckoutInfo({
        ...checkoutInfo,
        address:
          addressArray[addressArray.length - 3].trim() +
          ", " +
          addressArray[addressArray.length - 2].trim() +
          ", " +
          addressArray[addressArray.length - 1].trim(),
      });
    else
      setCheckoutInfo({
        ...checkoutInfo,
        address:
          detailedAddress.replace(/[^\S\r\n]{2,}/, " ").trim() +
          ", " +
          addressArray[addressArray.length - 3].trim() +
          ", " +
          addressArray[addressArray.length - 2].trim() +
          ", " +
          addressArray[addressArray.length - 1].trim(),
      });
  };

  return (
    <div className="w-full flex flex-col items-start gap-4 p-8 rounded-xl text-teal-900 bg-slate-100">
      <p className="font-black text-3xl">CHECKOUT</p>

      <div className="w-full flex flex-col items-center justify-start gap-2">
        <div className="w-full flex items-center justify-start">
          <p className="min-w-fit pr-6">Purchase method:</p>
          <Select
            className="font-montserrat min-w-48 bg-transparent"
            size="small"
            placeholder="Select purchase method..."
            options={[
              {
                label: "Online purchase & Free shipping",
                value: "online",
              },
              {
                label: "Cash & Direct pick-up",
                value: "offline",
              },
            ]}
            onSelect={(value) => {
              console.log("Method: ", value);
              setCheckoutInfo({
                ...checkoutInfo,
                purchaseMethod: value,
              });
              if (value.match("offline")) {
                setCheckoutInfo({
                  ...checkoutInfo,
                  purchaseMethod: value,
                  address: "",
                });
              }
            }}
          />
        </div>

        <div className="w-full flex items-center justify-start">
          <p className="min-w-fit pr-6">Email:</p>
          <Input
            name="email"
            size="small"
            className="font-montserrat bg-transparent"
            placeholder="Enter email..."
            autoComplete="off"
            value={checkoutInfo.contact.email}
            onChange={(e) => {
              setCheckoutInfo({
                ...checkoutInfo,
                contact: {
                  ...checkoutInfo.contact,
                  email: e.target.value,
                },
              });
            }}
          />
        </div>

        <div className="w-full flex items-center justify-start">
          <p className="min-w-fit pr-4">Phone:</p>
          <Input
            name="phone"
            size="small"
            className="font-montserrat bg-transparent"
            placeholder="Enter phone number..."
            autoComplete="off"
            maxLength={12}
            value={checkoutInfo.contact.phone}
            onChange={(e) => {
              setCheckoutInfo({
                ...checkoutInfo,
                contact: {
                  ...checkoutInfo.contact,
                  phone: e.target.value,
                },
              });
            }}
          />
        </div>
        <div
          className={`w-full flex-col items-start justify-start gap-2 ${
            checkoutInfo.purchaseMethod.match("online") ? "flex" : "hidden"
          }`}
        >
          <div className="w-full flex items-center justify-start">
            <p className="min-w-fit pr-4">Address:</p>
            <Input.TextArea
              autoSize
              disabled
              name="address"
              size="small"
              className="font-montserrat bg-transparent"
              placeholder="Select below..."
              value={checkoutInfo.address}
            />
          </div>

          <div className="w-full flex flex-col items-center justify-start gap-2 md:pl-8">
            <div className="w-full flex items-center justify-between">
              <p className="min-w-fit text-xs pr-4">City / Province:</p>
              <Select
                showSearch
                size="small"
                className="font-montserrat bg-transparent"
                placeholder=<p className="pr-8">Select city or province...</p>
                options={provinces}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .normalize()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onSelect={handleSelectProvince}
              />
            </div>

            <div
              className={`w-full flex items-center justify-between ${
                districts.length > 0 ? "inline" : "hidden"
              }`}
            >
              <p className="min-w-fit text-xs pr-4">District:</p>
              <Select
                showSearch
                size="small"
                placeholder=<p className="pr-8">Select district...</p>
                options={districts}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .normalize()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onSelect={handleSelectDistrict}
                className="min-w-48 font-montserrat"
              />
            </div>

            <div
              className={`w-full flex items-center justify-between ${
                wards.length > 0 ? "inline" : "hidden"
              }`}
            >
              <p className="min-w-fit text-xs pr-4">Ward:</p>
              <Select
                showSearch
                size="small"
                placeholder=<p className="pr-8">Select ward...</p>
                options={wards}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .normalize()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onSelect={handleSelectWard}
                className="min-w-48 font-montserrat"
              />
            </div>

            <div
              className={`w-full flex items-center justify-start ${
                wards.length > 0 ? "inline" : "hidden"
              }`}
            >
              <p className="min-w-fit text-xs pr-4">Detailed address:</p>
              <Input
                id="detailed-address"
                size="small"
                className="font-montserrat bg-transparent"
                autoComplete="off"
                placeholder="Enter detailed address (No, Street,...)"
                onBlur={handleEnterDetailedAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
