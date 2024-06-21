import React, { useEffect, useState } from "react";
import { Checkbox, Divider, Input, Modal, message } from "antd";
import { Link } from "react-router-dom";
import { EmailForm, CodeForm, ResetPasswordForm } from "./ForgotForm";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";
import spinner from "../../components/spinner/spinner.svg";
import Loading from "../loading/Loading";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoSigningIn, setIsAutoSigningIn] = useState(false);
  const [rememberSignIn, setRememberSignIn] = useState(true);
  const [forgotFormOpen, setForgotFormOpen] = useState(false);
  const [resetPasswordFormOpen, setResetPasswordFormOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const [cookies, setCookie, removeCookie] = useCookies(["signInUser"]);

  const handleRedirect = () => {
    const passwordResetAccount = sessionStorage.passwordReset;
    if (passwordResetAccount) {
      const object = JSON.parse(passwordResetAccount);
      console.log("DEFAULT ACCOUNT: ", object);
      setSignInEmail(object.email);
      messageApi.open({
        type: "success",
        content: "Your password has been reset. Please sign in to continue.",
        duration: 5,
      });
      sessionStorage.removeItem("passwordReset");
    }

    const registeredAccount = sessionStorage.register;
    if (registeredAccount) {
      const object = JSON.parse(registeredAccount);
      console.log("DEFAULT ACCOUNT: ", object);
      setSignInEmail(object.email);
      messageApi.open({
        type: "success",
        content: "Successfully registered. Please sign in to continue.",
        duration: 5,
      });
      sessionStorage.removeItem("register");
    }
  };

  const checkSignInCookie = () => {
    if (cookies.signInUser) {
      setIsAutoSigningIn(true);
      console.log("User cookie: ", cookies.signInUser);
      sessionStorage.setItem("signInUser", JSON.stringify(cookies.signInUser));
      setTimeout(() => {
        setIsAutoSigningIn(false);
        window.location.replace("/");
      }, 2000);
    }
  };

  useEffect(() => {
    handleRedirect();
    checkSignInCookie();
  }, []);

  const getEmail = (value) => {
    if (value) {
      console.log("GET EMAIL: ", value);
      setCurrentEmail(value);
      setEmailSent(true);
    }
  };

  const getGeneratedCode = (value) => {
    if (value) {
      console.log("GENERATED CODE: ", value);
      setGeneratedCode(value);
    }
  };

  const handleGetCodeStatus = (value) => {
    console.log("Code status: ", value);
    if (value) {
      setForgotFormOpen(false);
      setResetPasswordFormOpen(true);
    }
  };

  const handleSignIn = async () => {
    if (signInEmail.length > 0 && signInPassword.length > 0) {
      setIsLoading(true);
      console.log("Sign in account: " + signInEmail + " " + signInPassword);
      await axios
        .post("http://localhost:3000/auth/login", {
          email: signInEmail,
          password: signInPassword,
        })
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            const account = jwtDecode(res.data.metadata);
            sessionStorage.setItem("signInUser", JSON.stringify(account));
            if (rememberSignIn) {
              setCookie("signInUser", JSON.stringify(account));
            } else {
              removeCookie("signInUser");
            }
            messageApi.open({
              key: "signInStatus",
              type: "success",
              content: "Successfully signed in",
              duration: 5,
            });
            setIsLoading(false);
            window.location.replace("/");
          }, 2000);
        })
        .catch((err) => {
          console.log("Sign in failed: ", err);
          messageApi.open({
            key: "signInStatus",
            type: "error",
            content: "Incorrect credentials. Please try again.",
            duration: 5,
          });
          setIsLoading(false);
        });
    } else {
      messageApi.open({
        key: "signInStatus",
        type: "warning",
        content: "Please fulfill your email and password!",
        duration: 5,
      });
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    const googleLoginData = jwtDecode(credentialResponse.credential);
    console.log("Google login: ", googleLoginData);
    console.log(
      "GET: ",
      `http://localhost:3000/auth/email/${googleLoginData.email}`
    );
    await axios
      .get(`http://localhost:3000/auth/email/${googleLoginData.email}`)
      .then((res) => {
        console.log("ACCOUNT: ", res.data);
        const found = res.data;
        if (found.email === googleLoginData.email) {
          sessionStorage.setItem("signInUser", JSON.stringify(found));
          window.location.replace("/");
        } else {
          messageApi.open({
            key: "signInStatus",
            type: "error",
            content: "Failed to sign in with Google. Please try again!",
            duration: 5,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        const registerData = {
          email: googleLoginData.email,
          password: "12345678",
          username: googleLoginData.name,
          phone: "",
        };
        axios
          .post("http://localhost:3000/auth/create-account", registerData)
          .then((res) => {
            console.log("Register for new google account: ", res.data);
            sessionStorage.setItem(
              "signInUser",
              JSON.stringify(res.data.metadata)
            );
            window.location.replace("/");
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 pt-16">
      {contextHolder}
      {isAutoSigningIn ? <Loading /> : null}
      <p className="text-[250%] font-bold font-title text-sky-800">SIGN IN</p>
      <div className="w-96 flex flex-col items-center justify-center gap-2">
        <Input
          size="large"
          placeholder="Email"
          value={signInEmail}
          onChange={(e) => {
            setSignInEmail(e.target.value);
          }}
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
        />
        <Input.Password
          size="large"
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
          placeholder="Password"
          value={signInPassword}
          onChange={(e) => {
            setSignInPassword(e.target.value);
          }}
          onPressEnter={() => {
            handleSignIn();
          }}
        />
        <div className="w-full flex items-center justify-between">
          <Checkbox
            onChange={() => {
              setRememberSignIn(!rememberSignIn);
            }}
            defaultChecked={rememberSignIn}
            className="font-montserrat"
          >
            Keep me signed in
          </Checkbox>
          <button
            onClick={() => {
              setForgotFormOpen(true);
            }}
            className="min-w-fit text-sm text-sky-600 font-semibold mt-2 hover:text-sky-800"
          >
            Forgot your password?
          </button>
        </div>
        <button
          onClick={handleSignIn}
          className="w-96 mt-4 font-bold text-xl text-white bg-sky-600 hover:bg-sky-700 py-2 px-16 rounded-full"
        >
          {isLoading ? (
            <img src={spinner} alt="" className="mx-auto" />
          ) : (
            "SIGN IN"
          )}
        </button>
        <Divider>
          <p className="flex flex-row gap-1 text-gray-400 text-xs font-light">
            or sign in with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
            </svg>
          </p>
        </Divider>
        <GoogleLogin
          locale="en"
          onSuccess={onGoogleSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <p className="mt-4 font-light text-sm">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="font-semibold text-sky-600 hover:text-sky-800 underline cursor-pointer"
          >
            Sign up now
          </Link>
        </p>
      </div>
      <Modal
        onCancel={() => {
          setForgotFormOpen(false);
        }}
        title="Password Recovery"
        open={forgotFormOpen}
        footer={null}
      >
        {emailSent ? (
          <CodeForm
            generatedCode={generatedCode}
            codeValidated={handleGetCodeStatus}
          />
        ) : (
          <EmailForm email={getEmail} code={getGeneratedCode} />
        )}
      </Modal>
      <Modal
        maskClosable={false}
        onCancel={() => {
          setEmailSent(false);
          setResetPasswordFormOpen(false);
        }}
        title="Password Recovery"
        open={resetPasswordFormOpen}
        footer={null}
      >
        <ResetPasswordForm email={currentEmail} />
      </Modal>
    </div>
  );
}
