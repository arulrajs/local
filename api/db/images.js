var esClient = require('./es-client')
esClient.createIndex('images')

const createImages = async(req, res, next) => {
  const data = req.body
  data.user = req.user
  data.time = Date.now()
  const results = await esClient.insertIndex("images", data, data.name)
  res.send({"name": data.name})
}

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