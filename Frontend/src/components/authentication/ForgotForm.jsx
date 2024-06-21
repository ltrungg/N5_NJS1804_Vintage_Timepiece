import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import spinner from "../spinner/spinner.svg";
import darkSpinner from "../spinner/dark_spinner.svg";
import emailjs from "@emailjs/browser";
import { generateNumericAndUppercaseCode } from "../../assistants/generators";

export function EmailForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const generatedCode = generateNumericAndUppercaseCode(6, "");
  const formRef = useRef();

  const sendEmail = () => {
    emailjs
      .sendForm("service_1elzamk", "template_zx4dl7d", formRef.current, {
        publicKey: "CBPvKWvVGwvlXnu4p",
      })
      .then(
        () => {
          console.log("SUCCESSFULLY SENT VERIFICATION CODE TO EMAIL.");
        },
        (error) => {
          console.log("FAILED TO SEND EMAIL!", error.text);
        }
      );
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleChange = (e) => {
    setCurrentEmail(e.target.value);
    if (!validateEmail(e.target.value)) setIsValidEmail(false);
    else setIsValidEmail(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendEmail();
    setTimeout(() => {
      props.email(currentEmail);
      props.code(generatedCode);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center gap-2 mt-8">
      <p className="font-medium font-title text-sky-800">
        Enter the email address that you have problem trying to sign in.
      </p>
      <form ref={formRef} onSubmit={submitForm}>
        <input type="hidden" name="code" value={generatedCode} />
        <div className="w-96 flex flex-col items-start justify-center gap-2">
          <Input
            name="email"
            size="large"
            placeholder="Your email address"
            className="font-montserrat"
            onChange={handleChange}
            onPressEnter={submitForm}
          />
        </div>
        <div
          className={`text-red-600 text-xs font-thin ${
            validateEmail(currentEmail) || currentEmail.length === 0
              ? "invisible"
              : "visible"
          }`}
        >
          Invalid email address
        </div>
        <button
          type="submit"
          disabled={!isValidEmail}
          className="w-full mt-4 font-bold text-md text-white bg-sky-600 py-2 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <img src={spinner} alt="" className="mx-auto" />
          ) : (
            "CONFIRM"
          )}
        </button>
      </form>
    </div>
  );
}

export function CodeForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWrongCode, setIsWrongCode] = useState(false);

  const onChange = (code) => {
    setIsLoading(true);
    console.log("CODE ENTERED:", code);
    if (code === props.generatedCode) {
      setTimeout(() => {
        props.codeValidated(true);
        setIsLoading(false);
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

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <p className="text-[150%] font-medium font-title text-sky-800">
        We have just send you a verification code to your email. Please check
        your email to get it.
      </p>
      <div className="w-96 flex flex-col items-center justify-center gap-4">
        <Input.OTP
          autoFocus
          size="large"
          status={isWrongCode ? "error" : ""}
          formatter={(str) => str.toUpperCase()}
          {...sharedProps}
          onFocus={() => setIsWrongCode(false)}
        />
        <p className="font-thin">
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
  );
}

export function ResetPasswordForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    console.log("New password: ", newPassword);
    if (newPassword.length > 0) {
      if (newPassword.length < 8 || newPassword.length > 20) {
        setPasswordError("Password should contain within 8 to 20 characters");
      } else if (
        !newPassword.match(confirmPassword) &&
        confirmPassword.length > 0
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [newPassword]);

  useEffect(() => {
    console.log("Confirm password: ", confirmPassword);
    if (confirmPassword.length > 0) {
      if (!confirmPassword.match(newPassword)) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  }, [confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Email: ", props.email);
    console.log("New password: ", newPassword);
    //PATCH
    const account = {
      email: props.email,
      password: newPassword,
    };
    sessionStorage.setItem("passwordReset", JSON.stringify(account));
    setTimeout(() => {
      setIsLoading(false);
      window.location.replace("/signin");
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center gap-2 mt-8">
      <form onSubmit={handleSubmit}>
        <p className="font-medium font-title text-sky-800">
          Enter your new password
        </p>
        <div className="w-96 flex flex-col items-start justify-center gap-2">
          <Input.Password
            size="large"
            placeholder="New password"
            className="font-montserrat"
            onBlur={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <Input.Password
            size="large"
            placeholder="Confirm new password"
            className="font-montserrat"
            onBlur={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div
          className={`text-red-600 text-xs font-thin ${
            passwordError.length > 0 ? "visible" : "invisible"
          }`}
        >
          {passwordError}
        </div>
        <button
          type="submit"
          disabled={
            passwordError.length > 0 || !newPassword || !confirmPassword
          }
          className="w-full mt-4 font-bold text-md text-white bg-sky-600 hover:bg-sky-700 py-2 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <img src={spinner} alt="" className="mx-auto" />
          ) : (
            "CONFIRM"
          )}
        </button>
      </form>
    </div>
  );
}
