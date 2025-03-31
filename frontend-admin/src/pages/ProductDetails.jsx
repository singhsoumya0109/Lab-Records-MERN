import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../stores/useProductStore";

const ProductDetails = () => {
  const { productId } = useParams();
  const { productDetails, fetchProductDetails, loading, error } =
    useProductStore();

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId, fetchProductDetails]);

  if (loading) {
    return <div className="text-center text-lg text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!productDetails) {
    return <div className="text-center text-gray-400">Product not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg w-100">
        <h1 className="text-2xl font-bold mb-4">{productDetails.name}</h1>
        <img
          src={productDetails.image}
          alt={productDetails.name}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <p className="mt-4 text-gray-300">{productDetails.description}</p>
        <p className="mt-2 text-gray-400">
          Category: {productDetails.category}
        </p>
        <p className="mt-2 text-gray-400">Stock: {productDetails.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
