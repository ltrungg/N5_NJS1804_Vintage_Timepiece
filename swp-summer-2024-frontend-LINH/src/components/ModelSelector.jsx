import React from 'react';
import '../styles/watch-form.css';

const ModelSelector = ({ brand, onSelectModel }) => {
  return (
    <div className="model-selector-container">
      {brand.models.map((model, index) => (
        <div key={index} className="model-card">
          <img src={model.image} alt={model.name} className="model-image" />
          <div className="model-details">
            <h3 className="model-name">{model.name}</h3>
            <p className="model-description">{model.description}</p>
            <button onClick={() => onSelectModel(model)} className="select-button">
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelSelector;
