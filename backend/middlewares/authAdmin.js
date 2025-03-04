const jwt = require("jsonwebtoken");

// Admin Auth

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: "Not Authorize login First" });
    }
    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decodedToken.email !== process.env.ADMIN_EMAIl) {
      return res.json({ success: false, message: "Not Admin login First" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = authAdmin;
