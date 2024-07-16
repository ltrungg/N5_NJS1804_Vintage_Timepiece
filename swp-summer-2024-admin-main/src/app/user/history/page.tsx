"use client";
import AppraiserRequestListTable from "@/components/accounts/AppraiserRequestListTable";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/navbar/Navbar";
import AppraiserSidebar from "@/components/sidebar/AppraiserSidebar";
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
        let temp = res.data.filter((item: any) => 
          item.status === "approved" || item.status === "rejected"
        );
        
        temp.sort((a: any, b: any) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        
        setSellerRequestList(temp);
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
      <AppraiserSidebar />
      <AppraiserRequestListTable
        list={sellerRequestList}
        getUpdatedStatus={async (value: boolean) => {
          if (value) await getRequestListData();
        }}
      />
    </div>
  );
}