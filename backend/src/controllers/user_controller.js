const knex = require("../../database/database.js");
const bcrypt = require("bcrypt");
const usefulFunction = require("../method/function");
const saltRounds = 10;

const userController = {};

userController.Login = (req, res) => {
  const userData = req.body;
  if (usefulFunction.checkNull(userData)) {
    return res.status(400).send("Fields cannot be null");
  } else {
    knex("users")
      .first("*")
      .where("user_name", userData.user_name)
      .then(data => {
        if (data) {
          hash = data.user_password;
          bcrypt.compare(userData.user_password, hash, (err, response) => {
            if (response) {
              let cooki = {
                id: data.id.toString()
              };
              return res.status(200).send(cooki);
            } else {
              return res.status(400).send("Incorrect password");
            }
          });
        } else {
          res.status(400).send("Incorrect name");
        }
      })
      .catch(() => {
        res.status(500).send("DB error");
      });
  }
};

userController.Regist = (req, res) => {
  const userData = req.body;
  userData.user_point = 0;
  if (req.files) {
    userData.user_picture = req.files[0].filename;
  } else {
    userData.user_picture = "null";
  }
  knex("users")
    .first("*")
    .where("user_name", userData.user_name)
    .then(data => {
      if (data) {
        return res.status(400).send("User name already exist");
      } else {
        bcrypt.hash(userData.user_password, saltRounds, (err, hash) => {
          userData.user_password = hash;
          knex("users")
            .insert(userData)
            .then(() => {
              knex("users")
                .first("*")
                .where("user_name", userData.user_name)
                .then(data => {
                  let cooki = {
                    id: data.id.toString()
                  };
                  return res.status(200).send(cooki);
                })
                .catch(err => {
                  console.log(err.message);
                  return res.status(500).send(err.message);
                });
            })
            .catch(err => {
              console.log(err.message);
              return res.status(500).send(err.message);
            });
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      return res.status(500).send(err.message);
    });
};

userController.getAll = (req, res) => {
  knex("users")
    .select("*")
    .where("user_visibility", "Public")
    .then(response => {
      let data = [];
      for (let i = 0; i < response.length; i++) {
        let userInfo = {};
        userInfo.id = response[i].id;
        userInfo.name = response[i].user_name;
        userInfo.email = response[i].user_email;
        userInfo.description = response[i].user_description;
        userInfo.picture = response[i].user_picture;
        data[i] = userInfo;
      }
      return res.status(200).send(data);
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send(err.message);
    });
};

userController.getUserById = (req, res) => {
  const id = req.params.id;
  knex("users")
    .first("user_description", "user_visibility", "user_picture", "user_name")
    .where("id", id)
    .then(data => {
      return res.status(200).send(data);
    })
    .catch(err => {
      console.log(err.message);
      return res.status(500).send(err);
    });
};

userController.editUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (req.files) {
    data.user_picture = req.files[0].filename;
  }
  knex("users")
    .where("id", id)
    .update(data)
    .then(() => {
      return res.status(200).send("Success");
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(err);
    });
};

userController.getPoints = (req, res) => {
  knex("projects")
    .select("project_point")
    .where("user_id", req.params.id)
    .then(response => {
      let result = 0;
      for (let i = 0; i < response.length; i++) {
        result += response[i].project_point;
      }
      return res.status(200).send(result.toString());
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send(err.message);
    });
};

module.exports = userController;
