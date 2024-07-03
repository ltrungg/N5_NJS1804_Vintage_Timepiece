import React from "react";

export default function Appraisers() {
  const [products, setProducts] = React.useState([
    { id: 1, name: "Watch 1", details: "Details about Watch 1" },
    { id: 2, name: "Watch 2", details: "Details about Watch 2" },
    { id: 3, name: "Watch 3", details: "Details about Watch 3" },
  ]);

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [appraisal, setAppraisal] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleAppraisalSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-full p-10 border border-gray-300 rounded-lg shadow-lg bg-white mx-5 mt-5">
      <h1 className="text-2xl font-bold mb-4">Appraisers Page</h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold">Products to Appraise:</h2>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedProduct && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Selected Product:</h2>
          <p>{selectedProduct.details}</p>
        </div>
      )}

      <form onSubmit={handleAppraisalSubmit}>
        <div className="mb-4">
          <label htmlFor="appraisal" className="block font-bold mb-2">
            Appraisal:
          </label>
          <textarea
            id="appraisal"
            className="w-full p-2 border border-gray-300 rounded"
            value={appraisal}
            onChange={(e) => setAppraisal(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="value" className="block font-bold mb-2">
            Value:
          </label>
          <input
            type="text"
            id="value"
            className="w-full p-2 border border-gray-300 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Appraisal
        </button>
      </form>
    </div>
  );
}
