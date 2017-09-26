const knex = require('../../database/database.js');
const bcrypt = require('bcrypt');
const usefulFunction = require('../method/function');
const saltRounds = 10;

const userController = {};

userController.Login = (req, res) => {
  const userData = req.body;
  if(usefulFunction.checkNull(userData)){
    return res.status(400).send('Fields cannot be null');
  }else{
    knex('users')
        .first('*')
        .where('user_name', userData.user_name)
        .then( data =>{
          if(data){
            hash = data.user_password;
            bcrypt.compare(userData.user_password, hash, (err, response) =>{
              if(response){
                  let cooki = {
                      id : data.id.toString(),
                      name : data.user_name.charAt(0).toUpperCase(),
                  };
                  return res.status(200).send(cooki);
              }else{
                return res.status(400).send('Incorrect password');
              }
            });
          }else{
            res.status(400).send('Incorrect name');
          }
        }).catch(() =>{
          res.status(500).send('DB error');
    });
  }
};

userController.Regist = (req, res) => {
  const userData = req.body;
  if (usefulFunction.checkNull(userData)) {
    return res.status(400).send('Fields cannot be null');
  } else {
    knex('users')
      .first('*')
      .where('user_name', userData.user_name)
      .then(data => {
        if (data) {
          return res.status(400).send('User name already exist');
        } else {
          bcrypt.hash(userData.user_password, saltRounds, (err, hash) => {
            userData.user_password = hash;
            knex('users')
              .insert(userData)
              .then(() => {
                knex('users')
                  .first('*')
                  .where('user_name', userData.user_name)
                  .then(data => {
                      let cooki = {
                          id : data.id.toString(),
                          name : data.user_name.charAt(0).toUpperCase(),
                      };
                    return res.status(200).send(cooki);
                  })
                  .catch(() => {
                    return res.status(500).send('DB error');
                  });
              })
              .catch(() => {
                return res.status(500).send('DB error');
              });
          });
        }
      })
      .catch(() => {
          return res.status(500).send('DB error');
      });
  }
};

module.exports = userController;
