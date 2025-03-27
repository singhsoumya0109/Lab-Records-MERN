import React, { Component } from "react";
import useProductStore from "../stores/useProductStore";

export default class AllProducts extends Component {
  state = {
    products: [],
    loading: false,
    error: null,
  };

  async componentDidMount() {
    const store = useProductStore;
    try {
      this.setState({ loading: true, error: null });
      await store.getState().fetchAllProducts();
      const products = store.getState().products;
      this.setState({ products, loading: false });
    } catch (err) {
      this.setState({
        error: "Failed to fetch products",
        loading: false,
      });
    }
  }

  render() {
    const { products, loading, error } = this.state;

    return (
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-700"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm">{product.description}</p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Stock:</span> {product.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
