const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const adminController = require('../controllers').admin;

const verifyUser = require('../configuration/verify');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/profile', verifyUser.isLogin, profileController.profile);
router.get('/admin', verifyUser.isLogin, adminController.admin);


module.exports = router;