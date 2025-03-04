const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectCloudinary = require("./config/cloudinary");
const connectDB = require("./config/mongoDB");
const adminRoute = require("./routes/adminRoute.js");
const doctorRoute = require("./routes/doctorRoute.js");

const userRoute = require("./routes/userRoute.js");
// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Api Working");
});

// Connect Database
connectDB();
// Connect Cloudinary
connectCloudinary();

// api end point
app.get("/", (req, res) => {
  res.send("App Working");
});

app.listen(port, () => {
  console.log("App running on port " + port);
});
