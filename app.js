const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const clientRoutes = require("./routes/clientRoutes");
const userRoutes = require("./routes/userRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "REN API is running",
  });
});

app.use("/api/clients", clientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/work-orders", workOrderRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
