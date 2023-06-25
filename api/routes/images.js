var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');


router.post('/', function(req, res, next) {
  const data = req.body
  data.user = req.user
  data.time = Date.now()
  console.log(data)
  const imageFile = path.join('/public/images', req.user.username+"_"+data.name)
  const imagePath = path.join(__dirname, "../", imageFile)
  var b64 = data.blob.replace(/^data:image\/\w+;base64,/, "");
  var buf = Buffer.from(b64, 'base64');
  fs.writeFile(imagePath, buf, err => {
    if (err) {
      console.error(err);
      res.send({"error": err})
    }else{
      res.send({"name": imageFile})
    }
    // file written successfully
  });
});

module.exports = router;