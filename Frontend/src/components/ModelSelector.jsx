import React from 'react';

const ModelSelector = ({ brand, onSelectModel }) => {
  return (
    <div>
      <h2>Select your {brand.name} model:</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {brand.models.map((model, index) => (
          <div key={index} onClick={() => onSelectModel(model)} style={{ cursor: 'pointer' }}>
            <img src={model.image} alt={model.name} style={{ width: '100px', height: '100px' }} />
            <p>{model.name}</p>
            <p>{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
