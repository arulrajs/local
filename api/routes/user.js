const jwt = require('jsonwebtoken');
var express = require('express');
const fsPromises = require('fs').promises
const db = require('../db/user')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a login');
});

router.post('/validate', function(req, res, next) {
  db.getUserToken(req, res, next)
});

router.post('/token', function(req, res, next) {
  db.getUserToken(req, res, next)
});
  
router.post('/register', (req, res, next) =>{
    console.log(req.body)
    db.createUser(req, res, next)
});

module.exports = router;