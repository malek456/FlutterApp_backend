import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import categoryRoutes from "./routes/categories.js";
import courseRoutes from "./routes/courses.js";
import authRoutes from "./routes/auth.user.js";
import participationRoutes from "./routes/participation.js";
import { json } from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/participation", participationRoutes);

app.use("/", async (req, res) => {
  res.json({ mesage: "Server started" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
