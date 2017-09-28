const knex = require('../../database/database.js');

const usefulFunction = {};

usefulFunction.checkNull = data => {
  for (let i of Object.keys(data)) {
    if (data[i] === '') {
      return true;
    }
  }
  return false;
};


/*function autorize(req, res, next) {
  if (req.cookies.userID) {
    knex('user')
      .first('*')
      .where('id', req.cookies.userID.id)
      .then(val => {
        if (val) {
          req.user = { userName: val.userName };
          next();
        } else {
          redirect('/');
        }
      });
  } else {
    res.redirect('/');
  }
}

function remember(req, res, next) {
  if (req.cookies.userID) {
    knex('user')
      .first('*')
      .where('id', req.cookies.userID.id)
      .then(val => {
        if (val) {
          res.redirect('/home');
        } else {
          next();
        }
      });
  } else {
    next();
  }
}

*/
module.exports = usefulFunction;
