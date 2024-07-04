import React from "react";
import { Modal } from "antd";

export default function ProductCriteriaModal({
  criteria,
  open,
  setOpen,
}: {
  criteria: string[];
  open: boolean;
  setOpen: Function;
}) {
  const baseCriteria: string[] = [
    "Price inappropriateness",
    "Statistics or information inaccuracy",
    "Incompatibility image with the product",
    "Difference between delivered and illustrative product",
  ];
  return (
    <Modal
      title={<p className="text-sky-800 font-bold">Misconducted criteria</p>}
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen("");
      }}
      footer={null}
    >
      <div className="relative w-full flex flex-col items-start justify-normal gap-2 p-4">
        {baseCriteria.map((item: string, index: number) => {
          const checked = criteria.some((i: string) => i === item);
          return (
            <p
              className={`font-sans duration-150 flex items-center gap-2 ${
                checked
                  ? "font-bold text-red-800 hover:text-orange-500 cursor-pointer"
                  : "text-xs font-extralight opacity-70"
              }`}
            >
              {index + 1}. {item}{" "}
              {checked && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width={16}
                    height={16}
                    fill="currentColor"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                  </svg>
                </>
              )}
            </p>
          );
        })}
        <p className="absolute top-0 right-16 font-semibold text-red-700">
          {criteria.length}/{baseCriteria.length}
        </p>
      </div>
    </Modal>
  );
}
