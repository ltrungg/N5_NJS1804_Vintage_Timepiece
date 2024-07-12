"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import dateFormat from "@/assistants/date.format";
import { Avatar } from "antd";
import ProductCriteriaModal from "./ProductCriteriaModal";
import UserCriteriaModal from "./UserCriteriaModal";

export default function UserReportListTable({
  reportList,
  userList,
}: {
  reportList: any[];
  userList: any[];
}) {
  const [currentCriteriaShow, setCurrentCriteriaShow] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          No
        </p>
      ),
      cell: (row: any, index: any) => (
        <p className="w-full text-center">{index + 1}</p>
      ),
      grow: 0,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Reporter
        </p>
      ),
      cell: (row: any) => {
        return (
          <div className="w-full flex items-center justify-start gap-2">
            <Avatar src={row.account.avatar} alt="" size={32} />
            <p className="font-semibold">{row.account.username}</p>
          </div>
        );
      },
      sortable: true,
      sortFunction: (a: any, b: any) => {
        return a.account.username.localeCompare(b.account.username);
      },
      grow: 1,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Reported user
        </p>
      ),
      cell: (row: any) => {
        const user = userList.find((item: any) => item.id === row.reportedId);
        return (
          <div className="w-full flex items-center justify-start py-2 gap-2">
            <Avatar src={user?.avatar} alt="" size={64} />
            <p className="font-semibold">{user?.username}</p>
          </div>
        );
      },
      sortable: true,
      sortFunction: (a: any, b: any) => {
        const user = userList.find((item: any) => item.id === a.reportedId);
        const user2 = userList.find((item: any) => item.id === b.reportedId);
        return user.username.localeCompare(user2.username);
      },
      grow: 2,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Misconducted criteria
        </p>
      ),
      cell: (row: any) => {
        return (
          <div className="w-full flex items-center justify-center gap-2">
            <span
              onClick={() => setCurrentCriteriaShow(row.id)}
              className="font-bold underline text-sky-600 hover:text-sky-700 cursor-pointer"
            >
              {row.criteria.length}{" "}
              {row.criteria.length > 1 ? "criteria" : "criterion"}
            </span>
            <UserCriteriaModal
              criteria={row.criteria}
              open={currentCriteriaShow === row.id}
              setOpen={setCurrentCriteriaShow}
              note={row.note}
            />
          </div>
        );
      },
      sortable: true,
      sortFunction: (a: any, b: any) => {
        if (a.criteria.length === b.criteria.length) return 0;
        else return a.criteria.length > b.criteria.length ? 1 : -1;
      },
      grow: 1,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Sent at
        </p>
      ),
      selector: (row: any) => row.createdAt,
      cell: (row: any) => (
        <p className="w-full text-center">
          {dateFormat(row.createdAt, "HH:MM dd/mm/yyyy")}
        </p>
      ),
      sortable: true,
      sortFunction: (a: any, b: any) => {
        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <DataTable
          columns={columns}
          data={reportList}
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
