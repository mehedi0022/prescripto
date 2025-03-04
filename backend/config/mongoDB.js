const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URL}/prescripto`)
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.log("Databse Error");
    });
};

module.exports = connectDB;
