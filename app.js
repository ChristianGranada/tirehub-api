const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const clientRoutes = require("./routes/clientRoutes");
const tireRoutes = require("./routes/tireRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Retreading Management API is running",
  });
});

app.use("/api/clients", clientRoutes);
app.use("/api/tires", tireRoutes);
app.use("/api/work-orders", workOrderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
