"use client";
import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AdminSignInForm({ modalOpen }: { modalOpen: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleSignIn = async () => {
    if (email.length === 0 || password.length === 0) {
      message.warning({
        key: "emptyInput",
        content: "Please enter both your email and password!",
        duration: 5,
      });
      return;
    }
    setIsLoading(true);
    await axios
      .post("http://localhost:3000/auth/login", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        const account = jwtDecode(res.data.metadata) as any;
        await axios
          .patch(`http://localhost:3000/auth/active_status/${account.id}`)
          .catch((err) => console.log(err));
        setTimeout(() => {
          if (account.role === "admin") {        
            sessionStorage.setItem("adminSignIn", JSON.stringify(account));
            window.location.reload(); 
          } else if (account.role === "appraiser") {
            sessionStorage.setItem("appraiserSignIn", JSON.stringify(account));
            window.location.href = "/user/appraisers"; 
          } else {
            message.open({
              type: "error",
              content: "Incorrect credentials. Please try again!",
              duration: 5,
            });
          }
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          message.open({
            type: "error",
            content: "Incorrect credentials. Please try again!",
            duration: 5,
          });
          setIsLoading(false);
        }, 2000);
      });
  };

  return (
    <Modal
      open={modalOpen}
      maskClosable={false}
      closable={false}
      footer={null}
      classNames={{
        mask: "!bg-gray-800",
      }}
    >
      {contextHolder}
      <p className="w-full text-center text-[200%] font-bold">
        ADMINISTRATOR SIGN IN
      </p>
      <Input
        size="large"
        placeholder="Email"
        autoComplete={"off"}
        className="rounded-lg border-gray-300 mt-6"
        prefix={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
          </svg>
        }
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input.Password
        size="large"
        placeholder="Password"
        autoComplete="off"
        className="mt-2"
        prefix={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M10.7577 11.8281L18.6066 3.97919L20.0208 5.3934L18.6066 6.80761L21.0815 9.28249L19.6673 10.6967L17.1924 8.22183L15.7782 9.63604L17.8995 11.7574L16.4853 13.1716L14.364 11.0503L12.1719 13.2423C13.4581 15.1837 13.246 17.8251 11.5355 19.5355C9.58291 21.4882 6.41709 21.4882 4.46447 19.5355C2.51184 17.5829 2.51184 14.4171 4.46447 12.4645C6.17493 10.754 8.81633 10.5419 10.7577 11.8281ZM10.1213 18.1213C11.2929 16.9497 11.2929 15.0503 10.1213 13.8787C8.94975 12.7071 7.05025 12.7071 5.87868 13.8787C4.70711 15.0503 4.70711 16.9497 5.87868 18.1213C7.05025 19.2929 8.94975 19.2929 10.1213 18.1213Z"></path>
          </svg>
        }
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onPressEnter={() => {
          handleSignIn();
        }}
      />

      <button
        onClick={handleSignIn}
        className="w-full py-2 bg-sky-500 text-lg rounded-full text-white font-bold mt-4 hover:bg-sky-800"
      >
        {isLoading ? (
          <svg
            width="24"
            height="24"
            stroke="#FFF"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <g>
              <circle
                cx="12"
                cy="12"
                r="9.5"
                fill="none"
                stroke-width="3"
                stroke-linecap="round"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="1.5s"
                  calcMode="spline"
                  values="0 150;42 150;42 150;42 150"
                  keyTimes="0;0.475;0.95;1"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  dur="1.5s"
                  calcMode="spline"
                  values="0;-16;-59;-59"
                  keyTimes="0;0.475;0.95;1"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                  repeatCount="indefinite"
                />
              </circle>
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="2s"
                values="0 12 12;360 12 12"
                repeatCount="indefinite"
              />
            </g>
          </svg>
        ) : (
          "SIGN IN"
        )}
      </button>
    </Modal>
  );
}
