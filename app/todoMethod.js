const util = require('util');
const knex = require("../dataBase/dataBase.js");

function todoInsertGet(req, res) {
    const userID = req.cookies.userID;
    const inregistration = [];
    knex('todos').select("*")
        .where('userId', userID.id)
        .then(data => {
            let dim = 6;
            if (data.length < 6) {
                dim = data.length;
            }
            for (let i = 0; i < data.length; i++) {
                data[i].date = util.format("%s-%s-%s", data[i].date.getDate(), data[i].date.getMonth() + 1, data[i].date.getFullYear());
            }
            for (let j = 0; j < dim; j++) {
                inregistration.push(data[j]);
            }
            res.render('home', {
                todos: inregistration,
                userName: req.user.userName,
                previousCondition: req.cookies.interval.currentPage !== 1,
                nextCondition: req.cookies.interval.currentPage < req.cookies.pageInformation.totalPageNumber,
                thisPage: req.cookies.interval.currentPage,
                lastPage: req.cookies.pageInformation.totalPageNumber
            });
        });
}

function todoInsertPost(req, res) {
    const userId = req.cookies.userID.id;
    const pageInformation = req.cookies.pageInformation;
    const interval = req.cookies.interval;
    const { title, description } = req.body;
    knex('todos').insert({
        userId,
        title,
        description,
        date: new Date(),
    }).then(() => {
        pageInformation.inregistrationNumber += 1;
        pageInformation.totalPageNumber = Math.ceil(pageInformation.inregistrationNumber / 6);
        if ((interval.stop - interval.start) < 6) {
            interval.stop += 1;
        }
        res.cookie('pageInformation', pageInformation);
        res.cookie('interval', interval);
        if (req.cookies.pageInformation.actualPage === 'Next') {
            res.redirect('/home/next');
        } else if (req.cookies.pageInformation.actualPage === 'Previous') {
            res.redirect('/home/previous');
        } else {
            res.redirect('/home');
        }
    }).catch(function (err) {
        res.send("Database error: " + err);
    });
}

function todoEditGet(req, res) {
    knex('todos')
        .first('*')
        .where('id', req.params.id)
        .then(data => {
            res.render('edit', { todos: data, userName: req.user.userName });
        })
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
            if (req.cookies.pageInformation.actualPage === 'Next') {
                res.redirect('/home/next');
            } else if (req.cookies.pageInformation.actualPage === 'Previous') {
                res.redirect('/home/previous');
            } else {
                res.redirect('/home');
            }
        });
}

function todoDelete(req, res) {
    let pageInformation = req.cookies.pageInformation;
    let interval = req.cookies.interval;
    knex('todos')
        .where('id', req.params.id)
        .del()
        .then(() => {
            pageInformation.inregistrationNumber -= 1;
            pageInformation.totalPageNumber = Math.ceil(pageInformation.inregistrationNumber / 6);
            interval.stop -= 1;
            if (pageInformation.totalPageNumber === 0) {
                pageInformation.totalPageNumber += 1;
            }
            if (interval.stop < pageInformation.inregistrationNumber) {
                interval.stop += 1;
            }
            if (pageInformation.totalPageNumber < interval.currentPage) {
                interval.start -= 6;
                interval.currentPage -= 1;
            }
            if (interval.currentPage === 1) {
                pageInformation.actualPage = "";
            }
            res.cookie('pageInformation', pageInformation);
            res.cookie('interval', interval);
            if (req.cookies.pageInformation.actualPage === 'Next') {
                res.redirect('/home/next');
            } else if (req.cookies.pageInformation.actualPage === 'Previous') {
                res.redirect('/home/previous');
            } else {
                res.redirect('/home');
            }
        });
}

function todoNextGet(req, res) {
    const userID = req.cookies.userID;
    const inregistration = [];
    knex('todos').select("*")
        .where('userId', userID.id)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                data[i].date = util.format("%s-%s-%s", data[i].date.getDate(), data[i].date.getMonth() + 1, data[i].date.getFullYear());
            }
            for (let j = req.cookies.interval.start; j < req.cookies.interval.stop; j++) {
                inregistration.push(data[j]);
            }
            res.render('home', {
                todos: inregistration,
                userName: req.user.userName,
                previousCondition: req.cookies.interval.currentPage !== 1,
                nextCondition: req.cookies.interval.currentPage < req.cookies.pageInformation.totalPageNumber,
                thisPage: req.cookies.interval.currentPage,
                lastPage: req.cookies.pageInformation.totalPageNumber
            });
        });
}

function todoNextPost(req, res) {
    const interval = req.cookies.interval;
    const pageInformation = req.cookies.pageInformation;
    pageInformation.actualPage = 'Next';
    interval.start += 6;
    interval.stop += 6;
    if (interval.stop > req.cookies.pageInformation.inregistrationNumber) {
        interval.stop = req.cookies.pageInformation.inregistrationNumber;
    }
    interval.currentPage += 1;
    res.cookie('interval', interval);
    res.cookie('pageInformation', pageInformation);
    res.redirect('/home/next');
}

function todoPreviousGet(req, res) {
    const userID = req.cookies.userID;
    const inregistration = [];
    knex('todos').select("*")
        .where('userId', userID.id)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                data[i].date = util.format("%s-%s-%s", data[i].date.getDate(), data[i].date.getMonth() + 1, data[i].date.getFullYear());
            }
            for (let j = req.cookies.interval.start; j < req.cookies.interval.stop; j++) {
                inregistration.push(data[j]);
            }
            res.render('home', {
                todos: inregistration,
                userName: req.user.userName,
                previousCondition: req.cookies.interval.currentPage !== 1,
                nextCondition: req.cookies.interval.currentPage < req.cookies.pageInformation.totalPageNumber,
                thisPage: req.cookies.interval.currentPage,
                lastPage: req.cookies.pageInformation.totalPageNumber
            });
        });
}

function todoPreviousPost(req, res) {
    const interval = req.cookies.interval;
    const pageInformation = req.cookies.pageInformation;
    pageInformation.actualPage = 'Previous';
    interval.start -= 6;
    if (req.cookies.interval.currentPage === req.cookies.pageInformation.totalPageNumber) {
        if (req.cookies.pageInformation.inregistrationNumber % 6 === 0) {
            interval.stop -= 6;
        } else {
            interval.stop -= (req.cookies.pageInformation.inregistrationNumber % 6);
        }
    } else {
        interval.stop -= 6;
    }
    if (interval.currentPage > 0) {
        interval.currentPage -= 1;
    }
    res.cookie('interval', interval);
    res.cookie('pageInformation', pageInformation);
    if (req.cookies.interval.currentPage === 1) {
        let pageInformation = req.cookies.pageInformation;
        pageInformation.actualPage = '';
        res.cookie('pageInformation', pageInformation);
        res.redirect('/home');
    } else {
        res.redirect('/home/previous');
    }
}

module.exports = {
    todoInsertGet,
    todoInsertPost,
    todoEditGet,
    todoEditPut,
    todoDelete,
    todoNextGet,
    todoNextPost,
    todoPreviousGet,
    todoPreviousPost
};