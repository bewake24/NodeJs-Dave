const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  console.log(authHeader); // Bearer then_access_token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401); //Unauthorised; Invalid Token This means token is tampered or expired.
    console.log(decoded)
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles
    next();
  });
};

module.exports = verifyJWT;
