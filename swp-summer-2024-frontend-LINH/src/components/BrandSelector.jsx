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
   
    <div className="max-w-full ml-12 mt-12">
      <h2 className="text-2xl font-bold mb-4">Search your watch brand</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-fullw-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBrands.map((brand, index) => (
          <div 
            key={index} 
            onClick={() => onSelectBrand(brand)} 
            onMouseEnter={() => handleMouseEnter(brand)} 
            onMouseLeave={handleMouseLeave} 
            className="cursor-pointer rounded-md overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{brand.name}</h3>
              {hoveredBrand === brand && (
                <div className="flex items-center mt-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm">More info about {brand.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md transition-colors hover:bg-black" onClick={handleOtherBrandForm}>
          Don't know
        </button>
      </div>
    </div>
    
  );
};

