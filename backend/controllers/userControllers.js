const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");
const appoinmentModel = require("../models/appoinmeentModel");
const cloudinary = require("cloudinary").v2;

// API to register user
const regsterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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

    const userData = {
      name,
      email,
      password: hassedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      message: "User Add Successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalide Creadintials " });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        message: "Login Success",
      });
    } else {
      res.json({ success: false, message: "Invalide Creadintials " });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile Data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");
    res.json({
      success: true,
      userData,
      message: "Login Success",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // Uploade image
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API Book Appoinment
const bookAppoinment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor Not Available",
      });
    }

    let slots_booked = docData.slots_booked;
    //Checkin Slot avaliblity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot Not Available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appoinmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppoinment = new appoinmentModel(appoinmentData);
    await newAppoinment.save();

    // Save New Slots Data  in Docts
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appoinment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Must Select Appoinment Time" });
  }
};

// API to get User Appoinments

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const Appoinments = await appoinmentModel.find({ userId });

    res.json({ success: true, Appoinments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancle Appoinments
const cancleAppoinment = async (req, res) => {
  try {
    const { userId, appoinmentId } = req.body;
    const appoinmentData = await appoinmentModel.findById(appoinmentId);

    // Verify user
    if (appoinmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

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

// App to make Payment
const paymentFees = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  regsterUser,
  userLogin,
  getProfile,
  updateUserProfile,
  bookAppoinment,
  listAppointment,
  cancleAppoinment,
};
