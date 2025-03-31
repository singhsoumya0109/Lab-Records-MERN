import React, { Component } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../stores/useProductStore";

export default class MyProducts extends Component {
  state = {
    myProducts: [],
    loading: false,
    error: null,
    admin: null,
  };

  async componentDidMount() {
    const productStore = useProductStore;

    const admin = JSON.parse(localStorage.getItem("admin")) || null;
    this.setState({ admin });

    try {
      this.setState({ loading: true, error: null });
      await productStore.getState().fetchMyProducts();
      const myProducts = productStore.getState().myProducts || [];
      console.log("My Products:", myProducts);
      this.setState({ myProducts, loading: false });
    } catch (err) {
      this.setState({
        error: "Failed to fetch your products",
        loading: false,
      });
    }
  }

  render() {
    const { myProducts, loading, error } = this.state;

    return (
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
        <h2 className="text-2xl font-semibold mb-4">My Products</h2>
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {myProducts?.length === 0 && !loading && (
          <p className="text-gray-500">You haven't added any products yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {myProducts?.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
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
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
