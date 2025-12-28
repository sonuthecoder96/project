const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const apiRoutes = require("./routes"); // Automatically looks for routes/index.js

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. Mount All Routes
app.use("/api", apiRoutes);

// 4. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
