import React, { useEffect, useState } from "react";
import CartSummary from "../components/cart/CartSummary";
import CartCheckout from "../components/cart/CartCheckout";
import ShoppingCart from "../components/cart/ShoppingCart";
import EmptyCart from "../assets/images/cart/empty-cart.png";
import { Checkbox, message } from "antd";
import { generateNumericCode } from "../assistants/generators";
import axios from "axios";

export default function Cart() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const [cartList, setCartList] = useState(
    sessionStorage.cartList ? JSON.parse(sessionStorage.cartList) : []
  );

  const [checkedList, setCheckedList] = useState([]);
  const [total, setTotal] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({
    contact: {
      email: "",
      phone: "",
    },
    address: "",
    purchaseMethod: "",
  });
  const generatedOrderCode = generateNumericCode(8);

  const [messageApi, contextHolder] = message.useMessage();

  const getTotal = (value) => {
    console.log("Get total: ", value);
    setTotal(value);
  };

  const getCheckedList = (value) => {
    setCheckedList(value);
  };

  const getCheckoutInfo = (value) => {
    console.log("Checkout info: ", value);
    setCheckoutInfo(value);
    setConfirmed(false);
  };

  const getListIsChanged = (value) => {
    if (value) {
      setCartList(
        sessionStorage.cartList ? JSON.parse(sessionStorage.cartList) : []
      );
    }
  };

  const handleConfirm = () => {
    const detailedAddress = document.getElementById("detailed-address").value;
    if (!detailedAddress && checkoutInfo.purchaseMethod.match("online")) {
      messageApi.open({
        key: "emptyDetailedAddress",
        type: "warning",
        content: "Please fulfill your detailed address!",
        duration: 5,
      });
    } else if (
      checkoutInfo.contact.email === "" ||
      checkoutInfo.contact.phone === ""
    ) {
      messageApi.open({
        key: "emptyContact",
        type: "warning",
        content: "Please fulfill your contact information!",
        duration: 5,
      });
    } else if (checkoutInfo.purchaseMethod === "") {
      messageApi.open({
        key: "emptyMethod",
        type: "warning",
        content: "Please select a purchase method!",
        duration: 5,
      });
    } else {
      setConfirmed(!confirmed);
    }
  };

  const handleCompleteOrder = async () => {
    //Check product status
    checkedList.map((item) => {
      axios
        .get(`http://localhost:3000/product/${item.id}`)
        .then((res) => {
          if (res.data.status.toLowerCase() !== "available") {
            messageApi.open({
              key: "unavailableProduct",
              type: "error",
              content:
                "One or more chosen products might have been ordered by someone else. Our apology for this inconvenience. Please try again!",
              duration: 10,
            });
          }
        })
        .catch((err) => console.log(err));
    });

    const createOrderData = {
      user: user.id,
      code: generatedOrderCode,
      total: total,
      contact: checkoutInfo.contact,
      purchaseMethod: checkoutInfo.purchaseMethod,
      address: checkoutInfo.address,
    };
    console.log("CreateOrderData: ", createOrderData);

    await axios
      .post(`http://localhost:3000/order`, createOrderData)
      .then((res) => {
        console.log("Create order result: ", res.data);

        //Create orderItem
        const createdOrderId = res.data.id;
        checkedList.map((item) => {
          const createOrderItemData = {
            product: item.id,
            order: createdOrderId,
            price: item.price,
          };
          console.log("OrderItem Data: ", createOrderItemData);
          axios
            .post(`http://localhost:3000/orderItem`, createOrderItemData)
            .then((res) => {
              console.log("Create orderItem result: ", res.data);
            })
            .catch((err) => console.log(err));
        });

        //Update product status to ORDERED
        checkedList.map((item) => {
          axios
            .patch(`http://localhost:3000/product/${item.id}`, {
              status: "ORDERED",
            })
            .then((res) => {
              console.log("Update product status: ", res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        });

        messageApi.open({
          key: "createOrder",
          type: "success",
          content: "Your order has been successfully placed.",
          duration: 5,
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          key: "createOrder",
          type: "error",
          content: "Failed to order. Please try again later!",
          duration: 5,
        });
      });

    //Set checked list to empty
    setCheckedList([]);

    //Remove ordered items from cart
    let tempCart = [];
    checkedList.map((item) => {
      tempCart = cartList.filter((i) => i.id !== item.id);
    });
    sessionStorage.setItem("cartList", JSON.stringify(tempCart));
    setCartList(JSON.parse(sessionStorage.cartList));
  };

  if (cartList.length === 0) {
    return (
      <div className="w-full font-montserrat flex flex-col items-center justify-center gap-4 font-semibold py-16">
        {contextHolder}
        <img src={EmptyCart} alt="" className="w-36 -z-10" />
        <p className="text-lg">NO ITEMS IN CART</p>
        <p className="text-xs opacity-80 text-gray-500">
          <button
            onClick={() => window.location.replace("/products")}
            className="underline bold hover:text-black"
          >
            CONTINUE SHOPPING
          </button>
        </p>
      </div>
    );
  } else
    return (
      <div className="w-full flex items-start justify-center gap-8 px-16">
        {contextHolder}
        <div className="w-2/3">
          <ShoppingCart
            list={cartList}
            getCheckedList={getCheckedList}
            getListIsChanged={getListIsChanged}
          />
        </div>
        <div className="w-1/3 flex flex-col items-center justify-start gap-8">
          <CartSummary list={checkedList} getTotal={getTotal} />
          <CartCheckout getCheckoutInfo={getCheckoutInfo} />

          <div
            onClick={handleConfirm}
            className="flex items-start cursor-pointer gap-2"
          >
            <Checkbox
              disabled={
                checkoutInfo.contact.email === "" ||
                checkoutInfo.contact.phone === "" ||
                checkoutInfo.purchaseMethod === ""
              }
              checked={confirmed}
              className="mt-[3px]"
            />
            <p>
              By checking, you confirm that all of the information filled above
              is YOURS and comprehensively accurate.
            </p>
          </div>

          <button
            disabled={checkedList.length === 0 || !confirmed}
            onClick={handleCompleteOrder}
            className="w-full bg-teal-700 hover:bg-teal-900 py-2 rounded-lg text-white font-bold disabled:bg-gray-300"
          >
            COMPLETE
          </button>
        </div>
      </div>
    );
}
