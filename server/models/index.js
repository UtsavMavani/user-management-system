const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB successfully connected."))
  .catch((error) => console.error("MongoDB connection error:", error));
