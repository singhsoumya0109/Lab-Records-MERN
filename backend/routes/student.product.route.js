import express from "express";
import {
  takeProduct,
  returnProduct,
} from "../controllers/student.product.controller.js";
import {isAuthenticated, isStudent } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to take a product
router.post("/take/:productId", isAuthenticated,isStudent, takeProduct);

// Route to return a product
router.post("/return/:productId", isAuthenticated,isStudent, returnProduct);

export default router;
