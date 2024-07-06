import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Descriptions, message, Input, Button } from "antd";

export default function SellRequestDetail() {
  const { id } = useParams();
  const [sellRequest, setSellRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellRequest();
  }, [id]);

  const fetchSellRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/sell-request/${id}`);
      setSellRequest(response.data);
      setLoading(false);
      console.log('Sell request data:', response.data);
    } catch (error) {
      message.error("Failed to fetch sell request details");
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSellRequest((prevSellRequest) => ({
      ...prevSellRequest,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/sell-request/${id}`, sellRequest);
      message.success("Sell request updated successfully");
      navigate(`/sell-request/report/${id}`);
    } catch (error) {
      message.error("Failed to update sell request");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sellRequest) {
    return <div>Sell request not found</div>;
  }

  return (
    <div className="container-staff">
      <h2>Sell Request Details</h2>
      <Descriptions bordered>
        <Descriptions.Item label="ID">{sellRequest.id}</Descriptions.Item>
        <Descriptions.Item label="Name">
          <Input
            value={sellRequest.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Brand">
          <Input
            value={sellRequest.brand}
            onChange={(e) => handleInputChange("brand", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          <Input.TextArea
            value={sellRequest.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Image">
          <Input
            value={sellRequest.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          <Input
            value={sellRequest.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          <Input
            value={sellRequest.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Dial Color">
          <Input
            value={sellRequest.dialColor}
            onChange={(e) => handleInputChange("dialColor", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Box">
          <Input
            value={sellRequest.box ? "Yes" : "No"}
            onChange={(e) => handleInputChange("box", e.target.value.toLowerCase() === "yes")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Papers">
          <Input
            value={sellRequest.papers ? "Yes" : "No"}
            onChange={(e) => handleInputChange("papers", e.target.value.toLowerCase() === "yes")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Water Resistance">
          <Input
            value={sellRequest.waterResistance}
            onChange={(e) => handleInputChange("waterResistance", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Case Material">
          <Input
            value={sellRequest.caseMaterial}
            onChange={(e) => handleInputChange("caseMaterial", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Case Size">
          <Input
            value={sellRequest.caseSize}
            onChange={(e) => handleInputChange("caseSize", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Past Usage Time">
          <Input
            value={sellRequest.pastUsageTime}
            onChange={(e) => handleInputChange("pastUsageTime", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Year of Production">
          <Input
            value={sellRequest.yearOfProduction}
            onChange={(e) => handleInputChange("yearOfProduction", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Remaining Insurance">
          <Input
            value={sellRequest.remainingInsurance}
            onChange={(e) => handleInputChange("remainingInsurance", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Input
            value={sellRequest.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          />
        </Descriptions.Item>
      </Descriptions>
      <div className="update-button">
        <Button type="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
