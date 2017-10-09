const express = require("express");
const router = express.Router();

taskController = require("../controllers/task_controller");

router.post("/add_task", taskController.addTask);
router.get("/get_task/:id", taskController.getTask);
router.get("/get_task_by_id/:id", taskController.getTaskById);
router.put("/edit_task/:id", taskController.editTask);
router.delete("/delete_task/:id", taskController.deleteTask);
module.exports = router;
