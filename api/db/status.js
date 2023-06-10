var esClient = require('./es-client')
esClient.createIndex('status1')

const createStatus = async(req, res, next) => {
  const data = req.body
  data.user = req.user
  data.time = Date.now()
  const results = await esClient.insertIndex("status1", data)
  res.send(results)
}

const getAllStatus = async(req, res, next) => {
  const rec = []
  const results = await esClient.searchIndex("status1", {"match_all": {}}, { "time": { "order": "desc" }})
  results.hits.hits.forEach(
    (hit, index) => rec.push(hit._source)
  )
  res.send({"messages":rec})
}

const searchStatus = async(req, res, next) => {
  const rec = []
  const query =  {
                "multi_match" : {
                  "query":   "*"+req.query.query+"*",
                }}
  const results = await esClient.searchIndex("status1", query, undefined)
  results.hits.hits.forEach(
    (hit, index) => rec.push(hit._source)
  )
  res.send({"messages":rec})
}

const createImages = async(req, res, next) => {
  const data = req.body
  data.user = req.user
  data.time = Date.now()
  const results = await esClient.insertIndex("images", data)
  res.send(results)
}


const getImages = async(req, res, next) => {
  const rec = []
  const query = req.query.query
  const results = await esClient.searchIndex("images", {"match": {message:query}}, undefined)
  results.hits.hits.forEach(
    (hit, index) => rec.push(hit._source)
  )
  res.send({"messages":rec})
}

module.exports = {
  getAllStatus,
  createStatus,
  searchStatus,
  createImages,
  getImages
}