"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./style.css";
import { Avatar, Image, message } from "antd";
import ProductInformation from "../timepieces/ProductInformation";
import CurrencySplitter from "@/assistants/currencySpliter";
import ConfirmModal from "../modals/ConfirmModal";
import dateFormat from "@/assistants/date.format";

export default function SellerRequestListTable({
  list,
  getUpdatedStatus,
}: {
  list: any[];
  getUpdatedStatus: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isShowingProductDetails, setIsShowingProductDetails] = useState("");
  const [isApprovingOne, setIsApprovingOne] = useState("");
  const [isRejectingOne, setIsRejectingOne] = useState("");
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [isRejectingAll, setIsRejectingAll] = useState(false);

  const solveRequest = async (request: any, type: string) => {
    if (type === "reject") {
      await axios
        .patch(`http://localhost:3000/product/${request.product.id}`, {
          status: request.type === "create" ? "CANCELED" : "AVAILABLE",
        })
        .then((res) => {
          return;
        })
        .catch((err) => console.log(err));
      await axios
        .patch(`http://localhost:3000/sellerRequest/${request.id}`, {
          status: "rejected",
        })
        .then((res) => {
          message.success({
            key: "solved",
            content: "Successfully rejected request.",
            duration: 5,
          });
          getUpdatedStatus(true);
        })
        .catch((err) => console.log(err));
    } else {
      switch (request.type) {
        case "create": {
          await axios
            .patch(`http://localhost:3000/product/${request.product.id}`, {
              status: "AVAILABLE",
            })
            .then((res) => {
              return;
            })
            .catch((err) => console.log(err));
          break;
        }
        case "delete": {
          await axios
            .patch(`http://localhost:3000/product/${request.product.id}`, {
              status: "CANCELED",
            })
            .then((res) => {
              return;
            })
            .catch((err) => console.log(err));
          break;
        }
        case "update": {
          await axios
            .patch(
              `http://localhost:3000/product/${request.product.id}`,
              Object.hasOwn(request.update, "price")
                ? { price: request.update.price, status: "AVAILABLE" }
                : { status: "SOLD" }
            )
            .then((res) => {
              return;
            })
            .catch((err) => console.log(err));
          break;
        }
      }
      await axios
        .patch(`http://localhost:3000/sellerRequest/${request.id}`, {
          status: "approved",
        })
        .then((res) => {
          message.success({
            key: "solved",
            content: "Successfully approved request.",
            duration: 5,
          });
          getUpdatedStatus(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSolveRequest = async (value: any) => {
    console.log("Approve: ", value);
    if (Array.isArray(value.object)) {
      value.object.map(async (item: any) => {
        await solveRequest(item, value.action);
      });
    } else await solveRequest(value.object, value.action);
  };

  const columns = [
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Requester
        </p>
      ),
      cell: (row: any) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar src={row.account.avatar} alt="" size={40} />
            <p>{row.account.username}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Product
        </p>
      ),
      cell: (row: any) => {
        return (
          <>
            <div
              onClick={() => setIsShowingProductDetails(row.id)}
              className="flex items-center gap-2 py-2 cursor-pointer hover:underline"
            >
              <Image
                src={row.product?.image}
                alt=""
                width={64}
                className="rounded-full"
                preview={false}
              />
              <p>{row.product?.name}</p>
            </div>
            <ProductInformation
              product={row.product}
              open={isShowingProductDetails === row.id}
              setOpen={setIsShowingProductDetails}
            />
          </>
        );
      },
      sortable: true,
      grow: 2,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Created date
        </p>
      ),
      cell: (row: any) => (
        <p className="">{dateFormat(row.createdAt, "HH:MM dd/mm/yyyy")}</p>
      ),
      sortable: true,
      sortFunction: (a: any, b: any) => {
        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
      },
      grow: 1,
    },

    {
      name: <p className="mx-auto font-semibold text-tremor-default">Status</p>,
      cell: (row: any) => {
        if (row.status === "approved") {
          return (
            <span className="mx-auto w-24 p-2 rounded-xl bg-green-500 hover:bg-green-600 text-center text-white text-nowrap font-semibold">
              APPROVED
            </span>
          );
        } else if (row.status === "pending") {
          return (
            <span className="mx-auto w-24 p-2 rounded-xl bg-gray-500 hover:bg-gray-600 text-center text-white text-nowrap font-semibold">
              PENDING
            </span>
          );
        } else {
          return (
            <span className="mx-auto w-24 p-2 rounded-xl bg-red-500 hover:bg-red-600 text-center text-white text-nowrap font-semibold">
              REJECTED
            </span>
          );
        }
      },
      sortable: true,
      sortFunction: (a: any, b: any) => {
        const ordering: any = { pending: 0, approved: 1, rejected: 2 };
        return (
          ordering[a.status] - ordering[b.status] ||
          new Date(a.updatedAt) < new Date(b.updatedAt)
        );
      },
      grow: 1,
    },
    {
      name: (
        <p className="w-full font-semibold text-tremor-default">
          Request details
        </p>
      ),
      cell: (row: any) => {
        switch (row.type) {
          case "create": {
            return (
              <div className="font-semibold text-green-500">
                {row.details ? row.details : ""}
              </div>
            );
          }
          case "update": {
            if (Object.hasOwn(row.update, "price"))
              return (
                <div className="font-semibold text-sky-500">
                  <p className="pb-2">{row.details}</p>
                </div>
              );
            else
              return (
                <div className="font-semibold text-amber-500">
                  {row.details}
                </div>
              );
          }
          case "delete": {
            return (
              <div className="font-semibold text-red-500">{row.details}</div>
            );
          }
        }
      },
      sortable: true,
      grow: 1,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Actions
        </p>
      ),
      cell: (row: any) => {
        if (row.status !== "pending")
          return (
            <p className="w-full text-center font-light">
              ACTION MADE AT {dateFormat(row.updatedAt, "HH:MM dd/mm/yyyy")}
            </p>
          );
        // else
        //   return (
        //     <div className="w-full flex flex-row gap-2 items-center justify-center">
        //       <button
        //         onClick={() => setIsApprovingOne(row.id)}
        //         className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-800 text-white font-semibold text-nowrap"
        //       >
        //         Approve
        //       </button>
        //       <button
        //         onClick={() => setIsRejectingOne(row.id)}
        //         className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-800 text-white font-semibold text-nowrap"
        //       >
        //         Reject
        //       </button>
        //       <ConfirmModal
        //         action="approve"
        //         object={row}
        //         open={isApprovingOne === row.id}
        //         setOpen={setIsApprovingOne}
        //         getConfirm={handleSolveRequest}
        //       />
        //       <ConfirmModal
        //         action="reject"
        //         object={row}
        //         open={isRejectingOne === row.id}
        //         setOpen={setIsRejectingOne}
        //         getConfirm={handleSolveRequest}
        //       />
        //     </div>
        //   );
      },
      grow: 1,
    },
  ];

  const handleChange = ({ selectedRows }: { selectedRows: any }) => {
    setSelectedRows(selectedRows);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="h-16 p-4 flex items-center justify-between">
          {selectedRows.length > 0 ? (
            <>
              <p>
                Selected{" "}
                <span className="font-bold text-sky-700">
                  {selectedRows.length} request
                  {selectedRows.length > 1 && "s"}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRejectingAll(true)}
                  className="px-8 py-2 rounded-xl bg-red-600 hover:bg-red-800 text-white font-semibold text-nowrap"
                >
                  Reject all selected
                </button>
                <button
                  onClick={() => setIsApprovingAll(true)}
                  className="px-8 py-2 rounded-xl bg-green-600 hover:bg-green-800 text-white font-semibold text-nowrap"
                >
                  Approve all selected
                </button>
                <ConfirmModal
                  action="approve"
                  object={selectedRows}
                  open={isApprovingAll}
                  setOpen={setIsApprovingAll}
                  getConfirm={handleSolveRequest}
                />
                <ConfirmModal
                  action="reject"
                  object={selectedRows}
                  open={isRejectingAll}
                  setOpen={setIsRejectingAll}
                  getConfirm={handleSolveRequest}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <DataTable
          responsive={true}
          columns={columns as any}
          data={list}
          sortIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
            </svg>
          }
          striped
          highlightOnHover
          pointerOnHover
          selectableRows
          selectableRowDisabled={(row: any) => row.status !== "pending"}
          onSelectedRowsChange={handleChange}
          progressPending={isLoading}
          pagination
          paginationPerPage={10}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          className="overflow-x-hidden"
        />
      </div>
    </>
  );
}
