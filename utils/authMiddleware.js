require("dotenv").config();
const jwt = require("jsonwebtoken");

// Set up the authorization middleware
const authMiddleware = (req, res, next) => {
  // Get the token from the request
  const token = req.headers.authorization;

  // If there is no token, return an unauthorized response
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  // Parse the token using jsonwebtoken
  try {
    const secret = process.env.SECRET;

    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
      }
      const token = req.headers["authorization"].split(" ")[1];
      if (!token) {
        return res.status(401).send("Access denied. No token provided.");
      }
      try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        req.user = decoded.user;
        next();
      } catch (err) {
        res.status(400).send("Invalid token.");
      }
    // console.log(secret);
    // let decoded = jwt.verify(token, secret);
    // console.log(decoded);
    // if (decoded) {
    //   console.log(decoded);
    //   req.user = decoded;
    //   next();
    // } else {
    //   return res.status(401).send({ error: "Unauthorized" });
    // }
  } catch (err) {
    console.log(err.message);
    // If the token is invalid, return an unauthorized response
    return res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
