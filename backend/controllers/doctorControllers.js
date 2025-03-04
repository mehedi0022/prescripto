const doctorModel = require("../models/doctorModel");
const bicrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appoinmentModel = require("../models/appoinmeentModel");

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({
      success: true,
      message: "Availablity Changed Successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const doctorlist = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({
      success: true,
      doctors,
      message: "Availablity Changed Successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Api for doctor login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bicrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });
    } else {
      const token = jwt.sign(
        { id: doctor._id, role: "doctor" },
        process.env.JWT_SECRET
      );

      res.json({
        success: true,
        token,
        message: "Login Successfully",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Api for get doctor appointments
const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appoinmentModel.find({ docId });

    res.json({
      success: true,
      appointments,
      message: "Appointments Fetched Successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for mark appointment as completed
const markAsCompleted = async (req, res) => {
  try {
    const { docId, appoinmentId } = req.body;
    const appointmentData = await appoinmentModel.findById(appoinmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appoinmentModel.findByIdAndUpdate(appoinmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment Completed Successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Appointment Id",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// API for cancle appointment for doctor
const appoinmentCancled = async (req, res) => {
  try {
    const { docId, appoinmentId } = req.body;

    const appointmentData = await appoinmentModel.findById(appoinmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appoinmentModel.findByIdAndUpdate(appoinmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Appointment Id",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for get dashboard data for doctor
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appoinmentModel.find({ docId });

    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += Number(item.amount);
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const totalAppointments = appointments.length;
    const pendingAppointments = appointments.filter(
      (item) => !item.isCompleted && !item.cancelled
    ).length;
    const completedAppointments = appointments.filter(
      (item) => item.isCompleted
    ).length;
    const cancelledAppointments = appointments.filter(
      (item) => item.cancelled
    ).length;

    const dashboardData = {
      earnings,
      totalAppointments,
      pendingAppointments,
      completedAppointments,
      cancelledAppointments,
      patients: patients.length,
      latestAppoinments: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Api for get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Api for update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available,
    });

    res.json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  changeAvailablity,
  doctorlist,
  doctorLogin,
  doctorAppointments,
  markAsCompleted,
  appoinmentCancled,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
