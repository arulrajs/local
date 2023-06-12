const jwt = require('jsonwebtoken');
const con = require('./conn')
//CREATE TABLE users (ID SERIAL PRIMARY KEY, name VARCHAR(30),phone bigint,email VARCHAR(30),password VARCHAR(30));
const createUser = (req, res, next) => {
  var data = req.body
  username = data['username'], phone = data["phone"], email = data["email"], password = data["password"]
  con.connPool.query('INSERT INTO users (name, phone, email, password) VALUES ($1, $2, $3, $4)', [username, phone, email, password], (error, results) => {
    if(error){
      next(error)
    }else{
      res.send(results)
    }
  })
}

const getUserToken = (req, res, next) => {
  var data = req.body
  phone = data["phone"], password = data["password"]
  con.connPool.query('Select * from users where phone=$1 and password=$2', [phone, password], (error, results) => {
    if(error){
      next(error)
    }else{
      if(results.rows.length>0){
        token = generateAccessToken(results.rows[0].id)
        res.set({ 'auth-token': token,
                  'auth-user': results.rows[0].id
                })
        res.send("Authentication successful")
      }else{
        res.sendStatus(403);
      }
      
    }
  })
}

function generateAccessToken(username) {
  return jwt.sign({username}, "mysecret", { expiresIn: '1h' });
}

module.exports = {
  createUser,
  getUserToken
}