var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');

router.get('/info', controller.userinfo);

module.exports = router;