var esClient = require('./es-client')
const fs = require('fs');
var path = require('path');

const createImages = async(req, res, next) => {
  const data = req.body
  data.user = req.user
  data.time = Date.now()
  console.log(req.user)
  const imageFile = path.join('/public/images', req.user.username+"_"+data.name)
  const imagePath = path.join(__dirname, imageFile)
  fs.writeFile(imagePath, data.blob.replace(/^data:image\/?[A-z]*;base64,/, ""), err => {
    if (err) {
      console.error(err);
      res.send({"error": err})
    }else{
      res.send({"name": imageFile})
    }
    // file written successfully
  });
}

//Not used
const getImages = async(req, res, next) => {
  const rec = []
  const name = req.params.name
  console.log(req.param)
  try{
    const results = await esClient.getDocByID("images", name);
    var img = Buffer.from(results._source.blob.replace(/^data:image\/?[A-z]*;base64,/, ""), "base64");
    res.writeHead(200, {
      'Content-Type':  'image/*,*/*',
      'Content-Length': img.length
    });
    res.end(img); 
  }catch(err) {
    next(err)
  }
}

module.exports = {
  createImages,
  getImages
}