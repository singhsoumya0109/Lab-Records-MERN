import { create } from "zustand";
import {
  addProduct,
  getAllProducts,
  getMyProducts,
  getLowStockProducts,
  getProductUsers,
  updateProduct,
  deleteProduct,
} from "../lib/axios";

const useProductStore = create((set) => ({
  products: [],
  myProducts: [],
  lowStockProducts: [],
  productUsers: [],
  loading: false,
  error: null,

  // Fetch all products
  fetchAllProducts: async () => {
    try {
      set({ loading: true, error: null });
        const { data } = await getAllProducts();
        console.log(data);
      set({ products: data.products, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch products",
        loading: false,
      });
    }
  },

  // Fetch my listed products
  fetchMyProducts: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await getMyProducts();
      set({ myProducts: data.products, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch your products",
        loading: false,
      });
    }
  },

  // Fetch low stock products
  fetchLowStockProducts: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await getLowStockProducts();
      set({ lowStockProducts: data.products, loading: false });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch low stock products",
        loading: false,
      });
    }
  },

  // Fetch users using a product
  fetchProductUsers: async (productId) => {
    try {
      set({ loading: true, error: null });
      const { data } = await getProductUsers(productId);
      set({ productUsers: data.users, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch product users",
        loading: false,
      });
    }
  },

  // Add product
  createProduct: async (productData) => {
    try {
      set({ loading: true, error: null });
      await addProduct(productData);
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add product",
        loading: false,
      });
    }
  },

  // Update product
  editProduct: async (productId, updatedData) => {
    try {
      set({ loading: true, error: null });
      await updateProduct(productId, updatedData);
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update product",
        loading: false,
      });
    }
  },

  // Delete product
  removeProduct: async (productId) => {
    try {
      set({ loading: true, error: null });
      await deleteProduct(productId);
      set({ loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete product",
        loading: false,
      });
    }
  },

  // Clear errors
  clearError: () => set({ error: null }),
}));

export default useProductStore;
