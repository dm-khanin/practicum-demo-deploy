const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const { JWT_SECRET } = require('../utils/constants');

const getJwtToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

const isAuthorized = (token) => {
  return jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) return false;

    return Admin.findOne({ _id: decoded.id }).then((admin) => {
      return Boolean(admin);
    });
  });
};

module.exports = { getJwtToken, isAuthorized };
