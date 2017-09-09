const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/',)
router.post('/',userController.login);


module.exports = router;