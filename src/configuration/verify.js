module.exports = {
    isLogin(req, res, next) {
        if (req.session.loggedin === true) {
            next();
        } else {
            req.session.destroy(function (err) {
                res.redirect('/login');
            });
        }
    },
    isLogout(req, res, next) {
        if (req.session.loggedin !== true) {
            next();
        } else {
            res.redirect('/');
        }
    },
    isAdmin(req, res, next) {
        if (req.session.loggedin === true && req.session.isAdmin === true) {
            res.redirect('/admin');
        } else {
            res.redirect('/');
        }
    }
};
