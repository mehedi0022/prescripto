const express = require("express");
const {
  regsterUser,
  userLogin,
  getProfile,
  updateUserProfile,
  bookAppoinment,
  listAppointment,
  cancleAppoinment,
} = require("../controllers/userControllers");
const authUser = require("../middlewares/authUser");
const upload = require("../middlewares/multer");
const userRoute = express.Router();

userRoute.post("/register", regsterUser);
userRoute.post("/login", userLogin);
userRoute.get("/get-profile", authUser, getProfile);
userRoute.get("/appoinments", authUser, listAppointment);
userRoute.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateUserProfile
);

userRoute.post("/book-appointment", authUser, bookAppoinment);
userRoute.post("/cancle-appointment", authUser, cancleAppoinment);

module.exports = userRoute;
