const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/parrots',
  JWT_SECRET = 'never share your secret',
  SALT_ROUNDS = '10',
} = process.env;

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  SALT_ROUNDS: parseInt(SALT_ROUNDS, 10),
};
