import Product from "../models/product.model.js";
import { Admin } from "../models/user.model.js";


export const addProduct = async (req, res) => {
  try {
    const { name, description, category, stock, image } = req.body;
    const adminId = req.user.id; 
    // Ensure the user is an admin
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Admin access only" });
    }

    // Create new product
    const newProduct = await Product.create({
      name,
      description,
      category,
      stock,
      image,
      owner: adminId, // Set owner as the admin
    });

    
    admin.listedProducts.push(newProduct._id);
    await admin.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};



export const getProductUsers = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate(
      "studentsTaken",
      "name email rollNumber"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product: product.name, studentsUsing: product.studentsTaken });
  } catch (error) {
    console.error("Error in getProductUsers:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getLowStockProducts = async (req, res) => {
  try {
    const threshold = 5; // Define low-stock threshold
    const lowStockProducts = await Product.find({ stock: { $lt: threshold } });

    res.json({ message: "Low stock products", products: lowStockProducts });
  } catch (error) {
    console.error("Error in getLowStockProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};