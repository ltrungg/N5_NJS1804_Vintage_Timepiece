"use client";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/navbar/Navbar";
import ProductReportListTable from "@/components/reports/ProductReportListTable";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [reportList, setReportList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReportData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:3000/report/product")
      .then((res) => {
        console.log("Reports: ", res.data);
        setReportList(res.data);
        if (res.data.length === 0) setIsLoading(false);
        res.data.map(async (item: any) => {
          await axios
            .get(`http://localhost:3000/product/${item.reportedId}`)
            .then((res) => {
              setProductList((current) => [...current, res.data]);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
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
      <ProductReportListTable
        reportList={reportList}
        productList={productList}
      />
    </div>
  );
}
