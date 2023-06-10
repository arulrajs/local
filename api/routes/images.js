var express = require('express');
var router = express.Router();
const db = require('../db/images')


router.get('/:name', function(req, res, next) {
  db.getImages(req, res, next)
});

router.post('/', function(req, res, next) {
  db.createImages(req, res, next)
});

module.exports = router;