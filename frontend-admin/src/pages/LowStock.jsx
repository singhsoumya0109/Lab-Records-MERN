import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../stores/useProductStore";

const LowStock = () => {
  const { lowStockProducts, fetchLowStockProducts, loading, error } =
    useProductStore();

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Low Stock Products
      </h1>

      {loading && (
        <p className="text-center text-blue-500 dark:text-blue-400">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      )}

      {lowStockProducts.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No low stock products found.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {lowStockProducts.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="w-full  bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg transition-shadow">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Stock:</strong> {product.stock}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  <strong>Description:</strong> {product.description}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  <strong>Category:</strong> {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowStock;
