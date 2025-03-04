const jwt = require("jsonwebtoken");

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorize login First" });
    }
    const decodedToken = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.body.docId = decodedToken.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = authDoctor;
