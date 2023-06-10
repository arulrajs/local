var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/', (req, res) => {
  const request = unirest("GET", "https://twinword-word-associations-v1.p.rapidapi.com/associations/");
  request.query({ "entry": req.params.word });
  request.headers({
    "x-rapidapi-host": "twinword-word-associations-v1.p.rapidapi.com",
    "x-rapidapi-key": "YOUR_RAPID_API_KEY_GOES_HERE",
    "useQueryString": true
  });
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body.associations_scored || {});
  });
});

module.exports = router;
