"use client";
import SellerRequestListTable from "@/components/accounts/SellerRequestListTable";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [sellerRequestList, setSellerRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRequestListData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/sellerRequest")
      .then((res) => {
        setSellerRequestList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRequestListData();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SellerRequestListTable
        list={sellerRequestList}
        getUpdatedStatus={async (value: boolean) => {
          if (value) await getRequestListData();
        }}
      />
    </div>
  );
}
