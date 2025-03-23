import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const options = { discriminatorKey: "role", timestamps: true };

// Base User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  options
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

// ** Student Schema **
const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, unique: true, sparse: true },
  department: String,
  yearOfStudy: { type: Number, min: 1, max: 4 },
});

const Student = User.discriminator("student", studentSchema);

// ** Admin Schema **
const adminSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true },
  designation: String,
});

const Admin = User.discriminator("admin", adminSchema);

export { User, Student, Admin };
