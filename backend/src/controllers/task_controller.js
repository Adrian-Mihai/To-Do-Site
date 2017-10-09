const knex = require("../../database/database");
const usefulFunction = require("../method/function");

const moment = require("moment");
const date = moment().format("YYYY-MM-DD HH:mm:ss");

const taskController = {};

taskController.addTask = (req, res) => {
  const data = req.body;
  data.task_status = "To Do";
  data.task_date = date;
  if (usefulFunction.checkNull(data)) {
    return res.status(400).send("Fields cannot be null");
  } else {
    knex("tasks")
      .first("*")
      .where("project_id", data.project_id)
      .andWhere("task_title", data.task_title)
      .then(response => {
        if (response) {
          return res.status(400).send("Task already exist");
        } else {
          knex("tasks")
            .insert(data)
            .then(() => {
              return res.status(200).send("Success");
            })
            .catch(err => {
              console.log(err.message);
              return res.status(200).send(err);
            });
        }
      })
      .catch(err => {
        console.log(err.message);
        return res.status(500).send("err");
      });
  }
};

taskController.getTask = (req, res) => {
  const id = req.params.id;
  knex("tasks")
    .select("*")
    .where("project_id", id)
    .then(response => {
      if (response.length !== 0) {
        return res.status(200).send(response);
      } else {
        return res.status(400).send("No task found");
      }
    })
    .catch(err => {
      console.log(err.message);
      return res.status(500).send(err.message);
    });
};

taskController.getTaskById = (req, res) => {
  const id = req.params.id;
  knex("tasks")
    .first("*")
    .where("id", id)
    .then(response => {
      if (response) {
        return res.status(200).send(response);
      } else {
        return res.status(400).send("Task not found");
      }
    })
    .catch(err => {
      console.log(err.message);
      return res.status(500).send(err);
    });
};

taskController.editTask = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  data.task_date = date;
  knex("tasks")
    .where("id", id)
    .update(data)
    .then(() => {
      return res.status(200).send("Success");
    })
    .catch(err => {
      console.log(err.message);
    });
};

taskController.deleteTask = (req, res) => {
  const id = req.params.id;
  knex("tasks")
    .where("id", id)
    .del()
    .then(() => {
      return res.status(200).send("Success");
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send(err.message);
    });
};

module.exports = taskController;
