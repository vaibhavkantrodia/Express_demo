const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET;
  try {
    if (!token) {
      return res.status(403).send({ message: 'Forbidden' })
    }
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function authenticateToken(allowedRoles) {
  return function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(403);
    }
    const result = verifyAccessToken(token);
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
    req.user = result.data;
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).send({ message: 'You are not authorized to access this resource.' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
};
