import React, { useState, useEffect } from "react";
import { Button, Upload, message, notification, Steps, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import ToggleButton from "../components/ToggleButton";
import ProductForm from "../components/profile/ProductForm";
import { useNavigate } from "react-router-dom";
import { imageDb } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const { Step } = Steps;

const Sell2 = () => {
    const navigate = useNavigate();
    const user = sessionStorage.signInUser ? JSON.parse(sessionStorage.signInUser) : null;
    

    const [isEnteringProduct, setIsEnteringProduct] = useState(false);
    const [productData, setProductData] = useState();
    const [image, setImage] = useState(""); // State for a single image URL
    const [pdf, setPdf] = useState(""); // State for a single PDF URL
    const [telephone, setTelephone] = useState(""); // State for telephone input

    const [formData, setFormData] = useState({
        box: "", // Ensure formData.box has a default value
        details: "",
        currentStep: 0,
    });
    useEffect(() => {
        // Check if user.phone already exists
        if (user && user.phone) {
            setTelephone(user.phone);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const getProductData = (value) => {
        console.log("Product: ", value);
        setProductData(value);
    };

    const handleFileChange = (setter) => (info) => {
        const uploadedFile = info.fileList[0];
        if (uploadedFile) {
            const url = URL.createObjectURL(uploadedFile.originFileObj);
            setter(url);
        }
    };

    const handleFileUpload = async (e) => {
        const uploaded = e.target.files[0];
        // Upload image
        if (uploaded) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, uploaded).then(async (value) => {
                console.log("Uploaded: ", value.metadata);
                const url = await getDownloadURL(value.ref);
                setImage(url); // Set the single image URL
            });
        }
    };

    const handleImageUrl = () => {
        const url = prompt("Enter new image url:");
        if (url) setImage(url);
    };

    const handleNext = () => {
        const { currentStep } = formData;
        let nextStep = currentStep + 1;

        setFormData({
            ...formData,
            currentStep: nextStep,
        });
    };

    const handlePrevious = () => {
        setFormData({
            ...formData,
            currentStep: formData.currentStep - 1,
        });
    };
    const handleTelephoneChange = (e) => {
        const { value } = e.target;
        setTelephone(value);
    };

    const handleSubmit = async () => {
        try {
            let productResponse = null;

            const response = await axios.patch(`http://localhost:3000/auth/${user.id}`, {
                phone: telephone,
            });

            message.success('Phone number updated successfully');

            if (productData) {
                // Step 1: Create Product if productData exists
                productResponse = await axios.post("http://localhost:3000/product", productData);
                console.log("Product Response:", productResponse.data);

                // Construct requestData with productData.productId
                const requestData = {
                    account: user.id,
                    product: productData.productId,
                    type: "create",
                    update: {
                        image: image || null,
                        pdf: pdf || null,
                    },
                    details: formData.details,
                    status: "approved",
                };

                // Step 2: Send Seller Request with productData.productId
                const requestResponse = await axios.post("http://localhost:3000/sellerRequest", requestData);
                console.log("Request Response:", requestResponse.data);
            } else {
                // If productData does not exist, send Seller Request without product reference
                const requestData = {
                    account: user.id,
                    product: null,
                    type: "create",
                    update: {
                        image: image || null,
                        pdf: pdf || null,
                    },
                    details: formData.details,
                    status: "approved",
                };

                const requestResponse = await axios.post("http://localhost:3000/sellerRequest", requestData);
                console.log("Request Response:", requestResponse.data);
            }

            // Show success notification
            notification.success({
                message: "Success",
                description: "Your information has been submitted successfully!",
            });

            // Redirect to success page
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
            title: 'Appraisal Certificate',
            content: (
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Does your watch have an appraisal certificate yet?</label>
                        <div>
                            <ToggleButton
                                name="box"
                                onChange={handleChange}
                                value={formData.box}
                            />
                        </div>
                    </div>
                    {formData.box === "no" && (
                        <div className="mt-4">
                            <Button type="primary" onClick={() => setIsEnteringProduct(true)}>
                                Enter Product Data
                            </Button>
                            {isEnteringProduct && (
                                <ProductForm
                                    open={isEnteringProduct}
                                    setOpen={setIsEnteringProduct}
                                    editable={true}
                                    getProductData={getProductData}
                                />
                            )}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Product Details',
            content: (

                <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Telephone</label>
                        <div className="col-span-2">
                            {user && user.phone ? (
                                <Input
                                    name="telephone"
                                    value={telephone}
                                    onChange={handleTelephoneChange}
                                    placeholder="Enter telephone number"
                                    disabled
                                />
                            ) : (
                                <Input
                                    name="telephone"
                                    value={telephone}
                                    onChange={handleTelephoneChange}
                                    placeholder="Enter telephone number"
                                />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Detail</label>
                        <div className="col-span-2">
                            <Input
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                placeholder="Enter product description"
                            />
                        </div>
                    </div>
                    {formData.box === "yes" && (
                        <>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">Image</label>
                                <div className="col-span-2">
                                    {image && (
                                        <img
                                            src={image}
                                            alt="Product"
                                            style={{ maxWidth: '150px', height: 'auto' }}
                                        />
                                    )}
                                    <button
                                        onClick={() => {
                                            document.getElementById("image-upload")?.click();
                                        }}
                                        className="px-4 py-2 rounded-lg bg-white-700 hover:bg-sky-800 text-black font-normal border border-gray-300"
                                    >
                                        Upload image
                                    </button>
                                    <p className="text-gray-500 text-[0.8em]">
                                        or{" "}
                                        <span
                                            onClick={handleImageUrl}
                                            className="underline cursor-pointer hover:text-black"
                                        >
                                            use a URL instead
                                        </span>
                                    </p>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                        hidden
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">PDF Document</label>
                                <div className="col-span-2">
                                    <Upload
                                        name="pdf"
                                        beforeUpload={() => false}
                                        onChange={handleFileChange(setPdf)}
                                        fileList={pdf ? [{ uid: '-1', name: 'PDF Document', status: 'done', url: pdf }] : []}
                                    >
                                        <Button size="large" icon={<UploadOutlined />}>
                                            Click to upload PDF
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ),
        },
        {
            title: 'Review Details',
            content: (
                <div className="flex flex-col space-y-4">
                    <label className="col-span-1 self-center">Review your details and click Submit.</label>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Detail</label>
                        <div className="col-span-2">
                            <p>{formData.details}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Telephone</label>
                        <div className="col-span-2">
                            <p>{telephone}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Image</label>
                        <div className="col-span-2">
                            {formData.box === "yes" ? (
                                <>
                                    {image && (
                                        <img
                                            src={image}
                                            alt="Product"
                                            style={{ maxWidth: '150px', height: 'auto' }}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Render images from productData */}
                                    {productData && (
                                        <img
                                            src={productData.image}
                                            alt="Product"
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {formData.box === "yes" && (
                        <>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">PDF Document</label>
                                <div className="col-span-2">
                                    {pdf && (
                                        <a href={pdf} target="_blank" rel="noopener noreferrer">
                                            View PDF
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ),
        },
    ];

    const currentStep = formData.currentStep;

    return (
        <div className="max-w-screen-md mx-auto p-6 bg-white shadow-md rounded-md">
            <Steps current={currentStep}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content py-6">{steps[currentStep].content}</div>
            <div className="steps-action flex justify-end space-x-2">
                {currentStep > 0 && (
                    <Button onClick={handlePrevious}>
                        Previous
                    </Button>
                )}
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={handleNext}>
                        Next
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button type="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Sell2;
