const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');


router.post('/login', userController.Login);
router.post('/regist', userController.Regist);
router.get('/users', userController.getAll);

module.exports = router;
