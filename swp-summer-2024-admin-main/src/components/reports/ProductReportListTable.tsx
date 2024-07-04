"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import dateFormat from "@/assistants/date.format";
import { Avatar } from "antd";
import ProductCriteriaModal from "./ProductCriteriaModal";

export default function ProductReportListTable({
  reportList,
  productList,
}: {
  reportList: any;
  productList: any;
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
          <div className="w-full flex items-center justify-center gap-2">
            <Avatar src={row.account.avatar} alt="" size={32} />
            <p className="font-semibold">{row.account.username}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: (
        <p className="w-full text-center font-semibold text-tremor-default">
          Reported product
        </p>
      ),
      cell: (row: any) => {
        const product = productList.find(
          (item: any) => item.id === row.reportedId
        );
        return (
          <div className="w-full flex items-center justify-center py-2 gap-2">
            <Avatar src={product?.image} alt="" size={64} />
            <p className="font-semibold">{product?.name}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
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
              {row.criteria.length} criteria
            </span>
            <ProductCriteriaModal
              criteria={row.criteria}
              open={currentCriteriaShow === row.id}
              setOpen={setCurrentCriteriaShow}
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
          Actions
        </p>
      ),
      cell: (row: any) => (
        <div className="w-full flex flex-row gap-4 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="steelblue"
          >
            <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="red"
          >
            <path d="M16.9057 5.68009L5.68009 16.9057C4.62644 15.5506 4 13.8491 4 12C4 7.58172 7.58172 4 12 4C13.8491 4 15.5506 4.62644 16.9057 5.68009ZM7.0943 18.3199L18.3199 7.0943C19.3736 8.44939 20 10.1509 20 12C20 16.4183 16.4183 20 12 20C10.1509 20 8.44939 19.3736 7.0943 18.3199ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5223 6.47771 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47771 17.5223 2 12 2Z"></path>
          </svg>
        </div>
      ),
      grow: 1,
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
