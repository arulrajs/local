var express = require('express');
var router = express.Router();
const db = require('../db/status')

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getAllStatus(req, res, next)
});

router.post('/', function(req, res, next) {
  db.createStatus(req, res, next)
});

router.get('/search', function(req, res, next) {
  db.searchStatus(req, res, next)
});

module.exports = router;