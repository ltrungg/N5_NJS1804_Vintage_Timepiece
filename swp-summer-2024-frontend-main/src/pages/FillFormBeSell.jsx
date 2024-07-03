import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/fill-form-before-sell.css";

function FillFormBeSell() {
    const { watchId } = useParams();
    const [formData, setFormData] = useState({
        form1: {
            sellType: "",
            originalBox: "",
            originalPapers: "",
            purchasedFromWatchfinder: "",
            unwornWithStickers: "",
            watchYear: "",
            limitedEdition: "",
            expectedPrice: "",
            additionalInfo: ""
        },
        form2: {
            usaResident: "",
            watchOrigin: "",
            watchLocation: ""
        },
        form3: {
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        }
    });

    const [currentForm, setCurrentForm] = useState("form1");

    function getWatchInfoById(id) {
        return { id, name: "Watch Name", brand: "Watch Brand" };
    }

    const watchInfo = getWatchInfoById(watchId);

    const handleChange = (e, formName) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [formName]: {
                ...prevData[formName],
                [name]: value
            }
        }));
    };

    const handleSubmit = () => {
        console.log("Form Data:", formData);
        // Lưu dữ liệu vào submittedData
        setSubmittedData(formData);
    };

    const handleNextForm = () => {
        if (currentForm === "form1") setCurrentForm("form2");
        else if (currentForm === "form2") setCurrentForm("form3");
    };

    return (

        <div>
            
            <div style={{ position: "absolute", top: 100, left: 0 }}>
                {/* Hiển thị các thông tin khác của đồng hồ */}
                <h2>Watch Details</h2>
                <p>Name: {watchInfo.name}</p>
                <p>Brand: {watchInfo.brand}</p>
                <div style={{ borderBottom: '1px solid black', width: '100%', marginBottom: '20px'}}></div>
            </div>
            <div style={{ display: currentForm === "form1" ? "block" : "none", border: "1px solid #ccc", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                {/* Form 1 */}
                <h2>Form 1</h2>
                <label>How would you like to sell your watch?</label>
                <select
                    name="sellType"
                    value={formData.form1.sellType}
                    onChange={(e) => handleChange(e, 'form1')}
                >
                    <option value="">Choose an option</option>
                    <option value="outrightSale">Outright sale</option>
                    <option value="tradeIn">Trade in</option>
                </select>


            </div>

            <div style={{ display: currentForm === "form2" ? "block" : "none", border: "1px solid #ccc", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                {/* Form 2 */}
                <h2>Form 2</h2>
                <label>If you are currently a resident of the United States of America (the “USA”), please confirm whether you purchased the watch within, and have not exported the watch outside of, the USA:</label>
                <select
                    name="usaResident"
                    value={formData.form2.usaResident}
                    onChange={(e) => handleChange(e, 'form2')}
                >
                    <option value="">Choose an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="notUsaResident">Not a resident of the USA</option>
                    <option value="dontKnow">Don’t Know</option>
                </select>

                {formData.form2.usaResident === 'yes' && (
                    <>
                        <p>I declare that the answers I have given to the questions above are true and accurate to the best of my knowledge and belief and that I have read and understood Watchfinder’s “Sell Your Watch” Terms and Conditions, in particular section 5, relating to “Customs”.</p>

                    </>
                )}

                {['no', 'notUsaResident', 'dontKnow'].includes(formData.form2.usaResident) && (
                    <>
                        <label>Please confirm whether the watch:</label>
                        <select
                            name="watchOrigin"
                            value={formData.form2.watchOrigin}
                            onChange={(e) => handleChange(e, 'form2')}
                        >
                            <option value="">Choose an option</option>
                            <option value="purchasedOutsideUsaImportedIntoUsaDutiesPaid">Was originally purchased outside of the USA and has been imported into the USA and all import & customs duties/taxes have been paid.</option>
                            <option value="purchasedOutsideUsaImportedIntoUsaNoDutiesPaid">Was originally purchased outside the USA and has been imported into the USA but no import & customs duties/taxes have been paid or you don’t know.</option>
                            <option value="boughtInUsaExportedOutsideUsa">Was originally bought in the USA and has been exported outside the USA.</option>
                        </select>
                        <button onClick={handleNextForm}>Next</button>
                    </>
                )}

                {(formData.form2.watchOrigin === 'purchasedOutsideUsaImportedIntoUsaNoDutiesPaid' || formData.form2.watchOrigin === 'dontKnow') && (
                    <>
                        <label>Please confirm whether the watch:</label>
                        <select
                            name="watchLocation"
                            value={formData.form2.watchLocation}
                            onChange={(e) => handleChange(e, 'form2')}
                        >
                            <option value="">Choose an option</option>
                            <option value="importedIntoUsaDutiesPaid">Has been imported into the USA and all import & customs duties/taxes have been paid.</option>
                            <option value="importedIntoUsaNoDutiesPaid">Has been imported into the USA but no import & customs duties/taxes have been paid or you don’t know.</option>
                            <option value="currentlyLocatedOutsideUsa">Is currently located outside the USA.</option>
                        </select>

                    </>
                )}
            </div>

            <div style={{ display: currentForm === "form3" ? "block" : "none", border: "1px solid #ccc", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                {/* Form 3 */}
                <h2>Form 3</h2>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.form3.firstName}
                    onChange={(e) => handleChange(e, 'form3')}
                />

                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.form3.lastName}
                    onChange={(e) => handleChange(e, 'form3')}
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.form3.email}
                    onChange={(e) => handleChange(e, 'form3')}
                />

                <label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.form3.phone}
                        onChange={(e) => handleChange(e, 'form3')}
                    />


                </label>
            </div>

            <div>
                {currentForm !== "form3" && (
                    <button style={{ padding: "5px 10px", fontSize: "14px", borderRadius: "4px" }} onClick={handleNextForm}>Next Form</button>
                )}
                {currentForm === "form3" ? (
                    <button style={{ padding: "5px 10px", fontSize: "14px", borderRadius: "4px" }} onClick={handleSubmit}>Finish</button>
                ) : (
                    <button style={{ padding: "5px 10px", fontSize: "14px", borderRadius: "4px" }} onClick={handleNextForm}>Continue</button>
                )}

            </div>
        </div>
    );
}

export default FillFormBeSell;

