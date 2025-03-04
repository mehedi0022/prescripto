const express = require("express");
const {
  allAppoinmentAdmin,
  addDoctor,
  loginAdmin,
  allDoctors,
  cancleAppoinmentByAdmin,
  adminDashboard,
} = require("../controllers/adminControllers");
const upload = require("../middlewares/multer");
const authAdmin = require("../middlewares/authAdmin");
const { changeAvailablity } = require("../controllers/doctorControllers");
const adminRoute = express.Router();

adminRoute.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRoute.post("/login", loginAdmin);
adminRoute.get("/all-doctors", authAdmin, allDoctors);
adminRoute.post("/change-availablity", authAdmin, changeAvailablity);
adminRoute.get("/appoinments", authAdmin, allAppoinmentAdmin);
adminRoute.post("/cancle-appoinment", authAdmin, cancleAppoinmentByAdmin);
adminRoute.get("/dashboard", authAdmin, adminDashboard);

module.exports = adminRoute;
