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

const checkBody = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Email или пароль не могут быть пустыми' });
  }

  next();
};

module.exports = { getJwtToken, isAuthorized, checkBody };
