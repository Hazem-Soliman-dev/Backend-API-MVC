const jwt = require("jsonwebtoken");
const secretKey =
  "cx#I6MgD('8-3{cuZ*-(o5/OwfAwpgrnxcD*}?YNf^W.$3Cj4:_4L_=@RBDn)+5";

exports.createAccessToken = (data) => jwt.sign(data, secretKey, { expiresIn: "8h" });

exports.authMW = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      next();
    } else {
      return res.status(401).json({ error: "Access denied, token missing" });
    }
  } catch (err) {
    const error = err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token";
    return res.status(401).json({ error: `${error}, access denied` });
  }
};

exports.adminMW = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token && jwt.verify(token, secretKey).role === "Admin") {
      next();
    } else {
      return res.status(401).json({ error: "Access denied, admin privileges required" });
    }
  } catch (err) {
    const error = err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token";
    return res.status(401).json({ error: `${error}, access denied` });
  }
};

exports.supplierMW = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token && jwt.verify(token, secretKey).role === "Supplier") {
      next();
    } else {
      return res.status(401).json({ error: "Access denied, supplier privileges required" });
    }
  } catch (err) {
    const error = err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token";
    return res.status(401).json({ error: `${error}, access denied` });
  }
};

