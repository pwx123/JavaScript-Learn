var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.jsonp({
    'msg': 'success'
  })
});

module.exports = router;