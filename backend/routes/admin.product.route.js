import express from "express";
import {
  addProduct,
  getProductUsers,
  getLowStockProducts,
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

export default router;
