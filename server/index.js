require("dotenv").config();
const express = require("express");
const router = require("./router/index");
const app = express();

// Database connection
require("./models/index");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port no. ${port}`);
});
