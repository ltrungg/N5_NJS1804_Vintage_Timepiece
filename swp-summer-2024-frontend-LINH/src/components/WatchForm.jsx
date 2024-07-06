// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import BrandSelector from './BrandSelector';
// import ModelSelector from './ModelSelector';

// import { brands } from '../data/mockData';

// import { Content } from 'antd/es/layout/layout';
// import { useSellContext } from '../context/sellContext';

// export default function WatchForm(){
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const navigate = useNavigate();
//   const {updateWatchForm} = useSellContext

//   const handleSelectBrand = (brand) => {
//     setSelectedBrand(brand);
//   };

//   const handleBackToBrandSelection = () => {
//     setSelectedBrand(null);
//   };

//   const handleFormSubmit = (model) => {
//     if (selectedBrand && model) {
//       const brandName = selectedBrand.name;
      
//       updateWatchForm({ brand: brandName,
        
//           name: model.name, 
//           image: model.image,
//           description: model.description,
//           modelNumber: model.modelNumber,
//           serialNumber: model.serialNumber,
//           type: model.type,
//           caseMaterial: model.caseMaterial,
//           braceletMaterial: model.braceletMaterial,
//           caseColor: model.caseColor,
//           dialColor: model.dialColor,
//           caseSize: model.caseSize,
//           yearOfManufacture: model.yearOfManufacture,
//           limitedEdition: model.limitedEdition,
//           marketValue: model.marketValue });
//       navigate('/sellPage');
//     } else {
      
//       alert("please choose brand and model!");
//     }
//   };

//   return (
//     <Content className="flex justify-center">
//       <motion.div
//         className="min-h-screen flex items-center justify-center bg-gray-100"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -50 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="max-w-screen-xl w-500px p-8 bg-white rounded-lg shadow-lg overflow-hidden mx-auto">
//           {!selectedBrand ? (
//             <BrandSelector brands={brands} onSelectBrand={handleSelectBrand} navigate={navigate} />
//           ) : (
//             <>
//               <button
//                 onClick={handleBackToBrandSelection}
//                 className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Back to brands
//               </button>
//               <ModelSelector brand={selectedBrand} onSelectModel={handleFormSubmit} />
//             </>
//           )}
//         </div>
//       </motion.div>
//     </Content>
//   );
// };

