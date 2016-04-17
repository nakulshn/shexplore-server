'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
  res.render("profile",{username:"unknown",level:1,badges:[],projects:[]});
});

module.exports = router;
