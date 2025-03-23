import Product from "../models/product.model.js";
import { Student } from "../models/user.model.js";

// Student takes a product
export const takeProduct = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < 1)
      return res.status(400).json({ message: "Product is out of stock" });

    // Decrease product stock
    product.stock -= 1;
    await product.save();

    // Find the student
    const student = await Student.findById(studentId);

    // Check if the student already has this product
    const productIndex = student.assignedProducts.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      // If student already has the product, increment quantity
      student.assignedProducts[productIndex].quantity += 1;
    } else {
      // Otherwise, add the product to their list
      student.assignedProducts.push({ productId, quantity: 1 });
    }

    await student.save();

    res.json({ message: "Product taken successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Student returns one unit of a product
export const returnProduct = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find the student
    const student = await Student.findById(studentId);

    // Find the product in the student's assigned list
    const productIndex = student.assignedProducts.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1)
      return res
        .status(400)
        .json({ message: "You haven't taken this product" });

    // Reduce the quantity by 1
    if (student.assignedProducts[productIndex].quantity > 1) {
      student.assignedProducts[productIndex].quantity -= 1;
    } else {
      // Remove product from student's assigned list if quantity reaches 0
      student.assignedProducts.splice(productIndex, 1);
    }

    // Increase product stock
    product.stock += 1;
    await product.save();
    await student.save();

    res.json({ message: "Product returned successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
