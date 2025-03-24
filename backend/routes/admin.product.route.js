import express from "express";
import {
  addProduct,
  getProductUsers,
  getLowStockProducts,
  getMyListedProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.product.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin-only routes
router.post("/add-product", isAuthenticated, isAdmin, addProduct);
router.get(
  "/product-users/:productId",
  isAuthenticated,
  isAdmin,
  getProductUsers
);
router.get("/low-stock", isAuthenticated, isAdmin, getLowStockProducts);

// Get all products listed by the admin
router.get("/my-products", isAuthenticated, isAdmin, getMyListedProducts);

// Update product details
router.put(
  "/update-product/:productId",
  isAuthenticated,
  isAdmin,
  updateProduct
);

// Delete a product
router.delete(
  "/delete-product/:productId",
  isAuthenticated,
  isAdmin,
  deleteProduct
);

export default router;
