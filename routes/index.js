var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secure File Sharing' });
});

/* GET a sharing room. */
router.get('/*', function(req, res, next) {
  res.render('room');
});


module.exports = router;
