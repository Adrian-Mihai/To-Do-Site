const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project_controller');

router.post('/add_project', projectController.addProject);
router.get('/show_project', projectController.getAll);

module.exports = router;