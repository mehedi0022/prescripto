const mongoose = require("mongoose");

const appoinmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: String, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  },
  { minimize: false, versionKey: false, timestamps: true }
);

const appoinmentModel =
  mongoose.models.appoinment || mongoose.model("appoinment", appoinmentSchema);

module.exports = appoinmentModel;
