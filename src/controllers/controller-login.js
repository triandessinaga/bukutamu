const config = require('../configuration/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    login(req, res) {
        res.render("login", {
            url: 'http://localhost:3000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    loginAuth(req, res) {
        const email = req.body.email;
        const password = req.body.pass;
        if (email && password) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user WHERE user_email = ? AND user_password = SHA2(?,512)`,
                    [email, password],
                    (error, results) => {
                        if (error) throw error;
                        if (results.length > 0) {
                            req.session.loggedin = true;
                            req.session.userid = results[0].user_id;
                            req.session.username = results[0].user_username;
                            if (results[0].user_role === 'admin') {
                                req.session.isAdmin = true;
                                res.redirect('/admin');
                            } else {
                                req.session.isAdmin = false;
                                res.redirect('/');
                            }
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Akun tidak ditemukan');
                            res.redirect('/login');
                        }
                    });
                connection.release();
            });
        } else {
            res.redirect('/login');
        }
    },
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
};
