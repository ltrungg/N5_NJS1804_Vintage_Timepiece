import React from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Input } from "antd";

const SellRequestDetail = () => {
  const { productId, name, brand, description, imageSet, image, box, papers, dialColor, caseMaterial, caseSize, pastUsageTime, yearOfProduction, remainingInsurance, status, waterResistance } = useParams();

  return (
    <div className="container-staff">
      <h2>Product Details</h2>
      <Descriptions bordered>
        <Descriptions.Item label="ID">{productId.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{name}</Descriptions.Item>
        <Descriptions.Item label="Brand">{brand}</Descriptions.Item>
        <Descriptions.Item label="Description">
          <Input.TextArea value={description} disabled />
        </Descriptions.Item>
        <Descriptions.Item label="ImageSet">{imageSet}</Descriptions.Item>
        <Descriptions.Item label="Image">{image}</Descriptions.Item>
        <Descriptions.Item label="Box">{box === "true" ? "Yes" : "No"}</Descriptions.Item>
        <Descriptions.Item label="Papers">{papers === "true" ? "Yes" : "No"}</Descriptions.Item>
        <Descriptions.Item label="Dial Color">{dialColor}</Descriptions.Item>
        <Descriptions.Item label="Case Material">{caseMaterial}</Descriptions.Item>
        <Descriptions.Item label="Case Size">{caseSize}</Descriptions.Item>
        <Descriptions.Item label="Past Usage Time">{pastUsageTime}</Descriptions.Item>
        <Descriptions.Item label="Year of Production">{yearOfProduction}</Descriptions.Item>
        <Descriptions.Item label="Remaining Insurance">{remainingInsurance}</Descriptions.Item>
        <Descriptions.Item label="Status">{status}</Descriptions.Item>
        <Descriptions.Item label="Water Resistance">{waterResistance}</Descriptions.Item>
        {/* Add more product details as needed */}
      </Descriptions>
    </div>
  );
};

export default SellRequestDetail;
