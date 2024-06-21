import React, { useState } from 'react';
import styles from "../styles/watchForm.module.css";


export default function BrandSelector ({ brands, onSelectBrand, navigate }){
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBrand, setHoveredBrand] = useState(null);


  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOtherBrandForm = () => {
    
    // Chuyển hướng người dùng đến trang "sell"
    navigate('/OtherBrandForm');
  };

  const handleMouseEnter = (brand) => {
    setHoveredBrand(brand);
  };

  const handleMouseLeave = () => {
    setHoveredBrand(null);
  };

  return (
    <div className={styles.brandSelectorContainer}>
      <h2 className={styles.brandSelectorHeading}>Search your watch brand</h2>
      <div className={styles.brandSelectorSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.brandSelectorInput}
        />
      </div>
      <div className={styles.brandSelectorGrid}>
        {filteredBrands.map((brand, index) => (
          <div 
            key={index} 
            onClick={() => onSelectBrand(brand)} 
            onMouseEnter={() => handleMouseEnter(brand)} 
            onMouseLeave={handleMouseLeave} 
            className={styles.brandSelectorCard}
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className={styles.brandSelectorImage} 
            />
            <div className={styles.brandSelectorDetails}>
              <h3 className={styles.brandSelectorName}>{brand.name}</h3>
              {hoveredBrand === brand && (
                <div className={styles.brandSelectorInfo}>
                  <svg className={styles.infoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className={styles.infoText}>More info about {brand.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="brand-selector-button">
        <button className="brand-selector-dont-know" onClick={handleOtherBrandForm}>
          Don't know
        </button>
      </div>
    </div>
  );
};

