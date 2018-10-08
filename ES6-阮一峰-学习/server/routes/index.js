var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.jsonp({
    'commentURL': 'http://localhost:3000/users'
  })
});

router.get('/test1', function (req, res, next) {
  res.jsonp({
    'commentURL': 'http://localhost:3000/users?test1'
  })
});
router.get('/test2', function (req, res, next) {
  res.jsonp({
    'commentURL': 'http://localhost:3000/users?test2'
  })
});
module.exports = router;