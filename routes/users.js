const router = require('express').Router();
const { getUsers, getProfile, registerUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getProfile);
router.post('/users', registerUser);

module.exports = router;
