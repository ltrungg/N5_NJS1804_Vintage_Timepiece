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

  const fetchAccountData = async () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/auth/accounts")
      .then((res) => {
        console.log("Data: ", res.data);
        setAccountList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AccountListTable accountList={accountList} />
    </div>
  );
}
