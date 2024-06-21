import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Form, Input, message, Modal } from "antd";
import spinner from "../spinner/spinner.svg";
import darkSpinner from "../spinner/dark_spinner.svg";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { generateNumericAndUppercaseCode } from "../../assistants/generators";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });
  const [dataError, setDataError] = useState({
    email: false,
    password: false,
    username: false,
    phone: false,
  });
  const [isWrongCode, setIsWrongCode] = useState(false);

  const [generatedCode, setGeneratedCode] = useState(
    generateNumericAndUppercaseCode(6, "")
  );
  const formRef = useRef();

  const [messageApi, contextHolder] = message.useMessage();

  const sendEmail = () => {
    emailjs
      .sendForm("service_1elzamk", "template_zx4dl7d", formRef.current, {
        publicKey: "CBPvKWvVGwvlXnu4p",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED TO SEND EMAIL", error.text);
        }
      );
  };

  useEffect(() => {
    if (accountData.email.length === 0) {
      setDataError({
        ...dataError,
        email: false,
      });
      return;
    }

    if (!accountData.email.match(/\S+@\S+\.\S+/)) {
      setDataError({
        ...dataError,
        email: true,
      });
    } else {
      setDataError({
        ...dataError,
        email: false,
      });
    }
  }, [accountData.email]);

  useEffect(() => {
    if (accountData.password.length === 0) {
      setDataError({
        ...dataError,
        password: false,
      });
      return;
    }

    if (accountData.password.length < 8 || accountData.password.length > 20) {
      setDataError({
        ...dataError,
        password: true,
      });
    } else {
      setDataError({
        ...dataError,
        password: false,
      });
    }
  }, [accountData.password]);

  useEffect(() => {
    if (accountData.phone.length === 0) {
      setDataError({
        ...dataError,
        phone: false,
      });
      return;
    }

    if (
      accountData.phone.length < 9 ||
      accountData.phone.length > 11 ||
      (accountData.length !== 0 && !accountData.phone.match(/^\d+$/))
    ) {
      setDataError({
        ...dataError,
        phone: true,
      });
    } else {
      setDataError({
        ...dataError,
        phone: false,
      });
    }
  }, [accountData.phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      dataError.email ||
      dataError.password ||
      dataError.phone ||
      dataError.username
    ) {
      console.log("ERROR: ", dataError);
      return;
    }
    console.log("VERIFY CODE: ", generatedCode);
    console.log(accountData);
    console.log(formRef.current);
    sendEmail();
    setModalOpen(true);
  };

  const onChange = (code) => {
    setIsLoading(true);
    console.log("CODE ENTERED:", code);
    console.log("CODE GENERATED: ", generatedCode);
    if (code === generatedCode) {
      setTimeout(() => {
        register();
        setIsLoading(false);
        setModalOpen(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsWrongCode(true);
        setIsLoading(false);
      }, 2000);
    }
  };
  const sharedProps = {
    onChange,
  };

  const register = async () => {
    await axios
      .post("http://localhost:3000/auth/create-account", {
        email: accountData.email,
        password: accountData.password,
        username: accountData.username,
        phone: accountData.phone,
      })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("register", JSON.stringify(accountData));
        setTimeout(() => {
          setIsLoading(false);
          window.location.replace("/signin");
        }, 2000);
      })
      .catch((err) => {
        console.log("Failed to sign up: ", err);
        if (err.response.status === 400) {
          message.open({
            type: "error",
            content:
              "This email has already been used. Please try logging in or using another email!",
            duration: 5,
          });
        } else {
          message.open({
            type: "error",
            content: "Failed to create a new account",
            duration: 5,
          });
        }
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 pt-16">
      {contextHolder}
      <p className="text-[250%] font-bold font-title text-sky-800">SIGN UP</p>
      <div className="w-1/2 xl:w-1/3">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          ref={formRef}
          className="w-full flex flex-col justify-center gap-2"
        >
          <div className="flex gap-4">
            <div className="flex flex-col justify-center items-end gap-10">
              <p>
                <span className="text-red-600">*</span> Email:
              </p>
              <p>
                <span className="text-red-600">*</span> Password:
              </p>
              <p>
                <span className="text-red-600">*</span> Username:
              </p>
              <p>
                <span className="text-red-600">*</span> Phone:
              </p>
            </div>

            <div className="w-2/3 flex flex-col items-center gap-6">
              <input type="hidden" name="code" value={generatedCode} />
              <div className="relative w-full flex flex-col items-start gap-1">
                <Input
                  name="email"
                  required
                  value={accountData.email}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      email: e.target.value,
                    });
                  }}
                />
                <div
                  className={`absolute top-10 left-0 text-xs font-light text-red-500 ${
                    dataError.email ? "visible" : "invisible"
                  }`}
                >
                  Invalid email address!
                </div>
              </div>

              <div className="relative w-full flex flex-col items-start gap-1">
                <Input.Password
                  size="large"
                  type="password"
                  name="password"
                  required
                  value={accountData.password}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      password: e.target.value,
                    });
                  }}
                />
                <div
                  className={`absolute top-10 left-0 text-xs font-light text-red-500 ${
                    dataError.password ? "visible" : "invisible"
                  }`}
                >
                  Password should contain 8 to 20 characters!
                </div>
              </div>

              <div className="relative w-full flex flex-col items-start gap-1">
                <Input
                  type="text"
                  name="username"
                  required
                  value={accountData.username}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      username: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="relative w-full flex flex-col items-start gap-1">
                <Input
                  type="text"
                  name="phone"
                  required
                  value={accountData.phone}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      phone: e.target.value,
                    });
                  }}
                />
                <div
                  className={`absolute top-10 left-0 text-xs font-light text-red-500 ${
                    dataError.phone ? "visible" : "invisible"
                  }`}
                >
                  Invalid phone number!
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-start justify-center gap-2 mt-2">
            <Checkbox
              className="flex flex-row mt-[2px]"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <p
              className="font-montserrat font-light cursor-pointer"
              onClick={() => {
                if (
                  accountData.email === "" ||
                  accountData.password === "" ||
                  accountData.username === "" ||
                  accountData.phone === ""
                ) {
                  messageApi.open({
                    key: "emptyData",
                    type: "warning",
                    content: "Please fulfill all of the boxes above!",
                    duration: 5,
                  });
                } else {
                  setChecked(!checked);
                }
              }}
            >
              By ticking, you are confirming that you have guaranteed the
              authenticity of the information you entered.
            </p>
          </div>

          <button
            type="submit"
            disabled={!checked}
            className="w-96 mt-4 mx-auto font-bold text-xl text-white bg-sky-600 hover:bg-sky-700 py-2 px-16 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <img src={spinner} alt="" className="mx-auto" />
            ) : (
              "SIGN UP"
            )}
          </button>
        </form>
        <Modal
          onCancel={() => {
            setModalOpen(false);
          }}
          title="Email verification"
          open={modalOpen}
          footer={null}
        >
          <div className="w-full flex flex-col items-center justify-center gap-8">
            <p className="text-[150%] font-medium font-title text-sky-800">
              We have just send you a verification code to your email. Please
              check your email to get it.
            </p>
            <div className="w-96 flex flex-col items-center justify-center gap-4">
              <Input.OTP
                autoFocus
                size="large"
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
              />
              <p className="font-thin mt-4">
                Couldn't find the code?&ensp;
                <span className="font-medium text-sky-600 cursor-pointer hover:underline">
                  Send again
                </span>
              </p>
              <img
                src={darkSpinner}
                alt=""
                className={`mx-auto ${isLoading ? "visible" : "invisible"}`}
              />
              <div
                className={`text-red-600 text-xs font-thin ${
                  isWrongCode ? "visible" : "invisible"
                }`}
              >
                Invalid code! Please double check and try again.
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
