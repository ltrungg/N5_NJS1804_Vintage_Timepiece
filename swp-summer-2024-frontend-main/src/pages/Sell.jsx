import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  notification,
  InputNumber,
  Steps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToggleButton from "../components/ToggleButton";
import ProductForm from "../components/profile/ProductForm";

const { Step } = Steps;

export default function Sell() {
  const [isEnteringProduct, setIsEnteringProduct] = useState(false);
  const [productData, setProductData] = useState();
  const getProductData = (value) => {
    console.log("Product: ", value);
  };

  const [form] = Form.useForm();

  // const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    watchName: "",
    name: "",
    phoneNumber: "",
    box: "",
    documents: null,
    fileList: [],
    priceWantToSell: "",
    originalBox: "",
    paper: "",
    limitedEdition: "",
    currentStep: 0,
    appraisalTypeList: [],
    imageList: [],
  });
  // const [currentStep, setCurrentStep] = useState(0);
  // const [box, setBox] = useState(null);
  // const [watchName, setWatchName] = useState("");
  // const [name, setName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [documents, setDocuments] = useState("");
  // const [priceWantToSell, setPriceWantToSell] = useState(0);
  // const [originalBox, setOriginalBox] = useState("");
  // const [paper, setPaper] = useState("");
  // const [limitedEdition, setLimitedEdition] = useState("");
  const navigate = useNavigate();

  // const onFileChange = ({ fileList }) => {
  //   setFileList(fileList);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (name) => (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFormData((preState) => ({
      ...preState,
      [name]: fileList,
    }));
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      currentStep: formData.box === "yes" ? 2 : 1,
    });
  };

  const handlePrevious = () => {
    setFormData({
      ...formData,
      currentStep: formData.currentStep - 1,
    });
  };

  const handleNextInfo = () => {
    setFormData({
      ...formData,
      currentStep: 2,
    });
  };

  const handlePreviousInfo = () => {
    setFormData({
      ...formData,
      currentStep: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      if (fileList.length === 0) {
        message.error("Please upload an image.");
        return;
      }

      let newForm;
      if (box === "yes") {
        newForm = {
          watchName,
          name,
          phoneNumber,
          documents,
          image,
          priceWantToSell,
          originalBox: null,
          paper: null,
          limitedEdition: null,
          status: "WITH_REPORT",
        };
      } else {
        newForm = {
          watchName,
          name,
          phoneNumber,
          documents: null,
          image,
          priceWantToSell,
          originalBox,
          paper,
          limitedEdition,
          status: "WITHOUT_REPORT",
        };
      }

      console.log("Sending data:", newForm);

      const response = await axios.post(
        "http://localhost:3000/sell-request/create",
        newForm
      );

      console.log("Data submitted successfully:", response.data);

      notification.success({
        message: "Success",
        description: "Your information has been submitted successfully!",
      });

      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.response && error.response.status === 400) {
        message.error("Bad request. Please check your inputs.");
      } else {
        message.error("Failed to submit the form. Please try again later.");
      }
    }
  };

  const steps = [
    {
      title: "Check",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">Watch Name</label>
            <div className="col-span-2">
              <Input
                size="large"
                name="watchName"
                style={{ width: "70%" }}
                value={formData.watchName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">Your Name</label>
            <div className="col-span-2">
              <Input
                size="large"
                name="name"
                style={{ width: "70%" }}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">Phone Number</label>
            <div className="col-span-2">
              <InputNumber
                controls={false}
                size="large"
                min={0}
                style={{ width: "70%" }}
                value={formData.phoneNumber}
                onChange={(value) => handleNumberChange("phoneNumber", value)}
              />
            </div>
          </div>
          <div>
            <button onClick={() => setIsEnteringProduct(true)}>
              Enter product data
            </button>
            <ProductForm
              open={isEnteringProduct}
              setOpen={setIsEnteringProduct}
              editable={true}
              getProductData={getProductData}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">
              Does your watch have an appraisal certificate yet?
            </label>
            <div className="col-span-2">
              <ToggleButton
                name="box"
                onChange={handleChange}
                value={formData.box}
              />
            </div>
          </div>
          {formData.box === "yes" && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <label className="col-span-1 self-center">
                  Upload Your watch appraisal certificate
                </label>
                <div className="col-span-2">
                  <Upload
                    name="documents"
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={handleFileChange("appraisalTypeList")}
                    fileList={formData.appraisalTypeList}
                  >
                    <Button size="large" icon={<UploadOutlined />}>
                      Click to upload
                    </Button>
                  </Upload>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <label className="col-span-1 self-center">Image</label>
                <div className="col-span-2">
                  <Upload
                    name="image"
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={handleFileChange("imageList")}
                    fileList={formData.imageList}
                  >
                    <Button size="large" icon={<UploadOutlined />}>
                      Click to upload
                    </Button>
                  </Upload>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <label className="col-span-1 self-center">
                  Price you want to sell
                </label>
                <div className="col-span-2">
                  <InputNumber
                    controls={false}
                    size="large"
                    min={0}
                    style={{ width: "70%" }}
                    value={formData.priceWantToSell}
                    onChange={(value) =>
                      handleNumberChange("priceWantToSell", value)
                    }
                  />
                </div>
              </div>
            </>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" size="large" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Information",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">
              Do you have original box?
            </label>
            <div className="col-span-2">
              <ToggleButton
                name="originalBox"
                onChange={handleChange}
                value={formData.originalBox}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">
              Does your watch have original paper?
            </label>
            <div className="col-span-2">
              <ToggleButton
                name="paper"
                onChange={handleChange}
                value={formData.paper}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">
              Is your watch a limited edition?
            </label>

            <div className="col-span-2">
              <ToggleButton
                name="limitedEdition"
                onChange={handleChange}
                value={formData.limitedEdition}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">Image</label>
            <div className="col-span-2">
              <Upload
                name="image"
                listType="picture"
                beforeUpload={() => false}
                onChange={handleFileChange("imageList")}
                fileList={formData.imageList}
              >
                <Button size="large" icon={<UploadOutlined />}>
                  Click to upload
                </Button>
              </Upload>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <label className="col-span-1 self-center">
              Price you want to sell
            </label>
            <div className="col-span-2">
              <InputNumber
                controls={false}
                size="large"
                min={0}
                style={{ width: "70%" }}
                value={formData.priceWantToSell}
                onChange={(value) =>
                  handleNumberChange("priceWantToSell", value)
                }
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" size="large" onClick={handlePrevious}>
              Previous
            </Button>
            <Button type="primary" size="large" onClick={handleNextInfo}>
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Review",
      content: (
        <>
          <div className="flex flex-col space-y-4">
            <label className="col-span-1 self-center">
              Review your details and click Submit.
            </label>
            <p>Watch Name: {formData.watchName}</p>
            <p>Your Name: {formData.name}</p>
            <p>Phone Number: {formData.phoneNumber}</p>
            {formData.box === "no" && (
              <>
                <p>Original Box: {formData.originalBox}</p>
                <p>Paper: {formData.paper}</p>
                <p>Limited Edition: {formData.limitedEdition}</p>
                <p>Price: {formData.priceWantToSell}</p>
                <p>
                  Image: {formData.fileList.map((file) => file.name).join(", ")}
                </p>
              </>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="primary"
                size="large"
                onClick={
                  formData.box === "no" ? handlePrevious : handlePreviousInfo
                }
              >
                Previous
              </Button>
              <Button type="primary" size="large" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="container mx-auto px-4 ">
      <div className="w-2/3 mx-auto bg-white p-8 rounded-lg shadow-lg overflow-hidden mt-10">
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
          <Steps current={formData.currentStep}>
            {steps.map((item, index) => (
              <Step key={index} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content mt-8">
            {steps[formData.currentStep].content}
          </div>
        </div>
      </div>
    </div>
  );
}
