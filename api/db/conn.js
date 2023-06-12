const Pool = require('pg').Pool
const connPool = new Pool({
  user: 'local',
  host: 'localhost',
  database: 'local',
  //password: 'password',
  port: 5432,
})

module.exports = {
    connPool
}