import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../stores/useUserStore";
import useProductStore from "../stores/useProductStore";
import useOrderStore from "../stores/useOrderStore";

const ProductDetailsPage = ({ role }) => {
  const { productId } = useParams();
  const { isLoggedIn } = useAuthStore();
  const { selectedProduct, productLoading, productError, fetchProductDetails } =
    useProductStore();
  const { studentProducts, orderLoading, takeProduct, returnProduct } =
    useOrderStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchProductDetails(role, productId);
    }
  }, [productId, isLoggedIn, fetchProductDetails, role]);

  if (productLoading)
    return <p className="text-gray-300 text-center text-lg">Loading...</p>;
  if (productError)
    return <p className="text-red-500 text-center text-lg">{productError}</p>;
  if (!selectedProduct)
    return (
      <p className="text-gray-300 text-center text-lg">Product not found.</p>
    );

  const isTaken = studentProducts.includes(productId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="bg-gray-800 shadow-2xl rounded-lg p-8 max-w-3xl w-full text-white">
        <h2 className="text-4xl font-extrabold text-center">
          {selectedProduct.name}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-80 h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="text-lg space-y-4">
            <p className="bg-gray-700 inline-block px-3 py-1 rounded-full text-sm uppercase tracking-wider">
              {selectedProduct.category}
            </p>
            <p className="text-gray-300">{selectedProduct.description}</p>

            <p className="text-gray-400">
              <span className="font-semibold text-gray-200">Stock: </span>
              {selectedProduct.stock}
            </p>

            {/* Take & Return Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => takeProduct(role, productId)}
                disabled={orderLoading || isTaken}
                className={`px-4 py-2 rounded-lg text-white font-bold transition ${
                  isTaken
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                } ${orderLoading && "opacity-50 cursor-not-allowed"}`}
              >
                {isTaken ? "Taken" : "Take"}
              </button>

              <button
                onClick={() => returnProduct(role, productId)}
                className={`px-4 py-2 rounded-lg text-white font-bold transition bg-red-500 hover:bg-red-600 ${
                  orderLoading && "opacity-50 cursor-not-allowed"
                }`}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
