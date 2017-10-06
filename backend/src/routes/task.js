const express = require('express');
const router = express.Router();

taskController = require('../controllers/task_controller');

router.post('/add_task', taskController.addTask);
router.get('/get_task/:id', taskController.getTask);

module.exports= router;