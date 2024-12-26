require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const app = express();

// Database connection
require("./models/index");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port no. ${port}`);
});
