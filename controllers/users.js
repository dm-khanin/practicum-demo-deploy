const User = require('../models/user');
const { isAuthorized } = require('../utils');

const getUsers = async (req, res) => {
  if (!isAuthorized(req.headers.authorization)) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
};

const getProfile = (req, res) => {
  if (!isAuthorized(req.headers.authorization)) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  return User.findOne({ id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      return res.status(200).send(user);
    })
    .catch((err) => res.status(400).send(err));
};

const registerUser = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Имя не может быть пустым' });
  }

  return User.findOne({ name })
    .then((user) => {
      if (user) {
        return res.status(403).send({ message: 'Такой пользователь уже существует' });
      }

      return User.create(req.body);
    })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUsers, getProfile, registerUser };
