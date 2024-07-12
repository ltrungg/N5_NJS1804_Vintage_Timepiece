import { Input, message, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";

export default function ReportModal({ on, object, open, setOpen }) {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const [reportList, setReportList] = useState([]);
  const [note, setNote] = useState("");

  const handleAddStandard = (value) => {
    let temp = [...reportList];
    if (temp.some((item) => item === value)) {
      const removed = temp.filter((item) => item !== value);
      setReportList(removed);
    } else {
      temp.push(value);
      setReportList(temp);
    }
  };

  const checkChosen = (value) => {
    return reportList.some((item) => item === value);
  };

  const handleSubmitReport = async () => {
    await axios
      .post("http://localhost:3000/report", {
        account: user.id,
        on: on,
        reportedId: object.id,
        criteria: reportList,
        note: note,
      })
      .then((res) => {
        console.log(res.data);
        message.success({
          key: "report",
          content:
            "Your report has been recorded. Thank you for your dedication to improve the service.",
          duration: 8,
        });
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        message.err({
          key: "report",
          content: "Failed to report. Please try again!",
          duration: 8,
        });
        setOpen(false);
      });
  };

  return (
    <Modal
      title=<div className="text-semibold max-w-96 text-nowrap text-ellipsis overflow-hidden">
        Report {on === "product" ? object.name : object.username}
      </div>
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
      className="font-montserrat"
    >
      {on === "user" ? (
        <div className="flex flex-col gap-8">
          <p>Please tell us which of these standards this user violates:</p>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <button
                onClick={() => handleAddStandard("Pretending to be someone")}
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen("Pretending to be someone")
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Pretending to be someone
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() =>
                  handleAddStandard(
                    "Selling fake or not similar to the described products"
                  )
                }
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen(
                    "Selling fake or not similar to the described products"
                  )
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Selling fake or not similar to the described products
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => handleAddStandard("Inappropriate name")}
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen("Inappropriate name")
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Inappropriate name
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => handleAddStandard("Harassment or bullying")}
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen("Harassment or bullying")
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Harassment or bullying
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <p>Please tell us which of these standards this product violates:</p>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <button
                onClick={() => handleAddStandard("Price inappropriateness")}
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen("Price inappropriateness")
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Price inappropriateness
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() =>
                  handleAddStandard("Statistics or information inaccuracy")
                }
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen("Statistics or information inaccuracy")
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Statistics or information inaccuracy
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() =>
                  handleAddStandard("Incompatibility image with the product")
                }
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen("Incompatibility image with the product")
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Incompatibility image with the product
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() =>
                  handleAddStandard(
                    "Difference between delivered and illustrative product"
                  )
                }
                className={`text-start py-2 px-4 rounded-[30px] border border-gray-400 duration-200 ${
                  checkChosen(
                    "Difference between delivered and illustrative product"
                  )
                    ? "bg-sky-800 text-white hover:bg-sky-900"
                    : "bg-white text-black hover:bg-slate-100"
                }`}
              >
                Difference between delivered and illustrative product
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mt-4">
        <Input.TextArea
          autoSize={{
            minRows: 4,
            maxRows: 10,
          }}
          placeholder={`Tell us more about how this ${
            on === "user" ? "user" : "product"
          } dissatisfied you...`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="font-montserrat"
        />
      </div>

      <div className="w-full flex items-center justify-end gap-2 mt-8">
        <button
          onClick={() => setOpen(false)}
          className="px-4 hover:underline rounded-[30px] duration-200"
        >
          Cancel
        </button>
        <button
          disabled={reportList.length === 0}
          onClick={handleSubmitReport}
          className="px-8 py-2 bg-sky-600 hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-300 text-white rounded-[30px] font-semibold duration-200"
        >
          Send
        </button>
      </div>
    </Modal>
  );
}
