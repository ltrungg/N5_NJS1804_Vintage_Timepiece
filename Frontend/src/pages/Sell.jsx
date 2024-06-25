import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  notification,
  Radio,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  price: Yup.number()
    .typeError("Please enter a valid number")
    .required("Please enter the price")
    .min(0, "Price must be greater than or equal to 0"),
});
export default function Sell() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      if (fileList.length === 0) {
        message.error("Please upload an image.");
        return;
      }
      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj);
      const imageResponse = await fetch(
        "http://localhost:3000/sell/uploadImage",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!imageResponse.ok) {
        throw new Error("Image upload failed");
      }
      const imageData = await imageResponse.json();
      console.log("Image uploaded successfully:", imageData);
      values.imagePath = imageData.imagePath;
      const dataResponse = await fetch(
        "http://localhost:3000/sell/information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!dataResponse.ok) {
        throw new Error("Data submission failed");
      }

      const data = await dataResponse.json();
      console.log("Data saved successfully:", data);

      notification.success({
        message: "Success",
        description: "Your information has been submitted successfully!",
      });

      // const latestProductsResponse = await axios.get(
      //   "http://localhost:3000/product/latest"
      // );

      // setTimeout(() => {
      //   navigate("", {
      //     state: { latestProducts: latestProductsResponse.data },
      //   });
      // }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);

      notification.error({
        message: "Error",
        description:
          "There was an error submitting the form. Please try again.",
      });

      setTimeout(() => {
        navigate("/sell");
      }, 2000);
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const validateNotNull = (_, value) => {
    if (value === null || value === undefined || value.trim() === "") {
      return Promise.reject(new Error("The input cannot be null"));
    }
    return Promise.resolve();
  };

  return (
    <div className="w-full max-w-full p-10 border border-gray-300 rounded-lg shadow-lg bg-white mx-5">
      <h1 className="text-center text-3xl font-bold mb-4">
        Information For Sell
      </h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Watch Name"
          name="watchName"
          rules={[{ required: true, message: "Please enter the watch name" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <InputNumber
            controls={false}
            size="large"
            min={0}
            style={{ width: "98.5%" }}
          />
        </Form.Item>
        <Form.Item
          label="Do you have original box ?"
          name="agree"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Please select yes or no",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Does your watch have original documents ?"
          name="agree"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Please select yes or no",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Is your watch a limited edition ?"
          name="agree"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Please select yes or no",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Price you want to sell"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber
            controls={false}
            size="large"
            min={0}
            style={{ width: "98.5%" }}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            onChange={onFileChange}
            fileList={fileList}
          >
            <Button size="large" icon={<UploadOutlined />}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
