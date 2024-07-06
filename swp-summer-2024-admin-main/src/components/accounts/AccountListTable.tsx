"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import dateFormat from "@/assistants/date.format";
import { Avatar, message } from "antd";
import ConfirmModal from "../modals/ConfirmModal";

export default function AccountListTable({
  accountList,
  getUpdateStatus,
}: {
  accountList: any;
  getUpdateStatus: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBanningAccount, setIsBanningAccount] = useState("");
  const [isActivatingAccount, setIsActivatingAccount] = useState("");

  const handleAccountStatusUpdate = async (value: any) => {
    await axios
      .patch(`http://localhost:3000/auth/${value.object.id}`, {
        status: !value.object.status,
      })
      .then((res) => {
        getUpdateStatus("statusUpdated");
        message.success({
          key: "statusUpdated",
          content: (
            <p className="inline">
              <span className="font-semibold">{value.object.username}</span>'s
              account has been{" "}
              {value.object.status ? "deactivated" : "activated"}.
            </p>
          ),
          duration: 5,
        });
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: (
        <p className="w-fit text-center font-semibold text-tremor-default">
          No
        </p>
      ),
      cell: (row: any, index: any) => <p className="w-fit">{index + 1}</p>,
      grow: 0,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Avatar
        </p>
      ),
      cell: (row: any) => (
        <span className="py-2">
          <Avatar src={row.avatar} alt="" size={40} />
        </span>
      ),
      grow: 0,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Username
        </p>
      ),
      cell: (row: any) => <p className="w-full text-start">{row.username}</p>,
      sortable: true,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Email
        </p>
      ),
      selector: (row: any) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Phone number
        </p>
      ),
      selector: (row: any) =>
        [
          row.phone.slice(0, 3),
          " ",
          row.phone.slice(3, 7),
          " ",
          row.phone.slice(7),
        ].join(""),
      sortable: true,
      grow: 1,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Created date
        </p>
      ),
      selector: (row: any) => dateFormat(row.createdAt, "dd/mm/yyyy"),
      sortable: true,
      sortFunction: (a: any, b: any) => {
        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
      },
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Last active
        </p>
      ),
      selector: (row: any) => dateFormat(row.lastActive, "HH:MM dd/mm/yyyy"),
      sortable: true,
      sortFunction: (a: any, b: any) => {
        return new Date(a.lastActive) < new Date(b.lastActive) ? 1 : -1;
      },
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Role
        </p>
      ),
      cell: (row: any) => {
        if (row.role === "user") {
          return (
            <p className="w-full text-center text-nowrap p-2 rounded-lg bg-sky-600 text-white">
              USER
            </p>
          );
        } else if (row.role === "admin") {
          return (
            <p className="w-full min-w-fit text-center text-nowrap text-[0.8em] p-2 rounded-lg bg-red-600 text-white">
              ADMINISTRATOR
            </p>
          );
        } else if (row.role === "appraiser") {
          return (
            <p className="w-full text-center text-nowrap p-2 rounded-lg bg-green-600 text-white">
              APPRAISER
            </p>
          );
        } else if (row.role === "staff") {
          return (
            <p className="w-full text-center text-nowrap p-2 rounded-lg bg-amber-600 text-white">
              STAFF
            </p>
          );
        }
      },
      sortable: true,
      sortFunction: (a: any, b: any) => {
        return a.role.localeCompare(b.role);
      },
      grow: 1,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Status
        </p>
      ),
      cell: (row: any) => {
        if (row.status === true) {
          return (
            <span className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="green"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
              </svg>
            </span>
          );
        } else
          return (
            <span className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="red"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
              </svg>
            </span>
          );
      },
      sortable: true,
      sortFunction: (a: any, b: any) => {
        return Number(a.status) - Number(b.status);
      },
      grow: 0,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Actions
        </p>
      ),
      cell: (row: any) => (
        <div className="w-full flex flex-row gap-4 items-center justify-center">
          {row.status === true ? (
            <>
              <button
                onClick={() => setIsBanningAccount(row.id)}
                className="flex flex-col items-center gap 2 text-[0.8em] text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M16.9057 5.68009L5.68009 16.9057C4.62644 15.5506 4 13.8491 4 12C4 7.58172 7.58172 4 12 4C13.8491 4 15.5506 4.62644 16.9057 5.68009ZM7.0943 18.3199L18.3199 7.0943C19.3736 8.44939 20 10.1509 20 12C20 16.4183 16.4183 20 12 20C10.1509 20 8.44939 19.3736 7.0943 18.3199ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5223 6.47771 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47771 17.5223 2 12 2Z"></path>
                </svg>
                DEACTIVATE
              </button>
              <ConfirmModal
                action="ban"
                object={row}
                open={isBanningAccount === row.id}
                setOpen={setIsBanningAccount}
                getConfirm={handleAccountStatusUpdate}
              />
            </>
          ) : (
            <>
              <button
                onClick={() => setIsActivatingAccount(row.id)}
                className="flex flex-col items-center gap 2 text-[0.8em] text-green-500 hover:text-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
                </svg>
                ACTIVATE
              </button>
              <ConfirmModal
                action="activate"
                object={row}
                open={isActivatingAccount === row.id}
                setOpen={setIsActivatingAccount}
                getConfirm={handleAccountStatusUpdate}
              />
            </>
          )}
        </div>
      ),
      grow: 1,
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <DataTable
          columns={columns as any}
          data={accountList}
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
          progressPending={isLoading}
          progressComponent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="gray"
            >
              <path d="M11.9995 2C12.5518 2 12.9995 2.44772 12.9995 3V6C12.9995 6.55228 12.5518 7 11.9995 7C11.4472 7 10.9995 6.55228 10.9995 6V3C10.9995 2.44772 11.4472 2 11.9995 2ZM11.9995 17C12.5518 17 12.9995 17.4477 12.9995 18V21C12.9995 21.5523 12.5518 22 11.9995 22C11.4472 22 10.9995 21.5523 10.9995 21V18C10.9995 17.4477 11.4472 17 11.9995 17ZM20.6597 7C20.9359 7.47829 20.772 8.08988 20.2937 8.36602L17.6956 9.86602C17.2173 10.1422 16.6057 9.97829 16.3296 9.5C16.0535 9.02171 16.2173 8.41012 16.6956 8.13398L19.2937 6.63397C19.772 6.35783 20.3836 6.52171 20.6597 7ZM7.66935 14.5C7.94549 14.9783 7.78161 15.5899 7.30332 15.866L4.70525 17.366C4.22695 17.6422 3.61536 17.4783 3.33922 17C3.06308 16.5217 3.22695 15.9101 3.70525 15.634L6.30332 14.134C6.78161 13.8578 7.3932 14.0217 7.66935 14.5ZM20.6597 17C20.3836 17.4783 19.772 17.6422 19.2937 17.366L16.6956 15.866C16.2173 15.5899 16.0535 14.9783 16.3296 14.5C16.6057 14.0217 17.2173 13.8578 17.6956 14.134L20.2937 15.634C20.772 15.9101 20.9359 16.5217 20.6597 17ZM7.66935 9.5C7.3932 9.97829 6.78161 10.1422 6.30332 9.86602L3.70525 8.36602C3.22695 8.08988 3.06308 7.47829 3.33922 7C3.61536 6.52171 4.22695 6.35783 4.70525 6.63397L7.30332 8.13398C7.78161 8.41012 7.94549 9.02171 7.66935 9.5Z"></path>
            </svg>
          }
          pagination
          paginationPerPage={10}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
        />
      </div>
    </>
  );
}
