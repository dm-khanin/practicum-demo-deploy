const router = require('express').Router();
const { registerAdmin, authAdmin } = require('../controllers/admins');
const { checkBody } = require('../utils');

router.post('/register', checkBody, registerAdmin);
router.post('/auth', checkBody, authAdmin);

module.exports = router;
