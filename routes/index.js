var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secure File Sharing' });
});

/* GET share page. */
router.get('/*', function(req, res, next) {
  res.render('share', { title: 'asdf Secure File Sharing' });
});

module.exports = router;
