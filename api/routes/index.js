var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

router.get('/hello', controller.hello);

module.exports = router;