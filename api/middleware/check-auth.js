const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // načtení tokenu z headers (+ vypreparování samotného tokenu, tj. odstranění "Bearer ")
    const token = req.headers.authorization.split(" ")[1];

    // jwt.verify vrací dekódovaný token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Auth failed" });
  }

  next();
};
