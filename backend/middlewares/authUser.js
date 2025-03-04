const jwt = require("jsonwebtoken");

// user Auth

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorize login First" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decodedToken.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = authUser;
