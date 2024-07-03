import React, { useEffect, useState } from "react";
import { Table, Button, message, Tag } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function StaffDashboard() {
  const [sellRequests, setSellRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellRequests();
  }, []);

  const fetchSellRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/sell-request/view`);
      setSellRequests(response.data.sellRequests);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch sell requests");
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Watch Name", dataIndex: "watchName", key: "watchName" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Price Want To Sell", dataIndex: "priceWantToSell", key: "priceWantToSell" },
    {
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => navigate(`/sell-request/${record.id}`)}>View Details</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Sell Requests</h2>
      <Table
        columns={columns}
        dataSource={sellRequests}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
}
