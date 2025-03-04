const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const doctorModel = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const appoinmentModel = require("../models/appoinmeentModel");
const userModel = require("../models/userModel");

// API fo add Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all Data for add Doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({
        success: false,
        message: "All filed are requird",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter A valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    // Upload Image to cloude
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Create Doctor Data
    const doctorData = {
      name,
      email,
      password: hassedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
    };

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor Add Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Doctor Add faild",
    });
  }
};

// API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIl &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const adminToken = jwt.sign(
        {
          email: email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        success: true,
        adminToken: adminToken,
      });
    } else {
      res.json({ success: false, message: "Invalid login Details" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all Doctor for Admin
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get All Appoinment list
const allAppoinmentAdmin = async (req, res) => {
  try {
    const appoinment = await appoinmentModel.find({});
    res.json({
      success: true,
      appoinment,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for Cancle Appoinment by Admin
const cancleAppoinmentByAdmin = async (req, res) => {
  try {
    const { appoinmentId } = req.body;
    const appoinmentData = await appoinmentModel.findById(appoinmentId);

    await appoinmentModel.findByIdAndUpdate(appoinmentId, { cancelled: true });

    //releasing doctor slot
    const { docId, slotDate, slotTime } = appoinmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appoinment canclled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for get Dashboard Data for Admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appoinments = await appoinmentModel.find({});
    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appoinments: appoinments.length,
      letestAppoinments: appoinments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  addDoctor,
  loginAdmin,
  allDoctors,
  allAppoinmentAdmin,
  cancleAppoinmentByAdmin,
  adminDashboard,
};
