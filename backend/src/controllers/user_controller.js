const knex = require('../../database/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userController = {};


userController.LoginGet(req, res)=> {
  const logError = req.cookies.loginError;
  res.clearCookie('loginError');
  res.render('login', { error: logError });
}

userController.login = (req, res) => {
  const userIdentification = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };
  knex('user')
    .first('*')
    .where('userEmail', userIdentification.userEmail)
    .then(userData => {
      if (userData) {
        hash = userData.userPassword;
        bcrypt.compare(userIdentification.userPassword, hash, function(
          err,
          response,
        ) {
          if (response) {
            res.cookie('userID', { id: userData.id });
            res.redirect('/home');
          } else {
            res.cookie('loginError', {
              wrongData: 'Invalid Email or Password',
            });
            res.redirect('/');
          }
        });
      } else {
        res.cookie('loginError', { wrongData: 'Invalid Email or Password' });
        res.redirect('/');
      }
    });
}

function userLogOut(req, res) {
  res.clearCookie('userID');
  res.redirect('/');
}

function userRegistGet(req, res) {
  const errors = req.cookies.formErrors;
  res.clearCookie('formErrors');
  res.render('regist', { errors: errors });
}

function userRegistPost(req, res) {
  const newUser = {
    userName: req.body.userName,
    userUserName: req.body.userUserName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };
  let errors = {};
  let hasErrors = false;
  if (newUser.userPassword !== req.body.userConfirmPassword) {
    errors.passwordError = 'Incorect password';
    hasErrors = true;
  }
  if (req.body.userPassword.length < 6) {
    errors.passwordLength = 'Password to short';
    hasErrors = true;
  }
  bcrypt.hash(newUser.userPassword, saltRounds, function(err, hash) {
    knex('user')
      .first('userName', 'userUserName')
      .where('userName', newUser.userName)
      .orWhere('userUserName', newUser.userUserName)
      .then(userData => {
        if (userData) {
          if (userData.userName === newUser.userName) {
            errors.nameError = 'Invalid Name';
            hasErrors = true;
          }
          if (userData.userUserName === newUser.userUserName) {
            errors.userError = 'Invalid Username';
            hasErrors = true;
          }
          if (hasErrors) {
            res.cookie('formErrors', errors);
            res.redirect('/regist');
          }
        } else {
          if (hasErrors) {
            res.cookie('formErrors', errors);
            res.redirect('/regist');
          } else {
            newUser.userPassword = hash;
            knex('user')
              .insert(newUser)
              .then(() => {
                knex('user')
                  .first('*')
                  .where('userEmail', newUser.userEmail)
                  .then(user => {
                    res.cookie('userID', { id: user.id });
                    res.redirect('/home');
                  });
              })
              .catch(err => {
                res.send('Database error: ' + err);
              });
          }
        }
      });
  });
}

module.exports = {
  userController,
  userLoginGet,
  userLogOut,
  userRegistGet,
  userRegistPost,
};
