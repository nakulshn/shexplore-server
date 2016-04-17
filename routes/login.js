'use strict';

var express = require('express');
var router = express.Router();

// GET login page.
router.get('/', function (req, res, next) {
  res.render('Login/Signup', {
    title: 'Login/Signup'
  });
});

module.exports = router;
