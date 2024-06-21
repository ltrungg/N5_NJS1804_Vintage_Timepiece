import React, { useState } from 'react';
import { useSellContext } from '../context/sellContext';
import { useNavigate } from 'react-router-dom';
import { Select, Input, Checkbox } from 'antd';
import styles from "../styles/other-form.module.css";



export default function OtherBrandForm() {
    const { updateWatchForm } = useSellContext();
    const navigate = useNavigate();

    const [newWatchForm, setNewWatchForm] = useState({
        brand: "",
        name: "",
        image: "",
        description: "",
        modelNumber: "",
        serialNumber: "",
        type: "",
        caseMaterial: "",
        braceletMaterial: "",
        caseColor: "",
        dialColor: "",
        caseSize: 0,
        yearOfManufacture: new Date().getFullYear(),
        limitedEdition: false,
        marketValue: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewWatchForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newWatchForm);
        updateWatchForm(newWatchForm);
        navigate('/sell');
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Do something with the selected file, such as uploading to server or displaying preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewWatchForm((prevForm) => ({
                    ...prevForm,
                    image: event.target.result // Set image to base64 string for example
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleColorChange = (color, fieldName) => {
        setNewWatchForm((prevForm) => ({
            ...prevForm,
            [fieldName]: color
        }));
    };
    
    const handleMaterialChange = (value, fieldName) => {
        setNewWatchForm((prevForm) => ({
            ...prevForm,
            [fieldName]: value
        }));
    };
    const handleLimitedEditionChange = (e) => {
        setNewWatchForm((prevForm) => ({
            ...prevForm,
            limitedEdition: e.target.checked
        }));
    };
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
    };
    const caseSizes = [];
    for (let size = 100; size >= 0; size--) {
        caseSizes.push(size);
    };


    return (
        <div className={styles.formContainerOther}>
            <h1>Fill Watch Information</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroupOther}>
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={newWatchForm.brand}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newWatchForm.name}
                        onChange={handleChange}
                    />
                </div>
                

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={newWatchForm.description}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="modelNumber">Model Number:</label>
                    <input
                        type="text"
                        id="modelNumber"
                        name="modelNumber"
                        value={newWatchForm.modelNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="serialNumber">Serial Number:</label>
                    <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={newWatchForm.serialNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={newWatchForm.type}
                        onChange={handleChange}
                    >
                        <option value="">-- Select Type --</option>
                        <option value="Sport">Sport</option>
                        <option value="Dress">Dress</option>
                        <option value="Casual">Casual</option>
                        <option value="Luxury">Luxury</option>
                        {/* Thêm các loại đồng hồ khác nếu cần */}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="caseMaterial">Case Material:</label>
                    <Select
                        value={newWatchForm.caseMaterial}
                        onChange={(value) => handleMaterialChange(value, 'caseMaterial')}
                    >
                        <Select.Option value="Stainless Steel">Stainless Steel</Select.Option>
                        <Select.Option value="Gold">Gold</Select.Option>
                        <Select.Option value="Silver">Silver</Select.Option>
                        <Select.Option value="Titanium">Titanium</Select.Option>
                        <Select.Option value="Ceramics">Ceramics</Select.Option>
                        {/* Thêm các tùy chọn khác tại đây */}
                        <Select.Option value="Aluminum">Aluminum</Select.Option>
                        <Select.Option value="Plastic">Plastic</Select.Option>
                        <Select.Option value="Carbon Fiber">Carbon Fiber</Select.Option>
                        <Select.Option value="Tungsten">Tungsten</Select.Option>
                        <Select.Option value="Brass">Brass</Select.Option>

                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="braceletMaterial">Bracelet Material:</label>
                    <Select
                        value={newWatchForm.braceletMaterial}
                        onChange={(value) => handleMaterialChange(value, 'braceletMaterial')}
                    >
                        <Select.Option value="Stainless Steel">Stainless Steel</Select.Option>
                        <Select.Option value="Leather">Leather</Select.Option>
                        <Select.Option value="Fabric">Fabric</Select.Option>
                        <Select.Option value="Rubber">Rubber</Select.Option>
                        <Select.Option value="Titanium">Titanium</Select.Option>
                        {/* Thêm các tùy chọn khác tại đây */}
                        <Select.Option value="Ceramics (Keramik)">Ceramics (Keramik)</Select.Option>
                        <Select.Option value="Nylon">Nylon</Select.Option>
                        <Select.Option value="Crocodile">Crocodile</Select.Option>
                        <Select.Option value="Silicone">Silicone</Select.Option>
                        <Select.Option value="Shark Mesh">Shark Mesh</Select.Option>

                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="caseColor">Case Color:</label>
                    <Input
                        type="color"
                        id="caseColor"
                        name="caseColor"
                        value={newWatchForm.caseColor}
                        onChange={(e) => handleColorChange(e.target.value, 'caseColor')}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="dialColor">Dial Color:</label>
                    <Input
                        type="color"
                        id="dialColor"
                        name="dialColor"
                        value={newWatchForm.dialColor}
                        onChange={(e) => handleColorChange(e.target.value, 'dialColor')}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="caseSize">Case Size (mm):</label>
                    <Select
                        value={newWatchForm.caseSize}
                        onChange={(value) => setNewWatchForm((prevForm) => ({
                            ...prevForm,
                            caseSize: value
                        }))}
                    >
                        {caseSizes.map((size) => (
                            <Option key={size} value={size}>
                                {size} mm
                            </Option>
                        ))}
                    </Select>
                </div>  
                <div className={styles.formGroup}>
                    <label htmlFor="yearOfManufacture">Year of Manufacture:</label>
                    <Select
                        value={newWatchForm.yearOfManufacture}
                        onChange={(value) => setNewWatchForm((prevForm) => ({
                            ...prevForm,
                            yearOfManufacture: value
                        }))}
                    >
                        {years.map((year) => (
                            <Option key={year} value={year}>
                                {year}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="limitedEdition">Limited Edition:</label>
                    <Checkbox
                        id="limitedEdition"
                        name="limitedEdition"
                        checked={newWatchForm.limitedEdition}
                        onChange={handleLimitedEditionChange}

                        
                    >
                        
                    </Checkbox>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit" className={styles.buttonOther}>Submit</button>
            </form>
        </div>
    );
};

