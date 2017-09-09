const util = require('util');
const knex = require('../../database/database.js');

function todoInsertGet(req, res) {
  const userID = req.cookies.userID;
  knex('todos')
    .select('*')
    .where('userId', userID.id)
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        data[i].date = util.format(
          '%s-%s-%s',
          data[i].date.getDate(),
          data[i].date.getMonth() + 1,
          data[i].date.getFullYear(),
        );
      }
      res.render('home', {
        todos: data,
        userName: req.user.userName,
      });
    });
}

function todoInsertPost(req, res) {
  const userId = req.cookies.userID.id;
  const { title, description } = req.body;
  knex('todos')
    .insert({
      userId,
      title,
      description,
      date: new Date(),
    })
    .then(() => {
      res.redirect('/home');
    })
    .catch(function(err) {
      res.send('Database error: ' + err);
    });
}

function todoEditGet(req, res) {
  knex('todos')
    .first('*')
    .where('id', req.params.id)
    .then(data => {
      res.render('edit', { todos: data, userName: req.user.userName });
    });
}

function todoEditPut(req, res) {
  const { title, description } = req.body;
  knex('todos')
    .where('id', req.params.id)
    .update({
      title,
      description,
      date: new Date(),
    })
    .then(() => {
      res.redirect('/home');
    });
}

function todoDelete(req, res) {
  knex('todos')
    .where('id', req.params.id)
    .del()
    .then(() => {
      res.redirect('/home');
    });
}

module.exports = {
  todoInsertGet,
  todoInsertPost,
  todoEditGet,
  todoEditPut,
  todoDelete,
};
