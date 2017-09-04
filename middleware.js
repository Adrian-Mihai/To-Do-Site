const knex = require("./dataBase.js");

function autorize(req, res, next) {
    if (req.cookies.userID) {
        knex('user')
            .first('*')
            .where('userId', req.cookies.userID.id)
            .then((val) => {
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
            .where('userId', req.cookies.userID.id)
            .then((val) => {
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

module.exports = {
    autorize,
    remember
};