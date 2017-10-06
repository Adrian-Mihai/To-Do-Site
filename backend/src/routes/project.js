const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project_controller');

router.post('/add_project', projectController.addProject);
router.get('/show_project/:id', projectController.getAll);
router.put('/vote_project/:id', projectController.voteProject);
router.get('/edit_project/:id', projectController.getById);
router.put('/edit_project/:id', projectController.editProject);
router.delete('/delete_project/:id', projectController.deleteProject);

module.exports = router;