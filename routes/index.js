var express = require('express');
var router = express.Router();

var projects = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    projects: projects
  });
});

module.exports = router;
