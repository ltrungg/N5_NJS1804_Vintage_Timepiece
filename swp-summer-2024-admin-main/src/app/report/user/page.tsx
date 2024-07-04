"use client";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/navbar/Navbar";
import UserReportListTable from "@/components/reports/UserReportListTable";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [reportList, setReportList] = useState<any[]>([]);
  const [accountList, setAccountList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReportData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/report/user")
      .then((res) => {
        console.log("User Reports: ", res.data);
        setReportList(res.data);
        if (res.data.length === 0) setIsLoading(false);
        res.data.map(async (item: any) => {
          await axios
            .get(`http://localhost:3000/auth/${item.reportedId}`)
            .then((res) => {
              setAccountList((current) => [...current, res.data]);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div>
      <Navbar />
      <Sidebar />
      <UserReportListTable reportList={reportList} accountList={accountList} />
    </div>
  );
}
