const express = require("express");
const doctorRoute = express.Router();

const {
  doctorlist,
  doctorLogin,
  doctorAppointments,
  appoinmentCancled,
  markAsCompleted,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} = require("../controllers/doctorControllers");

const authDoctor = require("../middlewares/authDoctor");

doctorRoute.get("/list", doctorlist);
doctorRoute.post("/login", doctorLogin);
doctorRoute.get("/appointments", authDoctor, doctorAppointments);
doctorRoute.post("/complete-appointment", authDoctor, markAsCompleted);
doctorRoute.post("/cancle-appointment", authDoctor, appoinmentCancled);
doctorRoute.get("/dashboard", authDoctor, doctorDashboard);
doctorRoute.get("/profile", authDoctor, doctorProfile);
doctorRoute.post("/update-profile", authDoctor, updateDoctorProfile);

module.exports = doctorRoute;
