import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Allow CORS for both frontends
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Student and Admin frontend
    credentials: true,
  })
);

// Routes for authentication
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
