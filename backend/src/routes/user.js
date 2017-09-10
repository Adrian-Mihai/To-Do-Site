const express = require('express');
const router = express.Router();

const userControler = require('../controllers/user_controller');

router.post('/', userControler.RegistPost);

module.exports = router;
