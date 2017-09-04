const knex = require("./dataBase.js");
const userMethod = require("./userMethod.js");
const todoMethod = require("./todoMethod.js");
const middleWare = require("./middleware.js");
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const util = require('util');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser('secret'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));

app.set('view engine', 'hbs');

app.listen(3000);

//login method
app.get('/', middleWare.remember, userMethod.userLoginGet);
app.post('/', userMethod.userLoginPost);

//log Out method
app.put('/home', userMethod.userLogOut);

//register method
app.get('/regist', userMethod.userRegistGet);
app.post('/regist', userMethod.userRegistPost);

//insert method
app.get('/home', middleWare.autorize, todoMethod.todoInsertGet);
app.post('/home', todoMethod.todoInsertPost);

//edit method
app.get('/home/:id/edit', middleWare.autorize, todoMethod.todoEditGet);
app.put('/home/:id/edit', todoMethod.todoEditPut);

//delete method
app.delete('/home/:id', todoMethod.todoDelete);

//next method
app.get('/home/next', middleWare.autorize, todoMethod.todoNextGet);
app.post('/home/next', todoMethod.todoNextPost);

//previous method
app.get('/home/previous', middleWare.autorize, todoMethod.todoNextGet);
app.post('/home/previous', todoMethod.todoPreviousPost);
