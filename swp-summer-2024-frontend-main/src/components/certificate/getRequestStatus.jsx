import axios from "axios";

export const getRequestStatus = async () => {
  try {
    const response = await axios.get("http://localhost:3000/product");
    const products = response.data;

    const productsInAppraisal = products.filter(
      (product) => product.status === "IN APPRAISAL"
    );

    const updateRequests = productsInAppraisal.map(async (product) => {
      const { id } = product;
      const patchResponse = await axios.patch(
        `http://localhost:3000/product/${id}`,
        {
          status: "AVAILABLE",
          price: product.startingPrice,
        }
      );
      return patchResponse.data;
    });

    await Promise.all(updateRequests);

    console.log("All products in appraisal updated successfully");
  } catch (error) {
    console.error("Error updating products in appraisal:", error);
    throw error;
  }
};


