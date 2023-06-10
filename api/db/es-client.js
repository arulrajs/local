const { Client } = require("@elastic/elasticsearch");

require("dotenv").config({ path: "./.elastic.env" });
console.log(process.env)
const esClient = new Client({
  hosts:['http://localhost:9200'],
  node: 'http://localhost:9200'
});

const createIndex = async (indexName) => {
  if(await esClient.indices.exists({index: indexName})) {
    // returning false since no index was created.. 
    console.log('Index', indexName, 'does already exist')
    return false
  }
  await esClient.indices.create({ 
    index: indexName ,
    mappings: {
      properties: {
        time: { type: "date" },
        blob: {
          "type": "binary"
        }
      }
    }
  });
  console.log('Index', indexName, 'created');
};


const searchIndex = async (indexName, search, sort) => {
  const result = await esClient.search({
    index: indexName,
    body: {
      query: search,
      sort: sort
    }
  })
  console.log(result);
  return result
};

const insertIndex = async function(indexName, data, id){
  return await esClient.index({
      index: indexName,
      body: data,
      id:id
  });
}


const getDocByID = async function(indexName, id){
  return await esClient.get({
      index: indexName,
      id: id
  });
}

module.exports = {
  createIndex,
  searchIndex,
  insertIndex,
  getDocByID
}
