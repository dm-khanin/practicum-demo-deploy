require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admins');
const { PORT, MONGO_URI } = require('./utils/constants');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', (req, res) => {
  res.send('ok');
});
app.use('/', usersRouter);
app.use('/', adminRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
