"use client";
import AccountListTable from "@/components/accounts/AccountListTable";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetchAccountData = async () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/auth/accounts")
      .then((res) => {
        setAccountList(res.data);
        setCurrentList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getSearchList = async () => {
    await axios
      .get(
        `http://localhost:3000/auth/search/${searchKey.toLowerCase().trim()}`
      )
      .then((res) => {
        setCurrentList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  useEffect(() => {
    if (searchKey.length > 0) getSearchList();
    else setCurrentList(accountList);
  }, [searchKey]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="flex flex-row justify-center px-4 py-4">
        <div className="flex flex-row items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search account by email or username..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="rounded-[2em] w-[40em] px-4 py-2"
          />
        </div>
      </div>
      <AccountListTable
        accountList={currentList}
        getUpdateStatus={() => fetchAccountData()}
      />
    </div>
  );
}
