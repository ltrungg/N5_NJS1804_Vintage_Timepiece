import SellerRequestListTable from "@/components/accounts/SellerRequestListTable";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {/* <SellerRequestListTable /> */}
    </div>
  );
}
